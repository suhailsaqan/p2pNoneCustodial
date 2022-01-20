export const ADD_MESSAGE_REQUEST = "ADD_MESSAGE_REQUEST";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const ADD_MESSAGE_ERROR = "ADD_MESSAGE_ERROR";

const addMessageRequest = { type: ADD_MESSAGE_REQUEST };
const addMessageSuccess = (message) => ({
  type: ADD_MESSAGE_SUCCESS,
  message,
});
const addMessageError = (error) => ({ type: ADD_MESSAGE_ERROR, error });

export const attemptAddMessage = (message) => async (dispatch, getState) => {
  dispatch(addMessageRequest);
  try {
    const { token } = getState().auth;
    const newMessage = await createContract(message, token);
    dispatch(addMessageSuccess(newMessage));
  } catch (error) {
    dispatch(addMessageError(error));
  }
};

export const sendMessage = (data) => (dispatch) => {
  dispatch({
    type: SEND_MESSAGE,
    payload: data,
  });
};

export const addMessage = (data) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: data,
  });
};
