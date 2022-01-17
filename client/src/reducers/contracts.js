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
  FETCH_STATUS_REQUEST,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_ERROR,
  SETTLE_CONTRACT_REQUEST,
  SETTLE_CONTRACT_SUCCESS,
  SETTLE_CONTRACT_ERROR,
  CANCEL_CONTRACT_REQUEST,
  CANCEL_CONTRACT_SUCCESS,
  CANCEL_CONTRACT_ERROR,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_ERROR,
  SET_MESSAGES_REQUEST,
  SET_MESSAGES_SUCCESS,
  SET_MESSAGES_ERROR,
  FETCH_SETTLE_STATUS_REQUEST,
  FETCH_SETTLE_STATUS_SUCCESS,
  FETCH_SETTLE_STATUS_ERROR,
  FETCH_CANCEL_STATUS_REQUEST,
  FETCH_CANCEL_STATUS_SUCCESS,
  FETCH_CANCEL_STATUS_ERROR,
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

    case FETCH_STATUS_REQUEST:
      return { ...state, isFetching: true, status_1: null };
    case FETCH_STATUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status_1: action.status["1"],
        status_2: action.status["2"],
      };
    case FETCH_STATUS_ERROR:
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

    case SET_MESSAGES_REQUEST:
      return { ...state, isFetching: true };
    case SET_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        payment_not_received: action.payment_not_received,
        payment_received: action.payment_received,
        instructions: action.instructions,
        invoice_form: action.invoice_form,
        completion_message: action.completion_message,
        instructions_awaiting_counterparty_invoice:
          action.instructions_awaiting_counterparty_invoice,
        instructions_awaiting_counterparty_deposit:
          action.instructions_awaiting_counterparty_deposit,
        invoice_container: action.invoice_container,
        instructions_awaiting_settlement_invoice_submitted:
          action.instructions_awaiting_settlement_invoice_submitted,
        instructions_awaiting_settlement_invoice_paid:
          action.instructions_awaiting_settlement_invoice_paid,
        payment_sent: action.payment_sent,
        payment_not_sent: action.payment_not_sent,
        instructions_invoiced: action.instructions_invoiced,
      };
    case SET_MESSAGES_ERROR:
      return { ...state, isFetching: false };

    case FETCH_SETTLE_STATUS_REQUEST:
      return { ...state, isFetching: true, status_1: null };
    case FETCH_SETTLE_STATUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        settle_status_1: action.status["1"],
        settle_status_2: action.status["2"],
      };
    case FETCH_SETTLE_STATUS_ERROR:
      return { ...state, isFetching: false };

    case FETCH_CANCEL_STATUS_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_CANCEL_STATUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cancel_status_1: action.status["1"],
        cancel_status_2: action.status["2"],
      };
    case FETCH_CANCEL_STATUS_ERROR:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
