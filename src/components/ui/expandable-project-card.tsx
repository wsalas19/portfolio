"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/lib/types/globals';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface ExpandableProjectCardProps {
	project: Project;
	index: number;
}

export function ExpandableProjectCard({ project, index }: ExpandableProjectCardProps) {
	const [isOpen, setIsOpen] = useState(false);
	const layoutId = `expandable-project-card-${index}`;

	return (
		<>
			{/* Fila, no tarjeta: la referencia pone el trabajo como una lista editorial
			    (miniatura, título, stack, flecha) en vez de una grilla de cajas. Los
			    `layoutId` se mantienen, así que el morph hacia el modal sigue igual. */}
			<motion.div
				layoutId={layoutId}
				onClick={() => setIsOpen(true)}
				className="group grid cursor-pointer grid-cols-[72px_1fr] items-center gap-x-4 gap-y-3 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.04] md:grid-cols-[88px_1fr_auto_24px] md:gap-6"
			>
				<motion.div
					layoutId={`image-container-${layoutId}`}
					className="relative h-14 w-[72px] shrink-0 overflow-hidden rounded-lg md:h-16 md:w-[88px]"
				>
					<Image
						src={project.imageUrl}
						alt={project.title}
						fill
						// La miniatura topa en 88px. Sin `sizes`, Next asume 100vw y el
						// navegador pide una imagen del ancho del viewport.
						sizes="88px"
						className="object-cover"
					/>
				</motion.div>

				<div className="min-w-0">
					<motion.div layoutId={`title-${layoutId}`}>
						<h3 className="font-display text-lg uppercase font-bold text-palette-pink md:text-xl">
							{project.title}
						</h3>
					</motion.div>

					<motion.div
						layoutId={`subtitle-${layoutId}`}
						className="text-gray-400 text-sm mt-1 line-clamp-2 md:line-clamp-1"
					>
						{project.description}
					</motion.div>
				</div>

				<motion.div
					layoutId={`tech-${layoutId}`}
					className="col-span-2 flex flex-wrap gap-1.5 md:col-span-1 md:justify-end"
				>
					{project.technologies.slice(0, 3).map((tech) => (
						<span
							key={tech}
							className="px-2 py-0.5 glass-pink text-palette-pink rounded-full text-xs border border-palette-pink/20"
						>
							{tech}
						</span>
					))}
					{project.technologies.length > 3 && (
						<span className="px-2 py-0.5 text-gray-400 text-xs">
							+{project.technologies.length - 3}
						</span>
					)}
				</motion.div>

				<ArrowUpRight className="hidden h-5 w-5 text-gray-500 transition-colors group-hover:text-palette-lime md:block" />
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

								{/* Galería. En columna y con el scroll que ya tiene el modal, no
								    en carrusel: esconder capturas detrás de flechas cuando un
								    scroll las muestra todas es interfaz de más. Va después de
								    los highlights y antes del CTA. */}
								{!!project.images?.length && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ delay: 0.18 }}
										className="mt-8"
									>
										<h4 className="text-sm font-semibold text-palette-lime uppercase tracking-wide mb-3">
											Gallery
										</h4>
										<div className="space-y-4">
											{project.images.map((src) => (
												<div
													key={src}
													// `contain` y no `cover`: son pantallas de una app y
													// recortarlas se come justo el detalle que se quiere ver.
													className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-black/40"
												>
													<Image
														src={src}
														alt={`${project.title} — screenshot`}
														fill
														sizes="(max-width: 1024px) 100vw, 1024px"
														className="object-contain"
													/>
												</div>
											))}
										</div>
									</motion.div>
								)}

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
