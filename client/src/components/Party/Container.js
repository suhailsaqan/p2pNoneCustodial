import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchContract,
  fetchStatus,
  attemptAddInvoice,
} from "../../actions/contracts";
import Party from "./Component";

export const mapStateToProps = (state) => ({
  isFetching: state.contracts.isFetching,
  contract: state.contracts.contract,
  status_1: state.contracts.status_1,
  status_2: state.contracts.status_2,
});

const mapDispatchToProps = { fetchContract, fetchStatus, attemptAddInvoice };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

const PartyContainer = enhance(Party);

export default PartyContainer;
