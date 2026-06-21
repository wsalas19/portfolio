"use client";

import { gradientColors } from "@/lib/constants";
import ContactForm from "../ContactForm";
import Experience from "../Experience";
import GradientBlinds from "../GradientBlinds";
import ProfileCard from "../ProfileCard";
import ProjectShowcase from "../ProjectShowcase";
import ClickSpark from "../ClickSpark";

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
					<GradientBlinds
						gradientColors={gradientColors}
						angle={33}
						noise={0.25}
						blindCount={16}
						mouseDampening={0.4}
						mirrorGradient={false}
						spotlightRadius={0.5}
						spotlightSoftness={1}
						spotlightOpacity={1}
						distortAmount={2}
						shineDirection="left"
						mixBlendMode="lighten"
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
