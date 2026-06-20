"use client";
import { projects } from "@/lib/constants";
import { Project } from "@/lib/types/globals";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";

const GAP = 24;
const BASE_WIDTH = 700;
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

function ProjectCard({
	project,
	index,
	itemWidth,
	trackItemOffset,
	x,
}: {
	project: Project;
	index: number;
	itemWidth: number;
	trackItemOffset: number;
	x: ReturnType<typeof useMotionValue<number>>;
}) {
	const range = [
		-(index + 1) * trackItemOffset,
		-index * trackItemOffset,
		-(index - 1) * trackItemOffset,
	];
	const outputRange = [15, 0, -15];
	const rotateY = useTransform(x, range, outputRange, { clamp: false });
	const scaleRange = [0.85, 1, 0.85];
	const scale = useTransform(x, range, scaleRange, { clamp: false });
	const opacityRange = [0.5, 1, 0.5];
	const opacity = useTransform(x, range, opacityRange, { clamp: false });

	return (
		<motion.div
			key={project.title}
			className="relative shrink-0"
			style={{
				width: itemWidth,
				rotateY,
				scale,
				opacity,
			}}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
		>
			<div className="glass rounded-2xl overflow-hidden shadow-2xl glow-pink-hover transition-all duration-300 h-full">
				<div className="relative aspect-video">
					<Image
						src={project.imageUrl}
						alt={project.title}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-palette-card via-palette-card/50 to-transparent opacity-90" />
				</div>

				<div className="p-8">
					<h3 className="text-2xl uppercase font-bold mb-3 text-gradient-pink">
						{project.title}
					</h3>

					<p className="text-gray-300 mb-6 line-clamp-2">
						{project.description}
					</p>

					<div className="flex flex-wrap gap-2 mb-6">
						{project.technologies.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1 glass-pink text-palette-pink rounded-full text-sm
								hover:bg-palette-pink/30 transition-all duration-300 cursor-default border border-palette-pink/20 glow-pink-hover"
							>
								{tech}
							</span>
						))}
					</div>

					<div className="space-y-2 mb-6">
						{project.highlights.map((highlight) => (
							<div
								key={highlight}
								className="flex items-center gap-2 text-gray-400"
							>
								<span className="w-1.5 h-1.5 rounded-full bg-palette-lime glow-lime" />
								<span>{highlight}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function ProjectShowcase() {
	const [position, setPosition] = useState<number>(1);
	const x = useMotionValue(0);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const containerPadding = 24;
	const itemWidth = BASE_WIDTH - containerPadding * 2;
	const trackItemOffset = itemWidth + GAP;

	// Create items with clones for infinite loop effect
	const itemsForRender = [
		projects[projects.length - 1],
		...projects,
		projects[0],
	];

	useEffect(() => {
		x.set(-1 * trackItemOffset);
	}, [projects.length, trackItemOffset, x]);

	const effectiveTransition = SPRING_OPTIONS;

	const handleAnimationComplete = () => {
		const lastCloneIndex = itemsForRender.length - 1;

		if (position === lastCloneIndex) {
			x.set(-1 * trackItemOffset);
			setPosition(1);
			return;
		}

		if (position === 0) {
			x.set(-projects.length * trackItemOffset);
			setPosition(projects.length);
			return;
		}

		setIsAnimating(false);
	};

	const handleDragEnd = (
		_: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo,
	): void => {
		const { offset, velocity } = info;
		const direction =
			offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
				? 1
				: offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
					? -1
					: 0;

		if (direction === 0) return;

		setPosition((prev) => {
			const next = prev + direction;
			return Math.max(0, Math.min(next, itemsForRender.length - 1));
		});
		setIsAnimating(true);
	};

	const activeIndex = (position - 1 + projects.length) % projects.length;

	const nextProject = () => {
		if (position < itemsForRender.length - 1) {
			setPosition(position + 1);
			setIsAnimating(true);
		}
	};

	const previousProject = () => {
		if (position > 0) {
			setPosition(position - 1);
			setIsAnimating(true);
		}
	};

	return (
		<section id="projects" className="global-p py-20">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-4xl font-bold text-center mb-4 text-gradient-primary">
					PROJECTS
				</h2>
				<p className="text-gray-400 text-center uppercase font-semibold mb-12 max-w-2xl mx-auto">
					A showcase of my recent work and side projects
				</p>

				<div className="relative flex items-center justify-center">
					{/* Navigation Arrows */}
					<button
						onClick={previousProject}
						className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full glass-light
						hover:bg-palette-pink/20 transition-all duration-300 border border-white/10 glow-pink-hover z-20"
					>
						<ChevronLeft className="w-6 h-6 text-gray-300" />
					</button>
					<button
						onClick={nextProject}
						className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full glass-light
						hover:bg-palette-pink/20 transition-all duration-300 border border-white/10 glow-pink-hover z-20"
					>
						<ChevronRight className="w-6 h-6 text-gray-300" />
					</button>

					{/* Carousel */}
					<div
						ref={containerRef}
						className="relative overflow-hidden"
						style={{
							width: `${BASE_WIDTH}px`,
							height: "800px",
							perspective: 1000,
							perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
						}}
					>
						<motion.div
							className="flex"
							drag={isAnimating ? false : "x"}
							dragConstraints={{
								left: -trackItemOffset * (itemsForRender.length - 1),
								right: 0,
							}}
							style={{
								gap: `${GAP}px`,
								x,
							}}
							onDragEnd={handleDragEnd}
							animate={{ x: -(position * trackItemOffset) }}
							transition={effectiveTransition}
							onAnimationComplete={handleAnimationComplete}
						>
							{itemsForRender.map((project, index) => (
								<ProjectCard
									key={`${project.title}-${index}`}
									project={project}
									index={index}
									itemWidth={itemWidth}
									trackItemOffset={trackItemOffset}
									x={x}
								/>
							))}
						</motion.div>
					</div>
				</div>

				{/* Navigation Dots */}
				<div className="flex justify-center gap-2 mt-8">
					{projects.map((_, index) => (
						<motion.button
							type="button"
							key={index}
							aria-label={`Go to project ${index + 1}`}
							aria-current={activeIndex === index}
							className={`h-2 w-2 rounded-full cursor-pointer border-1 p-0 appearance-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
								activeIndex === index
									? "bg-palette-lime glow-lime"
									: "bg-palette-olive/40"
							}`}
							animate={{
								scale: activeIndex === index ? 1.2 : 1.1,
							}}
							onClick={() => {
								setPosition(index + 1);
								setIsAnimating(true);
							}}
							transition={{ duration: 0.15 }}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default ProjectShowcase;
