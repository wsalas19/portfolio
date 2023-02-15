import { Box, Grid, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function ProjectDetails() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Box w={"100%"} h={"93.6vh"} bg={"red"}>
				<Heading>Project id# {id}</Heading>
				<Grid gridTemplateAreas={""}></Grid>
			</Box>
		</>
	);
}

export default ProjectDetails;
