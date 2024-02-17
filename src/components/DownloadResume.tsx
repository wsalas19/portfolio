import React from "react";
import { Button } from "./ui/button";
import { File } from "lucide-react";
import supabase from "@/lib/supabase";

function DownloadResume() {
	//TODO:
	// 1. Create a new file in the storage bucket called "cv"
	const downloadResume = async () => {
		const { data, error } = await supabase.storage.from("portfolio-assets").download("cv");
		if (error) {
			console.error(error);
			return;
		}
		console.log(data);
		/* const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "cv.pdf");
		document.body.appendChild(link);
		link.click();
		link.remove(); */
	};

	return (
		<Button
			//onClick={downloadResume}
			className=' font-bold bg-gray-900 text-white flex gap-2 hover:bg-palette-lime hover:text-gray-900 hover:border-palette-lime '
			variant={"outline"}
			size={"sm"}
		>
			<File className='inline-block w-4 h-4 ' />
			DOWNLOAD CV
		</Button>
	);
}

export default DownloadResume;
