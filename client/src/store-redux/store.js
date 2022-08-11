import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import appReducer from "./reducers";

const middleware = [
  ...getDefaultMiddleware({
    q: {
      ignoredActions: [],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export default { store };
