import React from "react";
import styled from "styled-components/macro";
import LoadingIndicatorBox from "../shared/LoadingIndicator/Box";
import Empty from "../shared/Empty";
import { Link } from "react-router-dom";
import InvoiceFormContainer from "./InvoiceForm/Container";
import contracts from "../../reducers/contracts";
import { smallFont } from "../shared/helpers";
var QRCode = require("qrcode.react");

const Par = styled.div`
  ${smallFont};

  // border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  padding: 14px 0;
  // background-color: ${(props) => props.theme.foreground};
  text-align: center;
  color: ${(props) => props.theme.normalText};

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`;

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

  componentDidUpdate(prevProps) {
    console.log(this.props.party);
    if (
      this.props.status_1 !== prevProps.status_1 ||
      this.props.status_2 !== prevProps.status_2
    ) {
      this.props.attemptSetMessages(this.props.party);
    }
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
      instructions_awaiting_settlement_invoice_submitted,
      instructions_awaiting_settlement_invoice_paid,
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
      instructions_awaiting_settlement_invoice_submitted,
      instructions_awaiting_settlement_invoice_paid,
      payment_sent,
      payment_not_sent,
      instructions_invoiced
    );

    if (this.props.isFetching) return <LoadingIndicatorBox />;
    if (!contract) return <Empty />;

    if (this.props.party == 1 && contract.second_party_hodl !== undefined) {
      var hodl_invoice = contract.second_party_hodl;
      console.log("*****", hodl_invoice);
    } else if (
      this.props.party == 2 &&
      contract.first_party_hodl !== undefined
    ) {
      var hodl_invoice = contract.first_party_hodl;
      console.log("*****", hodl_invoice);
    } else {
      var hodl_invoice = "";
    }

    return (
      <Wrapper>
        {this.props.party == 1 && <Par>First Party</Par>}
        {this.props.party == 2 && <Par>Second Party</Par>}
        <Par>{contract.description}</Par>
        {this.props.party == 1 && <Par>Current Status: {status_1}</Par>}
        {this.props.party == 2 && <Par>Current Status: {status_2}</Par>}
        {invoice_form && (
          <InvoiceFormContainer id={contract._id} party={this.props.party} />
        )}
        {instructions && (
          <div>
            {instructions_invoiced && (
              <Par>Your invoice has already been submitted</Par>
            )}
            {instructions_awaiting_counterparty_invoice && (
              <Par>
                Your counterparty needs to submit an invoice. Please wait.
              </Par>
            )}{" "}
            {instructions_awaiting_counterparty_deposit && (
              <Par>
                Your counterparty needs to pay your invoice. Please wait.
              </Par>
            )}
            {instructions_awaiting_settlement_invoice_submitted && (
              <Par>The oracle will settle the contract soon.</Par>
            )}
            {instructions_awaiting_settlement_invoice_paid && (
              <Par>
                You have paid your invoice! The oracle will settle the contract
                soon.
              </Par>
            )}
          </div>
        )}
        {invoice_container && (
          <div>
            <Par>Please deposit funds to this invoice:</Par>
            <QRCode value={hodl_invoice} />
            <p>{hodl_invoice}</p>
          </div>
        )}
        {payment_received && (
          <Par>You received a payment from your counterparty. ✅</Par>
        )}
        {payment_sent && (
          <Par>Your payment to your counterparty went through. ✅</Par>
        )}
        {payment_not_received && (
          <Par>
            A payment from your counterparty to you has been canceled by the
            oracle. ❌
          </Par>
        )}
        {payment_not_sent && (
          <Par>
            A payment from you to your counterparty has been canceled by the
            oracle. ❌
          </Par>
        )}
        {completion_message && <Par>This contract is complete 🎉</Par>}
      </Wrapper>
    );
  }
}

export default Party;
