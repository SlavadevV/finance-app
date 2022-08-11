import actions from "./actionCreate";

const getTickers = (res) => async (dispatch) => {
  dispatch(actions.getTickersRequest());
  try {
	  dispatch(actions.getTickersSuccess(res));
  } catch (error) {
    dispatch(actions.getTickersError(error.message));
  }
};

const addLastPriceTickers = (response) => (dispatch) => {
  dispatch(actions.addLastPricesRequest());
  try {
	  dispatch(actions.addLastPricesSuccess(response));
  } catch (error) {
    dispatch(actions.addLastPricesError(error.message));
  }
};
export default {
  getTickers,
  addLastPriceTickers,
};
