import React from "react";
import styled from "styled-components/macro";
import { socket } from "../../util/api";
import MessageFormContainer from "../ChatroomForm/Container";
import MessageListSection from "../MessageList";

const Wrapper = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  background-color: ${(props) => props.theme.foreground};
  overflow-y: scroll;

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
    console.log("wqdwqdqwdwqd", this.props.contract);
    this.props.fetchChatroom(this.props.contract.chatroom_id);
    this.socket();
    console.log("these are the messages", this.props.chatroom);
  }

  socket() {
    // // receive userlist
    // socket.on('chat users', msg => {
    //   this.props.dispatch(receiveUsers(msg));
    // });

    // // send join message
    // socket.emit('chat join', {
    //   timestamp: new Date(),
    //   sender: username,
    //   message: 'joined'
    // });

    // // receive join message
    // socket.on('chat join', msg => {
    //   this.props.dispatch(receiveMessage(msg));
    // });

    // receive message
    console.log("this is the socket", socket);
    socket.on("new_message", (msg) => {
      console.log("new_message", msg);
      this.props.addMessage(msg);
    });

    // send leave message when user leaves the page
    window.addEventListener("beforeunload", (ev) => {
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