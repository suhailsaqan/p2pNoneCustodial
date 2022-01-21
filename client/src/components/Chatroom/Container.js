import { connect } from "react-redux";
import withAuth from "../../util/withAuth";
import Chatroom from "./Component";
import {
  addMessage,
  fetchMessages,
  fetchChatroom,
} from "../../actions/chatroom";

export const mapStateToProps = (state) => ({
  contract: state.contracts.contract,
  messages: state.chatroom.messages,
  isFetching: state.chatroom.isFetching,
  chatroom: state.chatroom.chatroom,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = {
  addMessage,
  fetchMessages,
  fetchChatroom,
};

const ChatroomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Chatroom));

export default ChatroomContainer;

// Render this using `<ChatroomContainer id={match.params.post} />` similar to the client/src/components/Home/index.js
