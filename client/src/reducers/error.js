import {
  FETCH_CONTRACT_ERROR,
  FETCH_CONTRACTS_ERROR,
  CREATE_CONTRACT_ERROR,
  // FETCH_STATUS_ERROR,
  FETCH_STATUS_1_ERROR,
  FETCH_STATUS_2_ERROR,
  SETTLE_CONTRACT_ERROR,
  CANCEL_CONTRACT_ERROR,
  ADD_INVOICE_ERROR,
} from "../actions/contracts";
import { HIDE_ERROR } from "../actions/error";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_ERROR:
    case FETCH_CONTRACTS_ERROR:
    case CREATE_CONTRACT_ERROR:
    // case FETCH_STATUS_ERROR:
    case FETCH_STATUS_1_ERROR:
    case FETCH_STATUS_2_ERROR:
    case SETTLE_CONTRACT_ERROR:
    case CANCEL_CONTRACT_ERROR:
    case ADD_INVOICE_ERROR:
      return action.error;

    case HIDE_ERROR:
      return null;

    default:
      return state;
  }
};
