import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "William Salas Dev Portfolio",
	description: "A brief showcase of my work.",
};
export default async function Home() {
	return (
		<>
			<ProfileCard />
			<Experience />
			<ContactForm />
		</>
	);
}
