"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { ButtonControl, ButtonLabel } from "@/lib/types/globals";
import { useToast } from "./ui/use-toast";

function DownloadResume() {
	const [buttonControl, setButtonControl] = useState<
		ButtonControl<ButtonLabel>
	>({
		sent: false,
		name: ButtonLabel.DOWNLOAD,
	});
	const { toast } = useToast();

	const downloadResume = () => {
		setButtonControl({ sent: true, name: ButtonLabel.DOWNLOADING });

		try {
			const url = "/docs/resume.pdf";
			const link = document.createElement("a");

			link.href = url;
			link.download = "resume.pdf";

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.log(error);
			toast({
				title: `Something went wrong`,
				description: `Please try again later.`,
				variant: "destructive",
			});
		} finally {
			setButtonControl({ sent: false, name: ButtonLabel.DOWNLOAD });
		}
	};
	return (
		<Button
			onClick={downloadResume}
			disabled={buttonControl.sent}
			//className='hidden font-bold bg-gray-900 text-white md:flex gap-2 hover:bg-palette-pink hover:text-gray-900 hover:border-palette-pink/35 '
			className="text-[16px]"
			variant={"green"}
			size={"sm"}
		>
			<Download aria-label="download icon" className="inline-block w-5 h-5 " />
			{buttonControl.name}
		</Button>
	);
}

export default DownloadResume;
