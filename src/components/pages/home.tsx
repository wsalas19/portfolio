import ContactForm from "../ContactForm";
import Experience from "../Experience";
import ProjectShowcase from "../ProjectShowcase";
import ClickSpark from "../ClickSpark";
import FaultyTerminal from "../FaultyTerminal";
import CtaBand from "../landing/CtaBand";
import Faq from "../landing/Faq";
import Hero from "../landing/Hero";
import Journal from "../landing/Journal";
import Services from "../landing/Services";
import Stats from "../landing/Stats";
import Testimonials from "../landing/Testimonials";

/**
 * El orden es el de la referencia: quién y qué se puede contratar, la prueba
 * (números, proyectos, experiencia), lo que se escribe, y recién ahí la
 * conversión. `Experience` va después de `Services` a propósito: primero la
 * oferta, después los nombres y las fechas que la respaldan.
 *
 * `Testimonials` no renderiza nada mientras `testimonials` esté vacío en
 * `constants.ts`; el lugar en la página ya está reservado.
 */
export default function Home() {
	return (
		<ClickSpark
			sparkColor="#d4ff4d"
			sparkSize={10}
			sparkRadius={15}
			sparkCount={8}
			duration={400}
		>
			<div>
				{/* `-z-10`: el canvas hace `clearColor(0,0,0,1)`, o sea negro opaco, y al ser
				    `fixed` se pintaba por encima de todo el contenido estático. Antes no se
				    notaba porque las secciones venían de framer-motion, que las promueve a
				    capas compuestas; las de `.rise` son CSS puro y quedaban debajo. */}
				<div className="fixed inset-0 -z-10">
					<FaultyTerminal
						scale={2.2}
						gridMul={[2, 1]}
						digitSize={1.5}
						timeScale={0.5}
						pause={false}
						scanlineIntensity={0.5}
						glitchAmount={1}
						flickerAmount={1}
						noiseAmp={0.8}
						chromaticAberration={0}
						dither={0}
						curvature={0.26}
						tint="#d4ff4d"
						mouseReact
						mouseStrength={0.5}
						pageLoadAnimation
						brightness={0.18}
					/>
				</div>
				<Hero />
				<Stats />
				<ProjectShowcase />
				<Services />
				<Experience />
				<Journal />
				<Testimonials />
				<Faq />
				<CtaBand />
				<ContactForm />
			</div>
		</ClickSpark>
	);
}
