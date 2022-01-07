import React from 'react';
import styled from 'styled-components/macro';
import { link } from './helpers';
import { BsFillTrashFill } from 'react-icons/bs';

const Button = styled.button`
  ${link};

  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 13px;
  color: ${props => props.theme.normalText};
  margin-left: auto;
`;

const DeleteButton = props => (
  <Button onClick={props.onClick}>
    <BsFillTrashFill />
  </Button>
);

export default DeleteButton;
