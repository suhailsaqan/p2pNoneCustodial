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

export const FETCH_STATUS_REQUEST = "FETCH_STATUS_REQUEST";
export const FETCH_STATUS_SUCCESS = "FETCH_STATUS_SUCCESS";
export const FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR";

const fetchStatusRequest = { type: FETCH_STATUS_REQUEST };
const fetchStatusSuccess = (status) => ({
  type: FETCH_STATUS_SUCCESS,
  status,
});
const fetchStatusError = (error) => ({ type: FETCH_STATUS_ERROR, error });

export const fetchStatus = (id = "", party = "") => async (dispatch) => {
  dispatch(fetchStatusRequest);
  try {
    const status = await getStatus(id, party);
    dispatch(fetchStatusSuccess(status));
  } catch (error) {
    dispatch(fetchStatusError(error));
  }
};
