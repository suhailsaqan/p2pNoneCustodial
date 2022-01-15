import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchContract,
  fetchStatus,
  attemptAddInvoice,
  attemptSetMessages,
} from "../../actions/contracts";
import Party from "./Component";

export const mapStateToProps = (state) => ({
  isFetching: state.contracts.isFetching,
  contract: state.contracts.contract,
  status_1: state.contracts.status_1,
  status_2: state.contracts.status_2,
  payment_not_received: state.contracts.payment_not_received,
  payment_received: state.contracts.payment_received,
  instructions: state.contracts.instructions,
  invoice_form: state.contracts.invoice_form,
  completion_message: state.contracts.completion_message,
  instructions_awaiting_counterparty_invoice:
    state.contracts.instructions_awaiting_counterparty_invoice,
  instructions_awaiting_counterparty_deposit:
    state.contracts.instructions_awaiting_counterparty_deposit,
  invoice_container: state.contracts.invoice_container,
  instructions_awaiting_settlement_invoice_submitted:
    state.contracts.instructions_awaiting_settlement_invoice_submitted,
  instructions_awaiting_settlement_invoice_paid:
    state.contracts.instructions_awaiting_settlement_invoice_paid,
  payment_sent: state.contracts.payment_sent,
  payment_not_sent: state.contracts.payment_not_sent,
  instructions_invoiced: state.contracts.instructions_invoiced,
});

const mapDispatchToProps = {
  fetchContract,
  fetchStatus,
  attemptAddInvoice,
  attemptSetMessages,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

const PartyContainer = enhance(Party);

export default PartyContainer;
