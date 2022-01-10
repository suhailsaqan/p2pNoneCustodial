import { connect } from "react-redux";
import { compose } from "redux";
import { fetchContract, fetchStatus } from "../../actions/contracts";
import Oracle from "./Component";

export const mapStateToProps = (state) => ({
  isFetching: state.contract.isFetching,
  post: state.contract.contract,
});

const mapDispatchToProps = { fetchContract, fetchStatus };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

const OracleContainer = enhance(Oracle);

export default OracleContainer;
