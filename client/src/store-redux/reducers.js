import {combineReducers} from "redux";
import {createReducer} from "@reduxjs/toolkit";
import actions from "./actionCreate";

const tickers = createReducer([], {
	[actions.getTickersSuccess]: (_, {payload}) => [...payload],
});

const tickersLastPrices = createReducer([], {
	[actions.addLastPricesSuccess]: (_, {payload}) => [...payload],
});

export default combineReducers({tickers, tickersLastPrices});
