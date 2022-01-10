import { connect } from "react-redux";
import { fetchStatus } from "../../../actions/contracts";
import CancelButton from "./CancelButton";
import SettleButton from "./SettleButton";

const mapDispatchToProps = { fetchStatus };

const CancelButtonContainer = connect(null, mapDispatchToProps)(CancelButton);
const SettleButtonContainer = connect(null, mapDispatchToProps)(SettleButton);

export { CancelButtonContainer, SettleButtonContainer };
