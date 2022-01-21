import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import form from "./reducers/form";
import error from "./reducers/error";
import auth from "./reducers/auth";
import theme from "./reducers/theme";
import contracts from "./reducers/contracts";
import chatroom from "./reducers/chatroom";
import errorMiddleware from "./middleware/error";
import authMiddleware from "./middleware/auth";
import themeMiddleware from "./middleware/theme";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ form, contracts, chatroom, error, auth, theme }),
  composeEnhancers(
    applyMiddleware(thunk, authMiddleware, errorMiddleware, themeMiddleware)
  )
);
