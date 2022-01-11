import React from "react";
import styled from "styled-components/macro";
import Button from "../../shared/Button";
import { STATUS_TYPES } from "../../shared/ContractStatusTypes";

const CancelButtonStyle = styled(Button)`
  align-self: flex-end;
  color: white;
  border: 1px solid black;
  border-radius: 40px;
  margin-bottom: 20px;
  background-color: red;

  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

let disable = (status) => {
  if (status === STATUS_TYPES.WAITING_ON_OTHER_PARTY) {
    return true;
  } else if (status === STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT) {
    return false;
  } else {
    return true;
  }
};

const CancelButton = (props) => (
  <CancelButtonStyle
    onClick={() => {
      props.attemptCancelContract(props.id, props.party);
    }}
    disabled={disable(props.status)}
  >
    Cancel
  </CancelButtonStyle>
);

export default CancelButton;
