import { Variants, Transition } from "framer-motion";

// Scroll reveal animations - elements fade in and move up
export const scrollRevealVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 50,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

// Fade in animation (no movement)
export const fadeInVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "linear",
		},
	},
};

// Scale in animation
export const scaleInVariants: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

// Slide from left
export const slideInLeftVariants: Variants = {
	hidden: { opacity: 0, x: -50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

// Slide from right
export const slideInRightVariants: Variants = {
	hidden: { opacity: 0, x: 50 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

// Stagger container - animates children with delay
export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

// Stagger container with larger delay
export const staggerContainerSlow: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.2,
		},
	},
};

// Spring animation preset
export const springTransition: Transition = {
	type: "spring",
	stiffness: 300,
	damping: 30,
};

// Gentle spring animation
export const gentleSpringTransition: Transition = {
	type: "spring",
	stiffness: 200,
	damping: 25,
};

// Hover scale effect
export const hoverScaleVariants: Variants = {
	rest: { scale: 1 },
	hover: {
		scale: 1.02,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};

// Glow pulse effect
export const glowPulseVariants: Variants = {
	rest: {
		boxShadow: "0 0 20px rgba(190, 247, 40, 0.3)",
	},
	hover: {
		boxShadow: "0 0 30px rgba(190, 247, 40, 0.5), 0 0 60px rgba(190, 247, 40, 0.2)",
		transition: {
			duration: 0.3,
		},
	},
};

// Staggered list item animation
export const listItemVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4,
		},
	},
};

// Card flip/3D effect variants
export const card3dVariants: Variants = {
	hidden: { opacity: 0, rotateY: -15 },
	visible: {
		opacity: 1,
		rotateY: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

// Text reveal animation (character by character)
export const textRevealVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

// Container for text reveal with stagger
export const textContainerVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

// Progressive fade up for sections
export const sectionRevealVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 100,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.1, 0.25, 1],
		},
	},
};

// Micro interaction - button press
export const buttonPressVariants: Variants = {
	idle: { scale: 1 },
	press: { scale: 0.95 },
	hover: { scale: 1.05 },
};

// Magnetic hover effect preparation
export const magneticVariants: Variants = {
	rest: { x: 0, y: 0 },
	hover: {
		transition: {
			type: "spring",
			stiffness: 500,
			damping: 28,
		},
	},
};

// Export default collection
export const animations = {
	scrollReveal: scrollRevealVariants,
	fadeIn: fadeInVariants,
	scaleIn: scaleInVariants,
	slideInLeft: slideInLeftVariants,
	slideInRight: slideInRightVariants,
	stagger: staggerContainer,
	staggerSlow: staggerContainerSlow,
	hoverScale: hoverScaleVariants,
	glowPulse: glowPulseVariants,
	listItem: listItemVariants,
	card3d: card3dVariants,
	textReveal: textRevealVariants,
	textContainer: textContainerVariants,
	sectionReveal: sectionRevealVariants,
	buttonPress: buttonPressVariants,
	magnetic: magneticVariants,
};

export default animations;
