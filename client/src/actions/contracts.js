import {
  getContract,
  getContracts,
  createContract,
  getStatus,
} from "../util/api";

export const FETCH_CONTRACT_REQUEST = "FETCH_CONTRACT_REQUEST";
export const FETCH_CONTRACT_SUCCESS = "FETCH_CONTRACT_SUCCESS";
export const FETCH_CONTRACT_ERROR = "FETCH_CONTRACT_ERROR";

const fetchContractRequest = { type: FETCH_CONTRACT_REQUEST };
const fetchContractSuccess = (contract) => ({
  type: FETCH_CONTRACT_SUCCESS,
  contract,
});
const fetchContractError = (error) => ({ type: FETCH_CONTRACT_ERROR, error });

export const fetchContract = (id = "") => async (dispatch) => {
  dispatch(fetchContractRequest);
  try {
    const contracts = await getContract(id);
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

export const fetchContracts = () => async (dispatch) => {
  dispatch(fetchContractsRequest);
  try {
    const contracts = await getContracts();
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
    const newContract = await createContract(contract);
    dispatch(createContractSuccess(newContract));
  } catch (error) {
    dispatch(createContractError(error));
  }
};

// export const FETCH_STATUS_REQUEST = "FETCH_STATUS_REQUEST";
// export const FETCH_STATUS_SUCCESS = "FETCH_STATUS_SUCCESS";
// export const FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR";

export const FETCH_STATUS_1_REQUEST = "FETCH_STATUS_1_REQUEST";
export const FETCH_STATUS_1_SUCCESS = "FETCH_STATUS_1_SUCCESS";
export const FETCH_STATUS_1_ERROR = "FETCH_STATUS_1_ERROR";

export const FETCH_STATUS_2_REQUEST = "FETCH_STATUS_2_REQUEST";
export const FETCH_STATUS_2_SUCCESS = "FETCH_STATUS_2_SUCCESS";
export const FETCH_STATUS_2_ERROR = "FETCH_STATUS_2_ERROR";

// const fetchStatusRequest = { type: FETCH_STATUS_REQUEST };
// const fetchStatusSuccess = (status) => ({
//   type: FETCH_STATUS_SUCCESS,
//   status,
// });
// const fetchStatusError = (error) => ({ type: FETCH_STATUS_ERROR, error });

const fetchStatus1Request = { type: FETCH_STATUS_1_REQUEST };
const fetchStatus1Success = (status) => ({
  type: FETCH_STATUS_1_SUCCESS,
  status,
});
const fetchStatus1Error = (error) => ({ type: FETCH_STATUS_1_ERROR, error });

const fetchStatus2Request = { type: FETCH_STATUS_2_REQUEST };
const fetchStatus2Success = (status) => ({
  type: FETCH_STATUS_2_SUCCESS,
  status,
});
const fetchStatus2Error = (error) => ({ type: FETCH_STATUS_2_ERROR, error });

export const fetchStatus = (id = "", party = "") => async (dispatch) => {
  let request, success, error;
  if (parseInt(party) === 1) {
    request = fetchStatus1Request;
    success = fetchStatus1Success;
    error = fetchStatus1Error;
  } else if (parseInt(party) === 2) {
    request = fetchStatus2Request;
    success = fetchStatus2Success;
    error = fetchStatus2Error;
  }
  // else {
  // dispatch(error("party can only be 1 or 2"));
  // }
  dispatch(request);
  try {
    const status = await getStatus(id, party);
    dispatch(success(status));
  } catch (err) {
    dispatch(error(err));
  }
};
