import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuth from '../../../util/withAuth';
import { attemptDeleteComment } from '../../../actions/posts'; //change to message
import MessageDetail from './Component';

const enhance = compose(withAuth, connect(null, null));

const MessageDetailContainer = enhance(MessageDetail);

export default MessageDetailContainer;
