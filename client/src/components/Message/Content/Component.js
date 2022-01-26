import React from "react";
import styled from "styled-components/macro";
import Markdown from "../../shared/Markdown";

const RightContent = styled.div`
  padding: 0.5rem;
  text-align: right;
`;

const LeftContent = styled.div`
  padding: 0.5rem;
`;

class MessageContent extends React.Component {
  render() {
    return this.props.userId === this.props.currentUserId ? (
      <RightContent>
        <Markdown>{this.props.children}</Markdown>
      </RightContent>
    ) : (
      <LeftContent>
        <Markdown>{this.props.children}</Markdown>
      </LeftContent>
    );
  }
}

export default MessageContent;
