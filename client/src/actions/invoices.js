import { addInvoice } from "../util/api";

export const ADD_INVOICE_REQUEST = "ADD_INVOICE_REQUEST";
export const ADD_INVOICE_SUCCESS = "ADD_INVOICE_SUCCESS";
export const ADD_INVOICE_ERROR = "ADD_INVOICE_ERROR";

const createContractRequest = { type: ADD_INVOICE_REQUEST };
const createContractSuccess = (contract) => ({
  type: ADD_INVOICE_SUCCESS,
  contract,
});
const createContractError = (error) => ({ type: ADD_INVOICE_ERROR, error });

export const attemptAddInvoice = (invoice, type) => async (
  dispatch,
  getState
) => {
  dispatch(createContractRequest);
  try {
    const contract = await addInvoice(invoice, type);
    dispatch(createContractSuccess(contract));
  } catch (error) {
    dispatch(createContractError(error));
  }
};
