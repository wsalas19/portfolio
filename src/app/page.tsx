import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard";
import Experience from "@/components/Experience";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
	//const { data } = await supabase.storage.from("portfolio-assets").getPublicUrl("personal-photo");
	const image = await getImage();
	const url = image?.publicUrl;
	const imgSize = 300;
	return (
		<>
			<ProfileCard url={url} imgSize={imgSize} />
			<Experience />
			<ContactForm />
		</>
	);
}
const getImage = async () => {
	try {
		const { data } = await supabase.storage.from("portfolio-assets").getPublicUrl("personal-photo");
		return data;
	} catch (error: unknown) {
		console.log(error);
		return;
	}
};
