import { projects } from "@/lib/constants";
import { galleryFor } from "@/lib/project-images";
import { SectionHeading } from "@/components/SectionHeading";
import { ExpandableProjectCard } from "@/components/ui/expandable-project-card";

// Sin "use client": necesita el sistema de archivos para listar las galerías y no
// usa ningún hook. La tarjeta, que sí es cliente, recibe las rutas ya resueltas.
function ProjectShowcase() {
	return (
		<section id="projects" className="w-full py-20 md:py-32">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* "Things I built, that you can open" prometía software usable y el
				    enlace no lo cumple: el portal médico es privado, Frieda Player está
				    en alpha sin release y dos filas van a un post y a un PR. El título
				    ahora dice lo que la fila sí hace: abrirse y contar el trabajo. */}
				<SectionHeading
					eyebrow="Selected work"
					title="What I built, and how it works"
					description="My own tools, client work and one open-source contribution. Each row shows what it does, the stack behind it and the highlights."
				/>

				{/* Lista editorial y no grilla: la referencia muestra el trabajo como
				    filas (título, stack, flecha) para que el título tenga ancho completo
				    y las tecnologías se lean de un vistazo, en vez de tres cajas donde
				    el texto parte a media frase. */}
				<div className="border-t border-white/10">
					{projects.map((project, index) => (
						<ExpandableProjectCard
							key={project.slug}
							project={{
								...project,
								// La portada ya se ve en la miniatura; la galería es el resto.
								images: galleryFor(project.slug).filter(
									(src) => src !== project.imageUrl
								),
							}}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default ProjectShowcase;
