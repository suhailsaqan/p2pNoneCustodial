import {
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_ERROR,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_ERROR,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_ERROR,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_ERROR,
  SETTLE_CONTRACT_SUCCESS,
  SETTLE_CONTRACT_ERROR,
  CANCEL_CONTRACT_SUCCESS,
  CANCEL_CONTRACT_ERROR,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_ERROR,
  SET_MESSAGES_SUCCESS,
  SET_MESSAGES_ERROR,
  FETCH_SETTLE_STATUS_SUCCESS,
  FETCH_SETTLE_STATUS_ERROR,
  FETCH_CANCEL_STATUS_SUCCESS,
  FETCH_CANCEL_STATUS_ERROR,
  SET_STATUS,
} from "../actions/contracts";
import {
  FETCH_CHATROOM_SUCCESS,
  FETCH_CHATROOM_ERROR,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_ERROR,
  ADD_MESSAGE,
} from "../actions/chatroom";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT,
} from "../actions/auth";
import { hideErrorClearTimeout, showErrorWithTimeout } from "../actions/error";

export default (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case CREATE_CONTRACT_SUCCESS:
    case FETCH_CONTRACT_SUCCESS:
    case FETCH_CONTRACTS_SUCCESS:
    case FETCH_STATUS_SUCCESS:
    case SETTLE_CONTRACT_SUCCESS:
    case CANCEL_CONTRACT_SUCCESS:
    case ADD_INVOICE_SUCCESS:
    case SET_MESSAGES_SUCCESS:
    case FETCH_SETTLE_STATUS_SUCCESS:
    case FETCH_CANCEL_STATUS_SUCCESS:
    case SET_STATUS:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGOUT:
    case FETCH_CHATROOM_SUCCESS:
    case FETCH_MESSAGES_SUCCESS:
    case CREATE_MESSAGE_SUCCESS:
    case ADD_MESSAGE:
      if (store.getState().error) store.dispatch(hideErrorClearTimeout());
      break;

    case FETCH_CONTRACT_ERROR:
    case FETCH_CONTRACTS_ERROR:
    case CREATE_CONTRACT_ERROR:
    case FETCH_STATUS_ERROR:
    case SETTLE_CONTRACT_ERROR:
    case CANCEL_CONTRACT_ERROR:
    case ADD_INVOICE_ERROR:
    case SET_MESSAGES_ERROR:
    case FETCH_SETTLE_STATUS_ERROR:
    case FETCH_CANCEL_STATUS_ERROR:
    case LOGIN_ERROR:
    case SIGNUP_ERROR:
    case FETCH_CHATROOM_ERROR:
    case FETCH_MESSAGES_ERROR:
    case CREATE_MESSAGE_ERROR:
      store.dispatch(showErrorWithTimeout(action.error));
      break;

    default:
      break;
  }
};
