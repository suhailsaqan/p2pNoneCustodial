import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";
import { attemptAddInvoice } from "../../../actions/contracts";
import InvoiceForm from "./Component";

const mapStateToProps = (state) => ({
  isFetching: state.contracts.isFetching,
  contract: state.contracts.contract,
});

const mapDispatchToProps = { attemptAddInvoice };

const enhance = compose(
  reduxForm({ form: "addInvoice" }),
  connect(mapStateToProps, mapDispatchToProps)
);

const InvoiceFormContainer = enhance(InvoiceForm);

export default InvoiceFormContainer;
