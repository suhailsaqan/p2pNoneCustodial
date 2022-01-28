import React from "react";
import styled from "styled-components/macro";
import Button from "../../shared/Button";
import { STATUS_TYPES } from "../../shared/ContractStatusTypes";

const SettleButtonStyle = styled(Button)`
  margin: 1rem;
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #000;

  width: 220px;
  height: 50px;
  border: none;
  outline: none;
  color: ${(props) => props.theme.settle};
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;

  :before {
    content: "";
    background: linear-gradient(#f2a900, #e6a100, #ffbc1f, #875f00);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  :active {
    color: #000;
  }

  :active:after {
    background: transparent;
  }

  :hover:before {
    opacity: 1;
  }

  :after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
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
    disabled={!props.status}
  >
    Settle
  </SettleButtonStyle>
);

export default SettleButton;
