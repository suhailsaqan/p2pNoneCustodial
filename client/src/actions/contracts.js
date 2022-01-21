import {
  getContract,
  getContracts,
  createContract,
  getStatus,
  settleContract,
  cancelContract,
  addInvoice,
  getSettleStatus,
  getCancelStatus,
} from "../util/api";

const STATUS_TYPES = {
  CONTRACT_FUNDED_AWAITING_SETTLEMENT: "Contract funded, awaiting settlement",
  CONTRACT_PAID_AWAITING_SETTLEMENT: "Contract paid, awaiting settlement",
  CONTRACT_CANCELED: "Canceled",
  CONTRACT_SETTLED: "Settled",
  WAITING_ON_OTHER_PARTY: "Waiting on other party",
  NEEDS_TO_PAY: "Needs to pay",
  NEEDS_TO_SUBMIT_INVOICE: "Needs to submit invoice",
};

export const FETCH_CONTRACT_REQUEST = "FETCH_CONTRACT_REQUEST";
export const FETCH_CONTRACT_SUCCESS = "FETCH_CONTRACT_SUCCESS";
export const FETCH_CONTRACT_ERROR = "FETCH_CONTRACT_ERROR";

const fetchContractRequest = { type: FETCH_CONTRACT_REQUEST };
const fetchContractSuccess = (contract) => ({
  type: FETCH_CONTRACT_SUCCESS,
  contract,
});
const fetchContractError = (error) => ({ type: FETCH_CONTRACT_ERROR, error });

export const fetchContract = (id = "") => async (dispatch, getState) => {
  dispatch(fetchContractRequest);
  try {
    const { token } = getState().auth;
    const contracts = await getContract(id, token);
    dispatch(fetchContractSuccess(contracts));
  } catch (error) {
    dispatch(fetchContractError(error));
  }
};

export const FETCH_CONTRACTS_REQUEST = "FETCH_CONTRACTS_REQUEST";
export const FETCH_CONTRACTS_SUCCESS = "FETCH_CONTRACTS_SUCCESS";
export const FETCH_CONTRACTS_ERROR = "FETCH_CONTRACTS_ERROR";

const fetchContractsRequest = { type: FETCH_CONTRACTS_REQUEST };
const fetchContractsSuccess = (contracts) => ({
  type: FETCH_CONTRACT_SUCCESS,
  contracts,
});
const fetchContractsError = (error) => ({ type: FETCH_CONTRACT_ERROR, error });

export const fetchContracts = () => async (dispatch, getState) => {
  dispatch(fetchContractsRequest);
  try {
    const { token } = getState().auth;
    const contracts = await getContracts(token);
    dispatch(fetchContractsSuccess(contracts));
  } catch (error) {
    dispatch(fetchContractsError(error));
  }
};

export const CREATE_CONTRACT_REQUEST = "CREATE_CONTRACT_REQUEST";
export const CREATE_CONTRACT_SUCCESS = "CREATE_CONTRACT_SUCCESS";
export const CREATE_CONTRACT_ERROR = "CREATE_CONTRACT_ERROR";

const createContractRequest = { type: CREATE_CONTRACT_REQUEST };
const createContractSuccess = (contract) => ({
  type: CREATE_CONTRACT_SUCCESS,
  contract,
});
const createContractError = (error) => ({ type: CREATE_CONTRACT_ERROR, error });

export const attemptCreateContract = (contract) => async (
  dispatch,
  getState
) => {
  dispatch(createContractRequest);
  try {
    const { token } = getState().auth;
    const newContract = await createContract(contract, token);
    dispatch(createContractSuccess(newContract));
  } catch (error) {
    dispatch(createContractError(error));
  }
};

export const FETCH_STATUS_REQUEST = "FETCH_STATUS_REQUEST";
export const FETCH_STATUS_SUCCESS = "FETCH_STATUS_SUCCESS";
export const FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR";

const fetchStatusRequest = { type: FETCH_STATUS_REQUEST };
const fetchStatusSuccess = (status) => ({
  type: FETCH_STATUS_SUCCESS,
  status,
});
const fetchStatusError = (error) => ({ type: FETCH_STATUS_ERROR, error });

export const fetchStatus = (id, party) => async (dispatch, getState) => {
  dispatch(fetchStatusRequest);
  try {
    const { token } = getState().auth;
    const status = await getStatus(id, party, token);
    dispatch(fetchStatusSuccess(status));
  } catch (err) {
    dispatch(fetchStatusError(err));
  }
};

export const SETTLE_CONTRACT_REQUEST = "SETTLE_CONTRACT_REQUEST";
export const SETTLE_CONTRACT_SUCCESS = "SETTLE_CONTRACT_SUCCESS";
export const SETTLE_CONTRACT_ERROR = "SETTLE_CONTRACT_ERROR";

const settleContractRequest = { type: SETTLE_CONTRACT_REQUEST };
const settleContractSuccess = (contract) => ({
  type: SETTLE_CONTRACT_SUCCESS,
  contract,
});
const settleContractError = (error) => ({ type: SETTLE_CONTRACT_ERROR, error });

export const attemptSettleContract = (id, party) => async (
  dispatch,
  getState
) => {
  dispatch(settleContractRequest);
  try {
    const { token } = getState().auth;
    const contract = await settleContract(id, party, token);
    dispatch(settleContractSuccess(contract));
  } catch (error) {
    dispatch(settleContractError(error));
  }
};

export const CANCEL_CONTRACT_REQUEST = "CANCEL_CONTRACT_REQUEST";
export const CANCEL_CONTRACT_SUCCESS = "CANCEL_CONTRACT_SUCCESS";
export const CANCEL_CONTRACT_ERROR = "CANCEL_CONTRACT_ERROR";

const cancelContractRequest = { type: CANCEL_CONTRACT_REQUEST };
const cancelContractSuccess = (contract) => ({
  type: CANCEL_CONTRACT_SUCCESS,
  contract,
});
const cancelContractError = (error) => ({ type: CANCEL_CONTRACT_ERROR, error });

export const attemptCancelContract = (id, party, token) => async (
  dispatch,
  getState
) => {
  dispatch(cancelContractRequest);
  try {
    const { token } = getState().auth;
    const contract = await cancelContract(id, party, token);
    dispatch(cancelContractSuccess(contract));
  } catch (error) {
    dispatch(cancelContractError(error));
  }
};

export const ADD_INVOICE_REQUEST = "ADD_INVOICE_REQUEST";
export const ADD_INVOICE_SUCCESS = "ADD_INVOICE_SUCCESS";
export const ADD_INVOICE_ERROR = "ADD_INVOICE_ERROR";

const addInvoiceRequest = { type: ADD_INVOICE_REQUEST };
const addInvoiceSuccess = (contract) => ({
  type: ADD_INVOICE_SUCCESS,
  contract,
});
const addInvoiceError = (error) => ({ type: ADD_INVOICE_ERROR, error });

export const attemptAddInvoice = (id, party, invoice) => async (
  dispatch,
  getState
) => {
  dispatch(addInvoiceRequest);
  try {
    const { token } = getState().auth;
    const contract = await addInvoice(id, party, invoice, token);
    dispatch(addInvoiceSuccess(contract));
  } catch (error) {
    dispatch(addInvoiceError(error));
  }
};

export const SET_MESSAGES_REQUEST = "SET_MESSAGES_REQUEST";
export const SET_MESSAGES_SUCCESS = "SET_MESSAGES_SUCCESS";
export const SET_MESSAGES_ERROR = "SET_MESSAGES_ERROR";

const setMessagesRequest = { type: SET_MESSAGES_REQUEST };
const setMessagesSuccess = (
  payment_not_received,
  payment_received,
  instructions,
  invoice_form,
  completion_message,
  instructions_awaiting_counterparty_invoice,
  instructions_awaiting_counterparty_deposit,
  invoice_container,
  instructions_awaiting_settlement_invoice_submitted,
  instructions_awaiting_settlement_invoice_paid,
  payment_sent,
  payment_not_sent,
  instructions_invoiced
) => ({
  type: SET_MESSAGES_SUCCESS,
  payment_not_received,
  payment_received,
  instructions,
  invoice_form,
  completion_message,
  instructions_awaiting_counterparty_invoice,
  instructions_awaiting_counterparty_deposit,
  invoice_container,
  instructions_awaiting_settlement_invoice_submitted,
  instructions_awaiting_settlement_invoice_paid,
  payment_sent,
  payment_not_sent,
  instructions_invoiced,
});
const setMessagesError = (error) => ({ type: SET_MESSAGES_ERROR, error });

export const attemptSetMessages = (party) => async (dispatch, getState) => {
  dispatch(setMessagesRequest);
  try {
    const { token } = getState().auth;
    var payment_not_received = false;
    var payment_received = false;
    var instructions = false;
    var invoice_form = false;
    var completion_message = false;
    var instructions_awaiting_counterparty_invoice = false;
    var instructions_awaiting_counterparty_deposit = false;
    var invoice_container = false;
    var instructions_awaiting_settlement_invoice_submitted = false;
    var instructions_awaiting_settlement_invoice_paid = false;
    var payment_sent = false;
    var payment_not_sent = false;
    var instructions_invoiced = false;

    if (parseInt(party) == 1) {
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_received = true;
        completion_message = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_SETTLED) {
        if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) == 0
        ) {
          payment_sent = true;
          completion_message = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) == 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_received = true;
          completion_message = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_received = true;
          completion_message = true;
        }
      }
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_CANCELED) {
        if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) == 0
        ) {
          payment_not_sent = true;
          completion_message = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) == 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_not_received = true;
          completion_message = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_not_received = true;
          completion_message = true;
        }
      }
      if (getState().contracts.status_1 == STATUS_TYPES.NEEDS_TO_PAY) {
        invoice_container = true;
      }
      if (
        getState().contracts.status_1 == STATUS_TYPES.WAITING_ON_OTHER_PARTY
      ) {
        if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          getState().contracts.contract.second_party_original == undefined
        ) {
          instructions_awaiting_counterparty_invoice = true;
        } else if (
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          instructions_awaiting_counterparty_deposit = true;
        }
      }
      if (
        getState().contracts.status_1 ==
        STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_submitted = true;
        instructions = true;
      }
      if (
        getState().contracts.status_1 ==
        STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_paid = true;
        instructions = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_sent = true;
        completion_message = true;
      }
      if (
        getState().contracts.status_1 == STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE
      ) {
        invoice_form = true;
      }
      if (
        parseInt(getState().contracts.contract.second_party_amount) > 0 &&
        getState().contracts.contract.first_party_hodl !== undefined
      ) {
        instructions_invoiced = true;
      }
      if (invoice_form == false) {
        instructions = true;
      }
    } else if (parseInt(party) == 2) {
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_received = true;
        completion_message = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_SETTLED) {
        if (
          parseInt(getState().contracts.contract.first_party_amount) == 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_sent = true;
          completion_message = true;
        }
        if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) == 0
        ) {
          payment_received = true;
          completion_message = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_received = true;
          completion_message = true;
        }
      }
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_CANCELED) {
        if (
          parseInt(getState().contracts.contract.first_party_amount) == 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_not_sent = true;
          completion_message = true;
        }
        if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) == 0
        ) {
          payment_not_received = true;
          completion_message = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) > 0 &&
          parseInt(getState().contracts.contract.second_party_amount) > 0
        ) {
          payment_not_received = true;
          completion_message = true;
        }
      }
      if (getState().contracts.status_2 == STATUS_TYPES.NEEDS_TO_PAY) {
        invoice_container = true;
      }
      if (
        getState().contracts.status_1 == STATUS_TYPES.WAITING_ON_OTHER_PARTY
      ) {
        if (
          parseInt(getState().contracts.contract.second_party_amount) > 0 &&
          getState().contracts.contract.first_party_original == undefined
        ) {
          instructions_awaiting_counterparty_invoice = true;
        } else if (
          parseInt(getState().contracts.contract.first_party_amount) > 0
        ) {
          instructions_awaiting_counterparty_deposit = true;
        }
      }
      if (
        getState().contracts.status_2 ==
        STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_submitted = true;
        instructions = true;
      }
      if (
        getState().contracts.status_2 ==
        STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_paid = true;
        instructions = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_sent = true;
        completion_message = true;
      }
      if (
        getState().contracts.status_2 == STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE
      ) {
        invoice_form = true;
      }
      if (
        parseInt(getState().contracts.contract.first_party_amount) > 0 &&
        getState().contracts.contract.second_party_hodl !== undefined
      ) {
        instructions_invoiced = true;
      }
      if (invoice_form == false) {
        instructions = true;
      }
    }
    dispatch(
      setMessagesSuccess(
        payment_not_received,
        payment_received,
        instructions,
        invoice_form,
        completion_message,
        instructions_awaiting_counterparty_invoice,
        instructions_awaiting_counterparty_deposit,
        invoice_container,
        instructions_awaiting_settlement_invoice_submitted,
        instructions_awaiting_settlement_invoice_paid,
        payment_sent,
        payment_not_sent,
        instructions_invoiced
      )
    );
  } catch (error) {
    dispatch(setMessagesError(error));
  }
};

export const FETCH_SETTLE_STATUS_REQUEST = "FETCH_SETTLE_STATUS_REQUEST";
export const FETCH_SETTLE_STATUS_SUCCESS = "FETCH_SETTLE_STATUS_SUCCESS";
export const FETCH_SETTLE_STATUS_ERROR = "FETCH_SETTLE_STATUS_ERROR";

const fetchSettleStatusRequest = { type: FETCH_SETTLE_STATUS_REQUEST };
const fetchSettleStatusSuccess = (status) => ({
  type: FETCH_SETTLE_STATUS_SUCCESS,
  status,
});
const fetchSettleStatusError = (error) => ({
  type: FETCH_SETTLE_STATUS_ERROR,
  error,
});

export const fetchSettleStatus = (id, party) => async (dispatch, getState) => {
  dispatch(fetchSettleStatusRequest);
  try {
    const { token } = getState().auth;
    const status = await getSettleStatus(id, party, token);
    dispatch(fetchSettleStatusSuccess(status));
  } catch (error) {
    dispatch(fetchSettleStatusError(error));
  }
};

export const FETCH_CANCEL_STATUS_REQUEST = "FETCH_CANCEL_STATUS_REQUEST";
export const FETCH_CANCEL_STATUS_SUCCESS = "FETCH_CANCEL_STATUS_SUCCESS";
export const FETCH_CANCEL_STATUS_ERROR = "FETCH_CANCEL_STATUS_ERROR";

const fetchCancelStatusRequest = { type: FETCH_CANCEL_STATUS_REQUEST };
const fetchCancelStatusSuccess = (status) => ({
  type: FETCH_CANCEL_STATUS_SUCCESS,
  status,
});
const fetchCancelStatusError = (error) => ({
  type: FETCH_CANCEL_STATUS_ERROR,
  error,
});

export const fetchCancelStatus = (id, party) => async (dispatch, getState) => {
  dispatch(fetchCancelStatusRequest);
  try {
    const { token } = getState().auth;
    const status = await getCancelStatus(id, party, token);
    dispatch(fetchCancelStatusSuccess(status));
  } catch (error) {
    dispatch(fetchCancelStatusError(error));
  }
};

export const SET_STATUS = "SET_STATUS";

const setStatusSuccess = (status) => ({ type: SET_STATUS, status });

export const setStatus = (status) => (dispatch) => {
  dispatch(setStatusSuccess(status));
};
