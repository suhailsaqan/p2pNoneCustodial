import {
  FETCH_CHATROOM_REQUEST,
  FETCH_CHATROOM_SUCCESS,
  FETCH_CHATROOM_ERROR,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_ERROR,
  ADD_MESSAGE,
} from "../actions/chatroom";

const initialState = { isFetching: false, messages: [], lastpage: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATROOM_REQUEST:
      return { ...state, isFetching: true, messages: null };
    case FETCH_CHATROOM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messages: action.messages,
      };
    case FETCH_CHATROOM_ERROR:
      return { ...state, isFetching: false };

    case FETCH_MESSAGES_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messages: state.messages.concat(action.messages),
        page: action.page,
        lastpage: action.lastpage,
      };
    case FETCH_MESSAGES_ERROR:
      return { ...state, isFetching: false, error: action.error };

    case CREATE_MESSAGE_REQUEST:
      return { ...state, isCreating: true, newMessage: null };
    case CREATE_MESSAGE_SUCCESS:
      return { ...state, isCreating: false, newMessage: action.message };
    case CREATE_MESSAGE_ERROR:
      return { ...state, isCreating: false, error: action.error };

    case ADD_MESSAGE:
      console.log("adding message", action.message);
      return { ...state, messages: state.messages.concat(action.message) };

    default:
      return state;
  }
};
