import { connect } from 'react-redux';
import withAuth from '../../util/withAuth';
import Chatroom from './Component';
import {
  receiveMessage,
  fetchMessages,
  fetchChatroom
} from '../../actions/chatroom';

export const mapStateToProps = state => ({
  messages: state.chatroom.messages,
  isFetching: state.chatroom.isFetching,
  chatroom: state.chatroom.chatroom
});

const mapDispatchToProps = {
  receiveMessage,
  fetchMessages,
  fetchChatroom
};

const ChatroomContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(Chatroom));

export default ChatroomContainer;

// Render this using `<ChatroomContainer id={match.params.post} />` similar to the client/src/components/Home/index.js
