import React from 'react';
import styled from 'styled-components/macro';
import MessageListItem from './Item';

const List = styled.ul`
  margin-top: 16px;
  list-style: none;
`;

const mapMessages = messages =>
  messages.map((message, index) => (
    <MessageListItem key={index} {...message} />
  ));

const sortMessages = messages =>
  messages.sort((a, b) => new Date(b.created) - new Date(a.created));

const MessagesList = ({ messages }) =>
  messages && <List>{mapMessages(sortMessages(messages))}</List>;

export default MessagesList;
