import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchContract,
  fetchStatus,
  fetchSettleStatus,
  fetchCancelStatus,
} from "../../actions/contracts";
import Oracle from "./Component";

export const mapStateToProps = (state) => ({
  isFetching: state.contracts.isFetching,
  contract: state.contracts.contract,
  status_1: state.contracts.status_1,
  status_2: state.contracts.status_2,
  settle_status_1: state.contracts.settle_status_1,
  settle_status_2: state.contracts.settle_status_2,
  cancel_status_1: state.contracts.cancel_status_1,
  cancel_status_2: state.contracts.cancel_status_2,
});

const mapDispatchToProps = {
  fetchContract,
  fetchStatus,
  fetchSettleStatus,
  fetchCancelStatus,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

const OracleContainer = enhance(Oracle);

export default OracleContainer;
