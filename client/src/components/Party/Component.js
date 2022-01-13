import React from "react";
import styled from "styled-components/macro";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { Link } from "react-router-dom";
import InvoiceFormContainer from "./InvoiceForm/Container";
import contracts from "../../reducers/contracts";
var QRCode = require("qrcode.react");

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
`;

const STATUS_TYPES = {
  NO_INTERACTION: "No interaction yet",
  CONTRACT_FUNDED_AWAITING_SETTLEMENT: "Contract funded, awaiting settlement",
  CONTRACT_CANCELED: "Canceled",
  CONTRACT_SETTLED: "Settled",
  WAITING_ON_OTHER_PARTY: "Waiting on other party",
};

class Party extends React.Component {
  componentDidMount() {
    this.props.fetchContract(this.props.id);
    this.props.fetchStatus(this.props.id, 1);
    this.props.fetchStatus(this.props.id, 2);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.party);
    if (
      this.props.status_1 !== prevProps.status_1 ||
      this.props.status_2 !== prevProps.status_2
    )
      this.props.attemptSetMessages(this.props.party);
  }

  render() {
    const {
      contract,
      status_1,
      status_2,
      payment_not_received,
      payment_received,
      instructions,
      invoice_form,
      completion_message,
      instructions_awaiting_counterparty_invoice,
      instructions_awaiting_counterparty_deposit,
      invoice_container,
      instructions_awaiting_settlement,
      payment_sent,
      payment_not_sent,
      instructions_invoiced,
    } = this.props;

    console.log(
      contract,
      payment_not_received,
      payment_received,
      instructions,
      invoice_form,
      completion_message,
      instructions_awaiting_counterparty_invoice,
      instructions_awaiting_counterparty_deposit,
      invoice_container,
      instructions_awaiting_settlement,
      payment_sent,
      payment_not_sent,
      instructions_invoiced
    );

    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!contract) return <Empty />;

    if (this.props.party == 1 && contract !== undefined) {
      var hodl_invoice = contract.first_party_hodl;
      console.log("*****", hodl_invoice);
    } else if (this.props.party == 2 && contract !== undefined) {
      var hodl_invoice = contract.second_party_hodl;
      console.log("*****", hodl_invoice);
    } else {
      var hodl_invoice = "";
    }

    // var payment_not_received = false;
    // var payment_received = false;
    // var instructions = false;
    // var invoice_form = false;
    // var completion_message = false;
    // var instructions_awaiting_counterparty_invoice = false;
    // var instructions_awaiting_counterparty_deposit = false;
    // var invoice_container = false;
    // var instructions_awaiting_settlement = false;
    // var payment_sent = false;
    // var payment_not_sent = false;
    // var instructions_invoiced = false;

    return (
      <Wrapper>
        <p>{contract.description}</p>

        {this.props.party == 1 && <p>First Party</p>}
        {this.props.party == 2 && <p>Second Party</p>}

        {this.props.party == 1 && <p>Current Status: {status_1}</p>}
        {this.props.party == 2 && <p>Current Status: {status_2}</p>}

        {invoice_form && (
          <InvoiceFormContainer id={contract._id} party={this.props.party} />
        )}
        {instructions && (
          <div>
            {instructions_invoiced && (
              <p>You have already submitted your invoice.</p>
            )}
            {instructions_awaiting_counterparty_invoice && (
              <p>
                Please wait while your counterparty creates an invoice. Check
                back later.
              </p>
            )}{" "}
            {instructions_awaiting_counterparty_deposit && (
              <p>
                Please wait while your counterparty pays your invoice. Check
                back later.{" "}
              </p>
            )}
            {instructions_awaiting_settlement && (
              <p>
                Please await your settlement date (visible in the contract
                details below) and contact your oracle for more info.
              </p>
            )}
          </div>
        )}
        {invoice_container && (
          <div>
            <p>Deposit funds to this smart contract:</p>
            <QRCode value={hodl_invoice} />
            <p>{hodl_invoice}</p>
          </div>
        )}
        {payment_received && (
          <p>You received a payment from your counterparty</p>
        )}
        {payment_sent && <p>Your payment to your counterparty went through</p>}
        {payment_not_received && (
          <p>The oracle canceled a payment from your counterparty to you</p>
        )}
        {payment_not_sent && (
          <p>The oracle canceled a payment from you to your counterparty</p>
        )}
        {completion_message && <p>This contract is complete</p>}
      </Wrapper>
    );
  }
}

export default Party;
