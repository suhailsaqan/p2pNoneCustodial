import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import form from "./reducers/form";
import error from "./reducers/error";
import theme from "./reducers/theme";
import contracts from "./reducers/contracts";
import errorMiddleware from "./middleware/error";
import themeMiddleware from "./middleware/theme";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ contracts, error, theme }),
  composeEnhancers(applyMiddleware(thunk, errorMiddleware, themeMiddleware))
);
