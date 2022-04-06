import React from "react";
import styled from "styled-components/macro";
import { socket } from "../../util/api";
import MessageFormContainer from "../ChatroomForm/Container";
import MessageListSection from "../MessageList";

const Wrapper = styled.aside`
  display: flex;
  justify-content: center;
  max-height: 30rem;
  // width: 30%;
  border: 2px solid ${(props) => props.theme.border};
  border-radius: 10px;
  background-color: ${(props) => props.theme.foreground};

  flex-direction: column;
  margin: 2rem;
`;

class Chatroom extends React.Component {
  componentDidMount() {
    this.props.fetchChatroom(this.props.contract.chatroom_id);
    this.socket();
    console.log("these are the messages", this.props.messages);
  }

  socket() {
    socket.emit("join", this.props.contract.chatroom_id);
    // receive message
    socket.on("new_message", (msg) => {
      console.log(
        "new_message",
        msg,
        "this is the chatroom",
        this.props.messages
      );
      this.props.addMessage(msg);
    });

    // send leave message when user leaves the page
    window.addEventListener("beforeunload", (ev) => {
      console.log("closing");
      ev.preventDefault();

      socket.emit("leave_channel", {
        user: this.props.currentUser.id,
      });
    });
  }

  render() {
    return (
      <Wrapper>
        <MessageListSection messages={this.props.messages} />
        <MessageFormContainer />
      </Wrapper>
    );
  }
}

export default Chatroom;
