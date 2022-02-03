import React from "react";
import styled from "styled-components/macro";
import MessageDetailContainer from "./Detail/Container";
import MessageContentContainer from "./Content/Container";

const Wrapper = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.foreground};

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 10px;
  }
`;

const Message = ({ message, ...details }) => (
  <Wrapper>
    <MessageDetailContainer {...details} />
    <MessageContentContainer userId={details.userId}>
      {message}
    </MessageContentContainer>
  </Wrapper>
);

export default Message;
