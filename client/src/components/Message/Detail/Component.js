import React from 'react';
import styled from 'styled-components/macro';
import Author from '../../shared/Author';
import MessageDetailTimestamp from './Timestamp';
import DeleteButton from '../../shared/DeleteButton';

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 8px;
  font-size: 13px;
`;

class MessageDetail extends React.Component {
  render() {
    return (
      <Wrapper>
        <Author username={this.props.author && this.props.author.username} />
        <MessageDetailTimestamp created={this.props.created} />
      </Wrapper>
    );
  }
}

export default MessageDetail;
