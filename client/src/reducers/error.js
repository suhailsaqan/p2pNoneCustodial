import {
  FETCH_CONTRACT_ERROR,
  FETCH_CONTRACTS_ERROR,
  CREATE_CONTRACT_ERROR,
  FETCH_STATUS_ERROR,
  SETTLE_CONTRACT_ERROR,
  CANCEL_CONTRACT_ERROR,
  ADD_INVOICE_ERROR,
  SET_MESSAGES_ERROR,
  FETCH_SETTLE_STATUS_ERROR,
  FETCH_CANCEL_STATUS_ERROR,
} from "../actions/contracts";
import {
  FETCH_CHATROOM_ERROR,
  FETCH_MESSAGES_ERROR,
  CREATE_MESSAGE_ERROR,
} from "../actions/chatroom";
import {
  LOGIN_ERROR,
  SIGNUP_ERROR,
  CHANGE_PASSWORD_ERROR,
} from "../actions/auth";
import { HIDE_ERROR } from "../actions/error";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
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
    case CHANGE_PASSWORD_ERROR:
    case FETCH_CHATROOM_ERROR:
    case FETCH_MESSAGES_ERROR:
    case CREATE_MESSAGE_ERROR:
      return action.error;

    case HIDE_ERROR:
      return null;

    default:
      return state;
  }
};
