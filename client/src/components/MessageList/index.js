import React from 'react';
import Empty from '../shared/Empty';
import MessageList from './List';

const MessageListSection = ({ messages }) => (
  <>
    {!messages || messages.length === 0 ? (
      <Empty messages />
    ) : (
      <MessageList messages={messages} />
    )}
  </>
);

export default MessageListSection;
