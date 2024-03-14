"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ButtonControl } from "@/types/globals";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";

function DownloadResume() {
	const [buttonControl, setButtonControl] = useState<ButtonControl<"Resume" | "Downloading">>({
		sent: false,
		name: "Resume",
	});
	const { toast } = useToast();
	const downloadResume = async () => {
		setButtonControl({ sent: true, name: "Downloading" });
		try {
			const { data } = await supabase.storage.from("portfolio-assets").download("cv");
			if (data) {
				const blob = new Blob([data], { type: "application/pdf" });
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");

				link.href = url;
				link.download = "resume.pdf";

				document.body.appendChild(link);
				link.click();

				document.body.removeChild(link);
			}
		} catch (error) {
			console.log(error);
			toast({
				title: `Something went wrong`,
				description: `Please try again later.`,
				variant: "destructive",
			});
		} finally {
			setButtonControl({ sent: false, name: "Resume" });
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
			<Download aria-label='download icon' className='inline-block w-4 h-4 ' />
			{buttonControl.name}
		</Button>
	);
}

export default DownloadResume;
