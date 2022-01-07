import {
  FETCH_CONTRACT_REQUEST,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_ERROR,
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_ERROR,
} from "../actions/contracts";

const initialState = { isFetching: false, items: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_REQUEST:
      return { ...state, isFetching: true, contract: null, newContract: null };
    case FETCH_CONTRACT_SUCCESS:
      return { ...state, isFetching: false, items: action.contracts };
    case FETCH_CONTRACT_ERROR:
      return { ...state, isFetching: false };

    case CREATE_CONTRACT_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_CONTRACT_SUCCESS:
      return { ...state, isFetching: false, newContract: action.contract };
    case CREATE_CONTRACT_ERROR:
      return { ...state, isFetching: false, error: action.error };

    default:
      return state;
  }
};
