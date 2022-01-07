import { getContracts, createContract } from "../util/api";

export const FETCH_CONTRACT_REQUEST = "FETCH_CONTRACT_REQUEST";
export const FETCH_CONTRACT_SUCCESS = "FETCH_CONTRACT_SUCCESS";
export const FETCH_CONTRACT_ERROR = "FETCH_CONTRACT_ERROR";

const fetchContractRequest = { type: FETCH_CONTRACT_REQUEST };
const fetchContractSuccess = (contracts) => ({
  type: FETCH_CONTRACT_SUCCESS,
  contracts,
});
const fetchContractError = (error) => ({ type: FETCH_CONTRACT_ERROR, error });

export const fetchContracts = (id = "") => async (dispatch) => {
  dispatch(fetchContractRequest);
  try {
    const contracts = await getContracts(id);
    dispatch(fetchContractSuccess(contracts));
  } catch (error) {
    dispatch(fetchContractError(error));
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
