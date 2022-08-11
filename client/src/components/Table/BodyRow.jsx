import React from "react";
import {connect} from "react-redux";
import selectors from "../../store-redux/selectors";
import {makeStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Graph from "../ReactChart/Diagram";
import AssessmentIcon from '@material-ui/icons/Assessment';
import {Date} from "./Date";
import {ChangeTable} from "./ChangeTable";

const useRowStyles = makeStyles({
	root: {
		"*": {
			heigth: "10px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			
		},
		"& > *": {
			borderBottom: "unset",
			heigth: "10px",
			color: "white"
		},
	},
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
	
	chart: {
		maxWidth: "250px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	
});


export const Row = props => {
	const {row} = props;
	const classes = useRowStyles();
	
	return (
		<>
			<TableRow className={classes.root}>
				<TableCell>
					<AssessmentIcon fontSize="large" color="primary"/>
				</TableCell>
				<TableCell
					className={props.colorSelectorUpDownPriceLine(row, classes)}
					component="th"
					scope="row"
				>
					{row.ticker}
				</TableCell>
				<TableCell align="center">{row.exchange}</TableCell>
				<TableCell
					className={props.colorSelectorUpDownPriceLine(row, classes)}
					align="center"
				>
					<Typography>{row.price}</Typography>
				</TableCell>
				<TableCell align="right">{row.change}</TableCell>
				<TableCell align="right">{row.change_percent}</TableCell>
				<TableCell align="right">{row.dividend}</TableCell>
				<TableCell align="right">{row.yield}</TableCell>
				<TableCell className={classes.chart} align="right">
					<>
						<Graph
							key={row.ticker}
							chartName={row.ticker}
							height={50}
							width={250}
						/>
					</>
				</TableCell>
				<TableCell align="center">{Date(row.last_trade_time)}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{paddingBottom: 1, paddingTop: 1}} colSpan={10}/>
			</TableRow>
		</>
	);
};


const mapStateToProps = (state) => ({
	tickers: selectors.getTickersArray(state),
	getLastPricesArray: selectors.getLastPricesArray(state),
});


export default connect(mapStateToProps)(ChangeTable);
