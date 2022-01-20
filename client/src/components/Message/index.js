import React from 'react';
import styled from 'styled-components/macro';
import MessageDetailContainer from './Detail/Container';
import MessageContent from './Content';

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  background-color: ${props => props.theme.foreground};

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 10px;
  }
`;

const Message = ({ body, ...details }) => (
  <Wrapper>
    <MessageDetailContainer {...details} />
    <MessageContent>{body}</MessageContent>
  </Wrapper>
);

export default Message;
