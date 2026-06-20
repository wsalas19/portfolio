"use client";

import { gradientColors } from "@/lib/constants";
import ContactForm from "../ContactForm";
import Experience from "../Experience";
import GradientBlinds from "../GradientBlinds";
import ProfileCard from "../ProfileCard";
import ProjectShowcase from "../ProjectShowcase";

export default function Home() {
	return (
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
			{/*<div className="flex flex-col items-center py-5">
				<h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-palette-pink">
					GITHUB CONTRIBUTIONS
				</h3>
				<img
					src="https://ghchart.rshah.org/wsalas19"
					alt="gh contributions"
					className="w-[80%]"
				/>
			</div>*/}
			<ContactForm />
		</div>
	);
}
