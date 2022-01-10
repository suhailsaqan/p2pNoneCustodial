import {
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_ERROR,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_ERROR,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_ERROR,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_ERROR,
} from "../actions/contracts";
import { hideErrorClearTimeout, showErrorWithTimeout } from "../actions/error";

export default (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case CREATE_CONTRACT_SUCCESS:
    case FETCH_CONTRACT_SUCCESS:
    case FETCH_CONTRACTS_SUCCESS:
    case FETCH_STATUS_SUCCESS:
      if (store.getState().error) store.dispatch(hideErrorClearTimeout());
      break;

    case FETCH_CONTRACT_ERROR:
    case FETCH_CONTRACTS_ERROR:
    case CREATE_CONTRACT_ERROR:
    case FETCH_STATUS_ERROR:
      store.dispatch(showErrorWithTimeout(action.error));
      break;

    default:
      break;
  }
};
