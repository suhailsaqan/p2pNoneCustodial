import { connect } from "react-redux";
import {
  attemptCancelContract,
  attemptSettleContract,
} from "../../../actions/contracts";
import CancelButton from "./CancelButton";
import SettleButton from "./SettleButton";

const mapDispatchToProps = { attemptCancelContract, attemptSettleContract };

const CancelButtonContainer = connect(null, mapDispatchToProps)(CancelButton);
const SettleButtonContainer = connect(null, mapDispatchToProps)(SettleButton);

export { CancelButtonContainer, SettleButtonContainer };
