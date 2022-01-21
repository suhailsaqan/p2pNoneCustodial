import React from "react";
import styled from "styled-components/macro";
import Author from "../../shared/Author";
import MessageDetailTimestamp from "./Timestamp";
import DeleteButton from "../../shared/DeleteButton";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  font-size: 13px;
`;

class MessageDetail extends React.Component {
  render() {
    return (
      <Wrapper>
        <Author username={this.props.userId && this.props.userId} />
        <MessageDetailTimestamp created={this.props.createdAt} />
      </Wrapper>
    );
  }
}

export default MessageDetail;
