import React from "react";
import styled from "styled-components/macro";
import Message from "../Message";

const Item = styled.div`
  margin-bottom: 8px;
`;

const MessageListItem = (props) => (
  <Item>
    <Message {...props} />
  </Item>
);

export default MessageListItem;
