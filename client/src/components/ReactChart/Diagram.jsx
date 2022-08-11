import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import selectors from "../../store-redux/selectors";
import operations from "../../store-redux/dispatch";
import {Chart, LineSeries, ValueAxis,} from "@devexpress/dx-react-chart-material-ui";

const Diagram = ({tickers, addLastPriceTickers, chartName, height, width, valueAxis,}) => {
	const [pricesTickers, setPricesTickers] = useState([]);
	const [chartData, setChartData] = useState([{argument: 0, value: 0}]);
	
	const createNewPrices = () => {
		let data;
		data = tickers.map((item) => {
			let name = item.ticker;
			let price = item.price;
			return {[name]: [Number(price)]};
		});
		return data;
	};
	
	const addNewItemToPrices = prevPriceTickers => {
		let data;
		data = tickers.map((item, index) => {
			let name = item.ticker;
			let price = item.price;
			let currentPrevTicker = prevPriceTickers[index];
			let currentPrevPriceArray = currentPrevTicker[name];
			let newPriceArray = [...currentPrevPriceArray, Number(price)];
			return {[name]: newPriceArray};
		});
		return data;
	};
	
	useEffect(() => {
		createChartData(pricesTickers, chartName);
	}, [pricesTickers]);
	
	useEffect(() => {
		if (pricesTickers.length === 0) {
			let firstItemPrice = createNewPrices(pricesTickers);
			setPricesTickers(firstItemPrice);
		} else if (pricesTickers.length >= 1) {
			setPricesTickers((prevPriceTickers) => {
				return addNewItemToPrices(prevPriceTickers);
			});
		}
		addLastPriceTickers(pricesTickers);
	}, [tickers]);
	
	const createChartData = (pricesTickers, chartName) => {
		if (pricesTickers.length > 0) {
			let currentTicker = pricesTickers.filter(
				(item) => chartName === Object.keys(item)[0]
			);
			let objValues = currentTicker[0];
			let arrValues = objValues[chartName];
			let values = arrValues.map((item, idx) => {
				return {argument: idx + 1, value: item};
			});
			setChartData(values);
		} else {
			return setChartData([{argument: 0, value: 0}]);
		}
	};
	
	return (
		<Chart data={chartData} height={height} width={width} valueaxis={valueAxis}>
			{valueAxis === true ? <ValueAxis/> : null}
			<LineSeries valueField="value" argumentField="argument"/>
		</Chart>
	);
};

const mapStateToProps = (state) => ({
	tickers: selectors.getTickersArray(state),
});

const mapDispatchToProrps = (dispatch) => ({
	getTickers: (data) => dispatch(operations.getTickers(data)),
	addLastPriceTickers: (data) => dispatch(operations.addLastPriceTickers(data)),
});


export default connect(mapStateToProps, mapDispatchToProrps)(Diagram);
