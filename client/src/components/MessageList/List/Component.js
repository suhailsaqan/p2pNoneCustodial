import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components/macro";
import MessageListItem from "../Item";
import ReactScrollableFeed from "react-scrollable-feed"; //https://github.com/dizco/react-scrollable-feed
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIndicatorBox from "../../shared/LoadingIndicator/Box";
import { ReallySimpleInfiniteScroll } from "react-really-simple-infinite-scroll";
import { useVirtual } from "react-virtual";

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

function RowVirtualizerFixed(messages) {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: 10000,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
    overscan: 5,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `200px`,
          width: `400px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              Row {virtualRow.index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

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
        {/* {messages && (
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
        )} */}
        {messages && <RowVirtualizerFixed />}
        {/* </ReactScrollableFeed> */}
      </>
    );
  }
}

export default MessagesList;
