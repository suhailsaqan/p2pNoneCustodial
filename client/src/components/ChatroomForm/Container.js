import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { attemptCreateMessage } from '../../actions/chatroom'; // Change this to post a message not a post
import MessageForm from './Component';

const mapDispatchToProps = { attemptCreateMessage };

const enhance = compose(
  reduxForm({ form: 'message' }),
  connect(null, mapDispatchToProps)
);

const MessageFormContainer = enhance(MessageForm);

export default MessageFormContainer;
