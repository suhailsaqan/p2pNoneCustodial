import React from "react";
import { Field } from "redux-form";
import Form from "../shared/form/Form";
import renderField from "../shared/form/renderField";
import SubmitButton from "../shared/form/SubmitButton";

const ContractTemplates = [
  {
    label: "trade",
    value: "trade",
  },
  {
    label: "bet",
    value: "bet",
  },
  {
    label: "loan",
    value: "loan",
  },
];

class CreateContractForm extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contract, history } = this.props;
    if (contract) history.push(`/${contract._id}`);
  }

  onSubmit = (contract) => {
    this.props.attemptCreateContract(contract);
  };

  render() {
    return (
      <Form
        loading={this.props.isFetching}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        wide
      >
        <Field
          name="type"
          label="type"
          type="radiogroup"
          component={renderField}
          options={ContractTemplates}
        />
        {this.props.form.values.type === "trade" && (
          <div>
            <Field
              label="contract name"
              name="contract_name"
              type="text"
              component={renderField}
              defaultValue="Bob trades with Alice, $100 in bitcoin for $100 in usd"
            />
            <Field
              label="contract description"
              name="description"
              type="textarea"
              component={renderField}
              defaultValue="The 1st party submits an invoice for $100 and hands the 2nd party $100 usd. The 2nd party pays the invoice and the oracle settles that invoice. This completes the contract in the happy case. There are two unhappy cases. If the 2nd party doesn't send the bitcoins, the contract expires on the settlement date. No one loses any money but no one is happy. If the 1st party doesn't hand over the usd, the oracle cancels the 1st party's invoice. No one loses any money but no one is happy."
            />
            <Field
              label="settlement date"
              name="settlement_date"
              type="text"
              component={renderField}
              defaultValue="2018-01-01"
            />
            <Field
              label="first party's role"
              name="first_party_role"
              type="text"
              component={renderField}
              defaultValue="Bitcoin buyer"
            />
            <Field
              label="second party's role"
              name="second_party_role"
              type="text"
              component={renderField}
              defaultValue="Bitcoin seller"
            />
            <Field
              label="how much will the first party send to the second party via bitcoin?"
              name="first_party_amount"
              type="text"
              component={renderField}
              defaultValue="0"
            />
            <Field
              label="how much will the second party send to the first party via bitcoin?"
              name="second_party_amount"
              type="text"
              component={renderField}
              defaultValue="100"
            />
            <Field
              label="oracle fee"
              name="oracle_fee"
              type="text"
              component={renderField}
              defaultValue="0"
            />
          </div>
        )}
        {this.props.form.values.type === "bet" && (
          <div>
            <Field
              label="contract name"
              name="contract_name"
              type="text"
              component={renderField}
              defaultValue="Bob trades with Alice, $100 in bitcoin for $100 in usd"
            />
            <Field
              label="contract description"
              name="description"
              type="textarea"
              component={renderField}
              defaultValue="The 1st party submits an invoice for $100 and hands the 2nd party $100 usd. The 2nd party pays the invoice and the oracle settles that invoice. This completes the contract in the happy case. There are two unhappy cases. If the 2nd party doesn't send the bitcoins, the contract expires on the settlement date. No one loses any money but no one is happy. If the 1st party doesn't hand over the usd, the oracle cancels the 1st party's invoice. No one loses any money but no one is happy."
            />
            <Field
              label="settlement date"
              name="settlement_date"
              type="text"
              component={renderField}
              defaultValue="2018-01-01"
            />
            <Field
              label="first party's role"
              name="first_party_role"
              type="text"
              component={renderField}
              defaultValue="Bitcoin buyer"
            />
            <Field
              label="second party's role"
              name="second_party_role"
              type="text"
              component={renderField}
              defaultValue="Bitcoin seller"
            />
            <Field
              label="how much will the first party send to the second party via bitcoin?"
              name="first_party_amount"
              type="text"
              component={renderField}
              defaultValue="0"
            />
            <Field
              label="how much will the second party send to the first party via bitcoin?"
              name="second_party_amount"
              type="text"
              component={renderField}
              defaultValue="100"
            />
            <Field
              label="oracle fee"
              name="oracle_fee"
              type="text"
              component={renderField}
              defaultValue="0"
            />
          </div>
        )}
        {this.props.form.values.type === "loan" && (
          <div>
            <Field
              label="contract name"
              name="contract_name"
              type="text"
              component={renderField}
              defaultValue="Bob trades with Alice, $100 in bitcoin for $100 in usd"
            />
            <Field
              label="contract description"
              name="description"
              type="textarea"
              component={renderField}
              defaultValue="The 1st party submits an invoice for $100 and hands the 2nd party $100 usd. The 2nd party pays the invoice and the oracle settles that invoice. This completes the contract in the happy case. There are two unhappy cases. If the 2nd party doesn't send the bitcoins, the contract expires on the settlement date. No one loses any money but no one is happy. If the 1st party doesn't hand over the usd, the oracle cancels the 1st party's invoice. No one loses any money but no one is happy."
            />
            <Field
              label="settlement date"
              name="settlement_date"
              type="text"
              component={renderField}
              defaultValue="2018-01-01"
            />
            <Field
              label="first party's role"
              name="first_party_role"
              type="text"
              component={renderField}
              defaultValue="Bitcoin buyer"
            />
            <Field
              label="second party's role"
              name="second_party_role"
              type="text"
              component={renderField}
              defaultValue="Bitcoin seller"
            />
            <Field
              label="how much will the first party send to the second party via bitcoin?"
              name="first_party_amount"
              type="text"
              component={renderField}
              defaultValue="0"
            />
            <Field
              label="how much will the second party send to the first party via bitcoin?"
              name="second_party_amount"
              type="text"
              component={renderField}
              defaultValue="100"
            />
            <Field
              label="oracle fee"
              name="oracle_fee"
              type="text"
              component={renderField}
              defaultValue="0"
            />
          </div>
        )}
        <SubmitButton>Create Contract</SubmitButton>
      </Form>
    );
  }
}

export default CreateContractForm;
