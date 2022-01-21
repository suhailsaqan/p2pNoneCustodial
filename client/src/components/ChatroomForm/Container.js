import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";
import { attemptCreateMessage } from "../../actions/chatroom";
import MessageForm from "./Component";

export const mapStateToProps = (state) => ({
  isFetching: state.chatroom.isFetching,
  contract: state.contracts.contract,
});

const mapDispatchToProps = { attemptCreateMessage };

const enhance = compose(
  reduxForm({ form: "message" }),
  connect(mapStateToProps, mapDispatchToProps)
);

const MessageFormContainer = enhance(MessageForm);

export default MessageFormContainer;
