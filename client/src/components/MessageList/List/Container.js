import { connect } from "react-redux";
import withAuth from "../../../util/withAuth";
import MessagesList from "./Component";
import { fetchMessages } from "../../../actions/chatroom";

export const mapStateToProps = (state) => ({
  messages: state.chatroom.messages,
  isFetching: state.chatroom.isFetching,
  lastpage: state.chatroom.lastpage,
});

const mapDispatchToProps = {
  fetchMessages,
};

const MessagesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(MessagesList));

export default MessagesListContainer;
