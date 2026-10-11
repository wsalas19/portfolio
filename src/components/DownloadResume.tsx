"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { getChromeCopy, localeFromPathname } from "@/lib/i18n/core";
import { usePathname } from "next/navigation";

function DownloadResume() {
	const [downloading, setDownloading] = useState(false);
	const { toast } = useToast();
	const pathname = usePathname();
	const copy = getChromeCopy(localeFromPathname(pathname)).chrome;

	const downloadResume = () => {
		setDownloading(true);

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
			setDownloading(false);
		}
	};
	return (
		<Button
			onClick={downloadResume}
			disabled={downloading}
			className=" w-full md:w-fit"
			variant={"green"}
			size={"sm"}
		>
			<Download aria-label={copy.downloadIconLabel} className="inline-block w-5 h-5 " />
			{downloading ? copy.downloading : copy.downloadCv}
		</Button>
	);
}

export default DownloadResume;
