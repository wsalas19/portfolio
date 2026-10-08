import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/lib/types/globals';
import Image from 'next/image';

interface ExpandableProjectCardProps {
	project: Project;
	index: number;
}

export function ExpandableProjectCard({ project, index }: ExpandableProjectCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const layoutId = `expandable-project-card-${index}`;

	return (
		<>
			{/* Preview Card */}
			<motion.div
				layoutId={layoutId}
				onClick={() => setIsOpen(true)}
				className="cursor-pointer relative min-h-[340px] w-full  bg-[#121212]/60 overflow-hidden rounded-2xl border border-white/10 group"
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.2 }}
			>
				<motion.div
					layoutId={`image-container-${layoutId}`}
					className="relative h-48 w-full overflow-hidden"
				>
					<Image
						src={project.imageUrl}
						alt={project.title}
						fill
						// La tarjeta topa en 380px. Sin `sizes`, Next asume 100vw y el
						// navegador pide una imagen del ancho del viewport para pintarla
						// a 380.
						sizes="(max-width: 768px) 100vw, 380px"
						className="object-cover rounded-t-2xl"
					/>
					<div className="absolute inset-0"/>
				</motion.div>

				<div className="absolute bottom-0 left-0 right-0 p-5">
					<motion.div layoutId={`title-${layoutId}`} className="mb-2">
						<h3 className="font-display text-lg uppercase font-bold text-gradient-pink text-[#fb8983]">
							{project.title}
						</h3>
					</motion.div>

					<motion.div
						layoutId={`subtitle-${layoutId}`}
						className="text-gray-300 text-sm line-clamp-2"
					>
						{project.description}
					</motion.div>

					<motion.div
						layoutId={`tech-${layoutId}`}
						className="flex flex-wrap gap-1.5 mt-3"
					>
						{project.technologies.slice(0, 3).map((tech) => (
							<span
								key={tech}
								className="px-2 py-0.5 glass-pink text-palette-pink  rounded-full text-xs border border-palette-pink/20"
							>
								{tech}
							</span>
						))}
						{project.technologies.length > 3 && (
							<span className="px-2 py-0.5 text-gray-300 text-xs">
								+{project.technologies.length - 3}
							</span>
						)}
					</motion.div>
				</div>

				<motion.div
					className="absolute inset-0 border-2 border-palette-lime/0 rounded-2xl transition-colors"
					whileHover={{ borderColor: 'rgba(212, 255, 77, 0.3)' }}
				/>
			</motion.div>

			{/* Expanded Modal */}
			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="absolute inset-0 bg-black/80 backdrop-blur-md"
							transition={{ duration: 0.2 }}
						/>

						{/* Modal Content */}
						<motion.div
							layoutId={layoutId}
							className="relative w-full max-w-5xl max-h-[90vh] bg-palette-card rounded-2xl overflow-hidden border border-white/10 z-10 flex flex-col shadow-2xl"
							initial={{ borderRadius: 16 }}
							transition={{
								type: 'spring',
								stiffness: 300,
								damping: 30,
							}}
						>
							{/* Close Button */}
							<motion.button
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								onClick={() => setIsOpen(false)}
								className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center bg-palette-card/80 hover:bg-palette-pink/20 rounded-full border border-white/10 text-white transition-all backdrop-blur-sm"
								aria-label="Close"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</motion.button>

							{/* Image Section */}
							<motion.div
								layoutId={`image-container-${layoutId}`}
								className="relative h-56 sm:h-72 w-full shrink-0 overflow-hidden"
							>
								<Image
									src={project.imageUrl}
									alt={project.title}
									fill
									sizes="(max-width: 1024px) 100vw, 1024px"
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-palette-card via-palette-card/50 to-transparent" />
							</motion.div>

							{/* Content Section */}
							<div className="p-6 sm:p-8 flex flex-col overflow-y-auto custom-scrollbar">
								<motion.div
									layoutId={`title-${layoutId}`}
									className="mb-3"
								>
									<h3 className="font-display text-2xl sm:text-3xl uppercase font-bold text-gradient-pink text-[#fb8983]">
										{project.title}
									</h3>
								</motion.div>

								<motion.p
									layoutId={`subtitle-${layoutId}`}
									className="text-gray-300 mb-6 text-sm leading-relaxed"
								>
									{project.description}
								</motion.p>

								<motion.div
									layoutId={`tech-${layoutId}`}
									className="flex flex-wrap gap-2 mb-6"
								>
									{project.technologies.map((tech) => (
										<span
											key={tech}
											className="px-3 py-1 glass-pink text-palette-pink rounded-full text-sm hover:bg-palette-pink/30 transition-all duration-300 cursor-default border border-palette-pink/20 glow-pink-hover"
										>
											{tech}
										</span>
									))}
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ delay: 0.15 }}
									className="space-y-3"
								>
									<h4 className="text-sm font-semibold text-palette-lime uppercase tracking-wide">
										Highlights
									</h4>
									<div className="space-y-2">
										{project.highlights.map((highlight) => (
											<div
												key={highlight}
												className="flex items-center gap-3 text-gray-300"
											>
												<span className="w-2 h-2 rounded-full bg-palette-lime glow-lime shrink-0" />
												<span className="text-sm">{highlight}</span>
											</div>
										))}
									</div>
								</motion.div>

								{/* Action Buttons */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ delay: 0.2 }}
									className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/10"
								>
									{project.liveUrl && (
										<a
											href={project.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="px-5 py-2.5 bg-palette-pink/20 hover:bg-palette-pink/30 text-palette-pink rounded-lg border border-palette-pink/30 transition-all duration-300 font-medium glow-pink-hover"
										>
											View Live
										</a>
									)}
									{project.githubUrl && (
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="px-5 py-2.5 glass-subtle hover:bg-white/10 text-gray-300 rounded-lg border border-white/20 transition-all duration-300 font-medium"
										>
											View Code
										</a>
									)}
								</motion.div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
