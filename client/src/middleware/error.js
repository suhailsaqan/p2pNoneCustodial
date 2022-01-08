import {
  FETCH_CONTRACT_REQUEST,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_ERROR,
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_ERROR,
} from "../actions/contracts";
import { hideErrorClearTimeout } from "../actions/error";

export default (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case FETCH_CONTRACT_REQUEST:
    case FETCH_CONTRACT_SUCCESS:
    case FETCH_CONTRACT_ERROR:
    case CREATE_CONTRACT_REQUEST:
    case CREATE_CONTRACT_SUCCESS:
    case CREATE_CONTRACT_ERROR:
      if (store.getState().error) store.dispatch(hideErrorClearTimeout());
      break;

    default:
      break;
  }
};
