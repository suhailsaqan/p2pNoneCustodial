import React, { useEffect, useRef } from "react";
import Empty from "../shared/Empty";
import MessageListContainer from "./List/Container";

const MessageListSection = ({ messages }) => {
  return (
    <>
      {!messages || messages.length === 0 ? (
        <Empty messages />
      ) : (
        // <MessageList messages={messages} />
        <MessageListContainer />
      )}
    </>
  );
};

export default MessageListSection;
