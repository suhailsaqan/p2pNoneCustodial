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

class Oracle extends React.Component {
  componentDidMount() {
    this.props.fetchContract(this.props.id);
    this.props.fetchStatus(this.props.id, 1);
    this.props.fetchStatus(this.props.id, 2);
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
    const { contract, status_1, status_2 } = this.props;
    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!contract) return <Empty />;
    return (
      <Wrapper>
        <p>ORACLE</p>
        <p>{contract.description}</p>
        <Grid>
          <p>
            <b>First Party</b>
          </p>
          <p>Current Status: {status_1}</p>
          <Link to={`/party/${contract._id}/1`}>Page</Link>
          <div>
            <SettleButtonContainer
              id={contract._id}
              status={status_1}
              party={1}
              contract={contract}
            />
            <CancelButtonContainer
              id={contract._id}
              status={status_1}
              party={1}
              contract={contract}
            />
          </div>
        </Grid>
        <Grid>
          <p>
            <b>Second Party</b>
          </p>
          <p>Current Status: {status_2}</p>
          <Link to={`/party/${contract._id}/2`}>Page</Link>
          <div>
            <SettleButtonContainer
              id={contract._id}
              status={status_2}
              party={2}
              contract={contract}
            />
            <CancelButtonContainer
              id={contract._id}
              status={status_2}
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
