import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
	const { data, error } = await supabase.storage
		.from("portfolio-assets")
		.createSignedUrl("personal-photo", 500);
	const imgSize = 300;
	return (
		<>
			<ProfileCard data={data} imgSize={imgSize} />
			<Experience />
			<ContactForm />
		</>
	);
}
