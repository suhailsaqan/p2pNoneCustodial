import React from "react";
import styled from "styled-components/macro";
import Button from "../../shared/Button";

const SettleButtonStyle = styled(Button)`
  align-self: flex-end;

  :disabled {
    background-color: #cccccc;
    color: #666666;
  }
`;

let disable = (props) => {
  if (props.status_1 === "settled" || props.status_2 === "settled") {
    return false;
  } else {
    return true;
  }
};

const SettleButton = (props) => (
  <SettleButtonStyle
    onClick={() => {
      props.fetchStatus("dc8669574cba4e16b0cbaf398a1c9a90", 1);
    }}
    disabled={disable(props)}
  >
    Settle
  </SettleButtonStyle>
);

export default SettleButton;
