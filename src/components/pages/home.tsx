"use client";
import ContactForm from "../ContactForm";
import Experience from "../Experience";
import ProfileCard from "../ProfileCard";
import ProjectShowcase from "../ProjectShowcase";
import ClickSpark from "../ClickSpark";
import FaultyTerminal from "../FaultyTerminal";

export default function Home() {
	return (
		<ClickSpark
			sparkColor="#bef728"
			sparkSize={10}
			sparkRadius={15}
			sparkCount={8}
			duration={400}
		>
			<div>
				<div className="fixed inset-0">
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
						tint="#bef728"
						mouseReact
						mouseStrength={0.5}
						pageLoadAnimation
						brightness={0.6}
					/>
				</div>
				{/*eslint-disable-next-line*/}
				<ProfileCard />
				<Experience />
				<ProjectShowcase />
				<ContactForm />
			</div>
		</ClickSpark>
	);
}
