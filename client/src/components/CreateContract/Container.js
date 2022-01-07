import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";
import { attemptCreateContract } from "../../actions/contracts";
import CreateContractForm from "./Component";

const mapStateToProps = (state) => ({
  isFetching: state.posts.isFetching,
  contract: state.posts.newContract,
  form: state.form.createContract,
});

const mapDispatchToProps = { attemptCreateContract };

const enhance = compose(
  reduxForm({
    form: "createContract",
    initialValues: { type: "bet" },
  }),
  connect(mapStateToProps, mapDispatchToProps)
);

const CreatePostFormContainer = enhance(CreateContractForm);

export default CreatePostFormContainer;
