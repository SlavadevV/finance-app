import {connect} from "react-redux";
import React, {useEffect} from "react";
import {io} from "socket.io-client";
import selectors from "../../store-redux/selectors";
import operations from "../../store-redux/dispatch";
import Table from "../Table/BodyRow";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";

const socket = io("http://localhost:4000");
socket.emit("start");

const TickersBoard = ({getTickers}) => {
	
	useEffect(() => {
		socket.on("ticker", (response) => {
			getTickers(response);
		});
	}, []);
	
	return (
		<Container >
			<Typography color="secondary" variant="h3">TickersBoard</Typography>
			<Table/>
		</Container>
	);
}

const mapStateToProps = (state) => ({
	tickers: selectors.getTickersArray(state),
});

const mapDispatchToProrps = (dispatch) => ({
	getTickers: (data) => dispatch(operations.getTickers(data)),
});

export default connect(mapStateToProps, mapDispatchToProrps)(TickersBoard);
