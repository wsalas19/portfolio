"use client";
import React from "react";
import { Button } from "./ui/button";
import { File } from "lucide-react";
import { supabase } from "@/lib/supabase";

function DownloadResume() {
	//TODO:
	// Make the button work, solve current supase key porblem.
	const downloadResume = async () => {
		try {
			const { data, error } = await supabase.storage.from("portfolio-assets").download("cv");
			if (data) {
				// Create a blob with the downloaded data
				const blob = new Blob([data], { type: "application/pdf" });

				// Create a downloadable link
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");

				// Set the link attributes
				link.href = url;
				link.download = "resume.pdf";

				// Append the link to the document
				document.body.appendChild(link);

				// Programmatically click the link to trigger the download
				link.click();

				// Remove the link from the document
				document.body.removeChild(link);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Button
			onClick={downloadResume}
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
