import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/macro";
import MessageListItem from "../Item";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIndicatorBox from "../../shared/LoadingIndicator/Box";
import { ReallySimpleInfiniteScroll } from "react-really-simple-infinite-scroll";

const Wrapper = styled.div`
  // margin-top: 16px;
  // list-style: none;
  // max-height: 30rem;

  height: 300;
  overflow: auto;
  display: flex;
  // flex-direction: column-reverse;

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.foreground};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar-corner {
    background: ${(props) => props.theme.foreground};
  }
`;

class MessagesList extends React.Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  mapMessages = (messages) => {
    return messages.map((message, index) => (
      <MessageListItem key={index} {...message} />
    ));
  };

  sortMessages = (messages) => {
    return messages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  };

  render() {
    const { messages } = this.props;

    if (this.props.isFetching) return <LoadingIndicatorBox />;

    return (
      <>
        {/* <ReactScrollableFeed forceScroll={true}> */}
        {messages && (
          <ReallySimpleInfiniteScroll
            key={true}
            className={`infinite-scroll`}
            hasMore={!this.props.lastpage}
            length={messages.length}
            loadingComponent={<LoadingIndicatorBox />}
            isInfiniteLoading={!this.props.lastpage}
            onInfiniteLoad={this.props.fetchMessages}
            displayInverse={true}
          >
            {this.mapMessages(this.sortMessages(messages))}
          </ReallySimpleInfiniteScroll>
        )}

        {/* </ReactScrollableFeed> */}
      </>
    );
  }
}

export default MessagesList;
