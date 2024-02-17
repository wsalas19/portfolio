import supabase from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";

export default function Home() {
	const { data } = supabase.storage.from("portfolio-assets").getPublicUrl("personal-photo");
	const imgSize = 300;
	return (
		<>
			<ProfileCard data={data} imgSize={imgSize} />
			<Experience />
			<ContactForm />
		</>
	);
}
