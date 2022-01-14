import React from "react";
import styled from "styled-components/macro";
import Button from "../../shared/Button";
import { STATUS_TYPES } from "../../shared/ContractStatusTypes";

const SettleButtonStyle = styled(Button)`
  color: white;
  border: 1px solid black;
  border-radius: 40px;
  margin-bottom: 20px;
  background-color: green;

  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

// allow: false,
// block: true,

let disable = (status, contract, party) => {
  if (status == STATUS_TYPES.WAITING_ON_OTHER_PARTY) {
    return true;
  } else if (status == STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT) {
    if (parseInt(party) === 1) {
      if (contract.first_party_original == undefined) {
        return true;
      }
    }
    if (parseInt(party) === 2) {
      if (contract.second_party_original == undefined) {
        return true;
      }
    }
    return false;
  } else {
    return true;
  }
};

const SettleButton = (props) => (
  <SettleButtonStyle
    onClick={() => {
      props.attemptSettleContract(props.id, props.party);
    }}
    disabled={disable(props.status, props.contract, props.party)}
  >
    Settle
  </SettleButtonStyle>
);

export default SettleButton;
