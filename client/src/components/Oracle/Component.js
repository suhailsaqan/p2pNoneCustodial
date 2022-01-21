import React from "react";
import styled from "styled-components/macro";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { Link } from "react-router-dom";
import {
  CancelButtonContainer,
  SettleButtonContainer,
} from "./Button/Container";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: inline-block;
  align-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextPrimary = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.theme.normalText};
`;

const TextSecondary = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.mutedText};
  text-transform: none;
`;

class Oracle extends React.Component {
  componentDidMount() {
    this.props.fetchContract(this.props.id);
    this.props.fetchStatus(this.props.id, 0);
    this.props.fetchSettleStatus(this.props.id, 0);
    this.props.fetchCancelStatus(this.props.id, 0);
  }

  // Fix this history issue:
  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     if (
  //       this.props.contract !== prevProps.contract &&
  //       this.props.contract === null
  //     ) {
  //       this.props.history.goBack();
  //     }
  //   }

  render() {
    const {
      contract,
      status_1,
      status_2,
      settle_status_1,
      cancel_status_1,
      settle_status_2,
      cancel_status_2,
    } = this.props;

    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!contract) return <Empty />;
    return (
      <Wrapper>
        <TextPrimary>ORACLE</TextPrimary>
        <TextPrimary>{contract.description}</TextPrimary>
        <Grid>
          <TextPrimary>
            <b>First Party</b>
          </TextPrimary>
          <TextPrimary>Current Status: {status_1}</TextPrimary>
          <Link to={`/party/${contract._id}/1`}>Page</Link>
          <div>
            <SettleButtonContainer
              id={contract._id}
              status={settle_status_1}
              party={1}
              contract={contract}
            />
            <CancelButtonContainer
              id={contract._id}
              status={cancel_status_1}
              party={1}
              contract={contract}
            />
          </div>
        </Grid>
        <Grid>
          <TextPrimary>
            <b>Second Party</b>
          </TextPrimary>
          <TextPrimary>Current Status: {status_2}</TextPrimary>
          <Link to={`/party/${contract._id}/2`}>Page</Link>
          <div>
            <SettleButtonContainer
              id={contract._id}
              status={settle_status_2}
              party={2}
              contract={contract}
            />
            <CancelButtonContainer
              id={contract._id}
              status={cancel_status_2}
              party={2}
              contract={contract}
            />
          </div>
        </Grid>
      </Wrapper>
    );
  }
}

export default Oracle;
