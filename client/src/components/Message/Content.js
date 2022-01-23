import React from "react";
import styled from "styled-components/macro";
import Markdown from "../shared/Markdown";

const Content = styled.div`
  padding: 0.5rem;
`;

const MessageContent = (props) => (
  <Content>
    <Markdown>{props.children}</Markdown>
  </Content>
);

export default MessageContent;
