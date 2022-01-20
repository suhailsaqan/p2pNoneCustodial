import React from 'react';
import styled from 'styled-components/macro';
import Form from '../shared/form/Form';
import { transition } from '../shared/helpers';
import MessageFormTextArea from './TextArea';
import MessageFormSubmitButton from './SubmitButton';

const StyledForm = styled(Form)`
  ${transition('border', 'box-shadow')};

  margin-top: -1px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0 0 10px 10px;
  max-width: none;
  padding: 0;

  @media (hover: hover) {
    :hover {
      border: 1px solid ${props => props.theme.accent};
    }
  }

  :focus-within {
    border: 1px solid ${props => props.theme.accent};
    box-shadow: 0 0 0 2px ${props => props.theme.accent + '4d'};
  }

  @media (max-width: 768px) {
    margin-top: -1px;
    border-radius: 10px;
    border-left: none;
    border-right: none;

    :hover,
    :focus-within {
      border-left: none;
      border-right: none;
    }
  }
`;

class MessageForm extends React.Component {
  createMessage = message => this.props.attemptCreateMessage(message);

  onSubmit = () => this.props.handleSubmit(this.createMessage);

  render() {
    return (
      <StyledForm onSubmit={this.onSubmit()}>
        <MessageFormTextArea name='message' onSubmit={this.onSubmit()} />
        <MessageFormSubmitButton />
      </StyledForm>
    );
  }
}

export default MessageForm;
