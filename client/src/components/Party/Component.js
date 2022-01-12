import React from "react";
import styled from "styled-components/macro";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { Link } from "react-router-dom";
import InvoiceFormContainer from "./InvoiceForm/Container";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
`;

class Party extends React.Component {
  componentDidMount() {
    this.props.fetchContract(this.props.id);
    this.props.fetchStatus(this.props.id, this.props.party);
  }

  render() {
    const { contract, status_1, status_2 } = this.props;
    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!contract) return <Empty />;
    return (
      <Wrapper>
        <p>{contract.description}</p>

        {this.props.party == 1 && <p>First Party</p>}
        {this.props.party == 2 && <p>Second Party</p>}
        {this.props.party == 1 && <p>Current Status: {status_1}</p>}
        {this.props.party == 2 && <p>Current Status: {status_2}</p>}
        <InvoiceFormContainer id={contract._id} party={this.props.party} />
      </Wrapper>
    );
  }
}

export default Party;
