import React from "react";
import styled from "styled-components/macro";
import { socket } from "../../util/api";
import MessageFormContainer from "../ChatroomForm/Container";
import MessageListSection from "../MessageList";

const Wrapper = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50%;
  width: 50%;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  background-color: ${(props) => props.theme.foreground};
  overflow-y: scroll;
  flex-direction: column;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar-corner {
    background: #f1f1f1;
  }

  // @media (max-width: 768px) {
  //   display: none;
  // }
`;

// Render this using `<ChatroomContainer id={match.params.post} />` similar to the client/src/components/Home/index.js

class Chatroom extends React.Component {
  componentDidMount() {
    this.props.fetchChatroom(this.props.contract.chatroom_id);
    this.socket();
    console.log("these are the messages", this.props.chatroom);
  }

  socket() {
    socket.emit("join", this.props.contract.chatroom_id);
    // receive message
    socket.on("new_message", (msg) => {
      console.log(
        "new_message",
        msg,
        "this is the chatroom",
        this.props.chatroom
      );
      this.props.addMessage(msg);
    });

    // send leave message when user leaves the page
    window.addEventListener("beforeunload", (ev) => {
      console.log("closing");
      ev.preventDefault();

      socket.emit("leave channel", {
        user: this.props.currentUser.id,
      });
    });
  }

  render() {
    return (
      <Wrapper>
        <MessageListSection messages={this.props.chatroom} />
        <MessageFormContainer />
      </Wrapper>
    );
  }
}

export default Chatroom;
