"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ButtonControl } from "@/types/globals";

function DownloadResume() {
	const [buttonControl, setButtonControl] = useState<ButtonControl<"Resume" | "Downloading">>({
		sent: false,
		name: "Resume",
	});
	const downloadResume = async () => {
		setButtonControl({ sent: true, name: "Downloading" });
		try {
			const { data, error } = await supabase.storage.from("portfolio-assets").download("cv");
			if (data) {
				const blob = new Blob([data], { type: "application/pdf" });

				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");

				link.href = url;
				link.download = "resume.pdf";

				document.body.appendChild(link);
				setButtonControl({ sent: false, name: "Resume" });
				link.click();

				document.body.removeChild(link);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Button
			onClick={downloadResume}
			disabled={buttonControl.sent}
			className=' font-bold bg-gray-900 text-white flex gap-2 hover:bg-palette-lime hover:text-gray-900 hover:border-palette-lime '
			variant={"outline"}
			size={"sm"}
		>
			<Download className='inline-block w-4 h-4 ' />
			{buttonControl.name}
		</Button>
	);
}

export default DownloadResume;
