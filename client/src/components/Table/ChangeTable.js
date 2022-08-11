import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {Row} from "./BodyRow";
import {makeStyles} from "@material-ui/core/styles";

const useRowStyles = makeStyles({
	
	head: {
		color: "white",
		fontSize: "15px"
	},
	
	priceUp: {
		background: "rgba(9,131,56,0.73)",
		textAlign: "center",
		fontSize: "14px",
	},
	
	priceDown: {
		background: "rgba(227,10,10,0.85)",
		textAlign: "center",
		fontSize: "14px",
	},
	
	
});

export const ChangeTable = ({tickers, getLastPricesArray}) => {
	const classes = useRowStyles();
	const colorSelectorUpDownPriceLine = (row, classes) => {
		let curElem = getLastPricesArray.filter(
			(item) => Object.keys(item)[0] === row.ticker
		);
		let pricesObj = curElem[0];
		let pricesArr;
		if (curElem.length !== 0) {
			pricesArr = Object.values(pricesObj)[0];
			let endPrice = pricesArr[pricesArr.length - 1];
			if (endPrice < row.price) {
				return classes.priceUp;
			} else {
				return classes.priceDown;
			}
		}
	};

	const createRows = tickers => tickers.map((ticker) => {
		const createData = ({...ticker}) => ({
			...ticker,
		});
		return createData(ticker);
	});
	
	let rows = createRows(tickers);
	
	return (
		<TableContainer color="">
			<Table>
				<TableHead>
					<TableRow>
						<TableCell/>
						<TableCell className={classes.head} variant="head">Company</TableCell>
						<TableCell className={classes.head} align="right">Exchange</TableCell>
						<TableCell className={classes.head} align="right">Price</TableCell>
						<TableCell className={classes.head} align="right">Change</TableCell>
						<TableCell className={classes.head} align="right">Change,%</TableCell>
						<TableCell className={classes.head} align="right">Dividend</TableCell>
						<TableCell className={classes.head} align="right">Yield</TableCell>
						<TableCell className={classes.head} align="center">Chart</TableCell>
						<TableCell className={classes.head} align="right">Time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						return (
							<Row
								colorSelectorUpDownPriceLine={colorSelectorUpDownPriceLine}
								key={row.ticker}
								row={row}
							/>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
