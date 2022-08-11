import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";


export const Date = (dateString) => {
	let date = dateString.slice(0, 10);
	let time = dateString.slice(11, 19);
	return (
		<Box>
			<Typography color="primary">{time}</Typography>
			<Typography color="secondary">{date}</Typography>
		</Box>
	);
}
