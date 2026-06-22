import React, { useRef, useEffect, useCallback } from "react";

interface ClickSparkProps {
	sparkColor?: string;
	sparkSize?: number;
	sparkRadius?: number;
	sparkCount?: number;
	duration?: number;
	easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
	extraScale?: number;
	children?: React.ReactNode;
}

interface Spark {
	x: number;
	y: number;
	angle: number;
	startTime: number;
}

// Mobile detection helper
const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const ClickSpark: React.FC<ClickSparkProps> = ({
	sparkColor = "#fff",
	sparkSize = 10,
	sparkRadius = 15,
	sparkCount = 8,
	duration = 400,
	easing = "ease-out",
	extraScale = 1.0,
	children,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sparksRef = useRef<Spark[]>([]);
	const startTimeRef = useRef<number | null>(null);
	const isVisibleRef = useRef(true);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const parent = canvas.parentElement;
		if (!parent) return;

		let resizeTimeout: ReturnType<typeof setTimeout>;

		const resizeCanvas = () => {
			const { width, height } = parent.getBoundingClientRect();
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
			}
		};

		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resizeCanvas, 100);
		};

		const ro = new ResizeObserver(handleResize);
		ro.observe(parent);

		resizeCanvas();

		return () => {
			ro.disconnect();
			clearTimeout(resizeTimeout);
		};
	}, []);

	// Intersection Observer to pause when not visible
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					isVisibleRef.current = entry.isIntersecting;
					if (!entry.isIntersecting) {
						// Clear sparks when not visible to save resources
						sparksRef.current = [];
					}
				});
			},
			{ threshold: 0 },
		);
		observer.observe(canvas);

		return () => observer.disconnect();
	}, []);

	const easeFunc = useCallback(
		(t: number) => {
			switch (easing) {
				case "linear":
					return t;
				case "ease-in":
					return t * t;
				case "ease-in-out":
					return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
				default:
					return t * (2 - t);
			}
		},
		[easing],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Check for prefers-reduced-motion
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let animationId: number;

		const draw = (timestamp: number) => {
			animationId = requestAnimationFrame(draw);

			// Early exit if no sparks or not visible
			if (sparksRef.current.length === 0 || !isVisibleRef.current) {
				return;
			}

			// Skip if prefers reduced motion
			if (prefersReducedMotion) return;

			if (!startTimeRef.current) {
				startTimeRef.current = timestamp;
			}
			ctx?.clearRect(0, 0, canvas.width, canvas.height);

			sparksRef.current = sparksRef.current.filter((spark: Spark) => {
				const elapsed = timestamp - spark.startTime;
				if (elapsed >= duration) {
					return false;
				}

				const progress = elapsed / duration;
				const eased = easeFunc(progress);

				const distance = eased * sparkRadius * extraScale;
				const lineLength = sparkSize * (1 - eased);

				const x1 = spark.x + distance * Math.cos(spark.angle);
				const y1 = spark.y + distance * Math.sin(spark.angle);
				const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
				const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

				ctx.strokeStyle = sparkColor;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();

				return true;
			});
		};

		animationId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animationId);
		};
	}, [
		sparkColor,
		sparkSize,
		sparkRadius,
		sparkCount,
		duration,
		easeFunc,
		extraScale,
	]);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		// Check for prefers-reduced-motion
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const now = performance.now();

		// Reduce particle count on mobile for performance
		const mobile = isMobile();
		const effectiveSparkCount = mobile
			? Math.max(4, Math.floor(sparkCount / 2))
			: sparkCount;

		const newSparks: Spark[] = Array.from(
			{ length: effectiveSparkCount },
			(_, i) => ({
				x,
				y,
				angle: (2 * Math.PI * i) / effectiveSparkCount,
				startTime: now,
			}),
		);

		sparksRef.current.push(...newSparks);
	};

	return (
		<div className="relative w-full h-full" onClick={handleClick}>
			<canvas
				ref={canvasRef}
				className="absolute inset-0 pointer-events-none z-50"
				style={{ willChange: "transform" }}
			/>
			{children}
		</div>
	);
};

export default ClickSpark;
