import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
	const imgSize = 300;
	return (
		<>
			<ProfileCard imgSize={imgSize} />
			<Experience />
			<ContactForm />
		</>
	);
}
