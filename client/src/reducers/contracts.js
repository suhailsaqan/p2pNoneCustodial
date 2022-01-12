import {
  FETCH_CONTRACT_REQUEST,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_ERROR,
  FETCH_CONTRACTS_REQUEST,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_ERROR,
  CREATE_CONTRACT_REQUEST,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_ERROR,
  // FETCH_STATUS_REQUEST,
  // FETCH_STATUS_SUCCESS,
  // FETCH_STATUS_ERROR,
  FETCH_STATUS_1_REQUEST,
  FETCH_STATUS_1_SUCCESS,
  FETCH_STATUS_1_ERROR,
  FETCH_STATUS_2_REQUEST,
  FETCH_STATUS_2_SUCCESS,
  FETCH_STATUS_2_ERROR,
  SETTLE_CONTRACT_REQUEST,
  SETTLE_CONTRACT_SUCCESS,
  SETTLE_CONTRACT_ERROR,
  CANCEL_CONTRACT_REQUEST,
  CANCEL_CONTRACT_SUCCESS,
  CANCEL_CONTRACT_ERROR,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_ERROR,
} from "../actions/contracts";

const initialState = { isFetching: false, items: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTRACT_REQUEST:
      return { ...state, isFetching: true, contract: null, newContract: null };
    case FETCH_CONTRACT_SUCCESS:
      return { ...state, isFetching: false, contract: action.contract };
    case FETCH_CONTRACT_ERROR:
      return { ...state, isFetching: false };

    case FETCH_CONTRACTS_REQUEST:
      return { ...state, isFetching: true, contract: null, newContract: null };
    case FETCH_CONTRACTS_SUCCESS:
      return { ...state, isFetching: false, items: action.contracts };
    case FETCH_CONTRACTS_ERROR:
      return { ...state, isFetching: false };

    case CREATE_CONTRACT_REQUEST:
      return { ...state, isFetching: true };
    case CREATE_CONTRACT_SUCCESS:
      return { ...state, isFetching: false, newContract: action.contract };
    case CREATE_CONTRACT_ERROR:
      return { ...state, isFetching: false, error: action.error };

    // case FETCH_STATUS_REQUEST:
    //   return { ...state, isFetching: true, status: null};
    // case FETCH_STATUS_SUCCESS:
    //   return { ...state, isFetching: false, status: action.status };
    // case FETCH_STATUS_ERROR:
    //   return { ...state, isFetching: false };

    case FETCH_STATUS_1_REQUEST:
      return { ...state, isFetching: true, status_1: null };
    case FETCH_STATUS_1_SUCCESS:
      return { ...state, isFetching: false, status_1: action.status };
    case FETCH_STATUS_1_ERROR:
      return { ...state, isFetching: false };

    case FETCH_STATUS_2_REQUEST:
      return { ...state, isFetching: true, status_2: null };
    case FETCH_STATUS_2_SUCCESS:
      return { ...state, isFetching: false, status_2: action.status };
    case FETCH_STATUS_2_ERROR:
      return { ...state, isFetching: false };

    case SETTLE_CONTRACT_REQUEST:
      return { ...state, isFetching: true, contract: null, newContract: null };
    case SETTLE_CONTRACT_SUCCESS:
      return { ...state, isFetching: false, contract: action.contract };
    case SETTLE_CONTRACT_ERROR:
      return { ...state, isFetching: false };

    case CANCEL_CONTRACT_REQUEST:
      return { ...state, isFetching: true, contract: null, newContract: null };
    case CANCEL_CONTRACT_SUCCESS:
      return { ...state, isFetching: false, contract: action.contract };
    case CANCEL_CONTRACT_ERROR:
      return { ...state, isFetching: false };

    case ADD_INVOICE_REQUEST:
      return { ...state, isFetching: true, contract: null, newContract: null };
    case ADD_INVOICE_SUCCESS:
      return { ...state, isFetching: false, contract: action.contract };
    case ADD_INVOICE_ERROR:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
