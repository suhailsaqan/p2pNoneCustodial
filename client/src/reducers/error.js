import {
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_ERROR,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_ERROR,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_ERROR,
} from "../actions/contracts";
import { HIDE_ERROR } from "../actions/error";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_ERROR:
    case FETCH_CONTRACTS_ERROR:
    case CREATE_CONTRACT_ERROR:
      return action.error;

    case HIDE_ERROR:
      return null;

    default:
      return state;
  }
};
