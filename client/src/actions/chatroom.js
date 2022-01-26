import { createMessage, getChatroom, getMessages } from "../util/api";

export const CREATE_MESSAGE_REQUEST = "CREATE_MESSAGE_REQUEST";
export const CREATE_MESSAGE_SUCCESS = "CREATE_MESSAGE_SUCCESS";
export const CREATE_MESSAGE_ERROR = "CREATE_MESSAGE_ERROR";

const createMessageRequest = { type: CREATE_MESSAGE_REQUEST };
const createMessageSuccess = (message) => ({
  type: CREATE_MESSAGE_SUCCESS,
  message,
});
const createMessageError = (error) => ({ type: CREATE_MESSAGE_ERROR, error });

export const attemptCreateMessage = (roomId, message) => async (
  dispatch,
  getState
) => {
  dispatch(createMessageRequest);
  try {
    const { token } = getState().auth;
    const newMessage = await createMessage(roomId, message, token);
    dispatch(createMessageSuccess(newMessage));
  } catch (error) {
    dispatch(createMessageError(error));
  }
};

export const FETCH_CHATROOM_REQUEST = "FETCH_CHATROOM_REQUEST";
export const FETCH_CHATROOM_SUCCESS = "FETCH_CHATROOM_SUCCESS";
export const FETCH_CHATROOM_ERROR = "FETCH_CHATROOM_ERROR";

const fetchChatroomRequest = { type: FETCH_CHATROOM_REQUEST };
const fetchChatroomSuccess = (messages) => ({
  type: FETCH_CHATROOM_SUCCESS,
  messages,
});
const fetchChatroomError = (error) => ({ type: FETCH_CHATROOM_ERROR, error });

export const fetchChatroom = (id) => async (dispatch, getState) => {
  dispatch(fetchChatroomRequest);
  try {
    const { token } = getState().auth;
    const chatroom = await getChatroom(id, token);
    console.log("chatroom", chatroom);
    dispatch(fetchChatroomSuccess(chatroom));
  } catch (error) {
    dispatch(fetchChatroomError(error));
  }
};

export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_ERROR = "FETCH_MESSAGES_ERROR";

const fetchMessagesRequest = { type: FETCH_MESSAGES_REQUEST };
const fetchMessagesSuccess = (messages, page, lastpage) => ({
  type: FETCH_MESSAGES_SUCCESS,
  messages,
  page,
  lastpage,
});
const fetchMessagesError = (error) => ({ type: FETCH_MESSAGES_ERROR, error });

export const fetchMessages = () => async (dispatch, getState) => {
  dispatch(fetchMessagesRequest);
  try {
    console.log("fetching messages");
    const { token } = getState().auth;
    const { contract } = getState().contracts;
    const prevPage = getState().chatroom.page;
    const page = parseInt(getState().chatroom.messages.length / 15);
    if (page !== prevPage) {
      const json = await getMessages(
        contract.chatroom_id,
        { page: page, limit: 15 },
        token
      );
      console.log(json);
      dispatch(fetchMessagesSuccess(json, page, false));
    } else {
      dispatch(fetchMessagesSuccess([], prevPage, true));
    }
  } catch (error) {
    dispatch(fetchMessagesError(error));
  }
};

export const ADD_MESSAGE = "ADD_MESSAGE";

const addMessageSuccess = (message) => ({ type: ADD_MESSAGE, message });

export const addMessage = (message) => (dispatch) => {
  dispatch(addMessageSuccess(message));
};
