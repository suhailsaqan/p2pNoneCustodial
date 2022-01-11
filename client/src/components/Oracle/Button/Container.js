import { connect } from "react-redux";
import { cancelContract, settleContract } from "../../../actions/contracts";
import CancelButton from "./CancelButton";
import SettleButton from "./SettleButton";

const mapDispatchToProps = { cancelContract, settleContract };

const CancelButtonContainer = connect(null, mapDispatchToProps)(CancelButton);
const SettleButtonContainer = connect(null, mapDispatchToProps)(SettleButton);

export { CancelButtonContainer, SettleButtonContainer };
