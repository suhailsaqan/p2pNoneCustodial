import { connect } from "react-redux";
import withAuth from "../../../util/withAuth";
import MessageContent from "./Component";

export const mapStateToProps = (state) => ({
  currentUserId: state.auth.user.id,
});

const MessageContentContainer = connect(
  mapStateToProps,
  null
)(withAuth(MessageContent));

export default MessageContentContainer;
