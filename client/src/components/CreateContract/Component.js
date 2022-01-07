import React from "react";
import { Field } from "redux-form";
import categories from "../../categories";
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
    if (contract) history.push(`/oracle/${contract.id}`);
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
              name="contract name"
              label="contract_name"
              type="text"
              component={renderField}
              initialValues="Bob trades with Alice, $100 in bitcoin for $100 in usd"
            />
            <Field
              name="contract description"
              label="description"
              type="textarea"
              component={renderField}
              initialValues="The 1st party submits an invoice for $100 and hands the 2nd party $100 usd. The 2nd party pays the invoice and the oracle settles that invoice. This completes the contract in the happy case. There are two unhappy cases. If the 2nd party doesn't send the bitcoins, the contract expires on the settlement date. No one loses any money but no one is happy. If the 1st party doesn't hand over the usd, the oracle cancels the 1st party's invoice. No one loses any money but no one is happy."
            />
            <Field
              name="settlement date"
              label="settlement_date"
              type="text"
              component={renderField}
              initialValues="2018-01-01"
            />
            <Field
              name="first party's role"
              label="first_party_role"
              type="text"
              component={renderField}
              initialValues="Bitcoin buyer"
            />
            <Field
              name="second party's role"
              label="second_party_role"
              type="text"
              component={renderField}
              initialValues="Bitcoin seller"
            />
            <Field
              name="how much will the first party send to the second party via bitcoin?"
              label="first_party_amount"
              type="text"
              component={renderField}
              initialValues="0"
            />
            <Field
              name="how much will the second party send to the first party via bitcoin?"
              label="second_party_amount"
              type="text"
              component={renderField}
              initialValues="100"
            />
            <Field
              name="oracle fee"
              label="oracle_fee"
              type="text"
              component={renderField}
              initialValues="0"
            />
          </div>
        )}
        {this.props.form.values.type === "bet" && (
          <div>
            <Field
              name="contract name"
              label="contract_name"
              type="text"
              component={renderField}
              initialValues="Bob trades with Alice, $100 in bitcoin for $100 in usd"
            />
            <Field
              name="contract description"
              label="description"
              type="textarea"
              component={renderField}
              initialValues="The 1st party submits an invoice for $100 and hands the 2nd party $100 usd. The 2nd party pays the invoice and the oracle settles that invoice. This completes the contract in the happy case. There are two unhappy cases. If the 2nd party doesn't send the bitcoins, the contract expires on the settlement date. No one loses any money but no one is happy. If the 1st party doesn't hand over the usd, the oracle cancels the 1st party's invoice. No one loses any money but no one is happy."
            />
            <Field
              name="settlement date"
              label="settlement_date"
              type="text"
              component={renderField}
              initialValues="2018-01-01"
            />
            <Field
              name="first party's role"
              label="first_party_role"
              type="text"
              component={renderField}
              initialValues="Bitcoin buyer"
            />
            <Field
              name="second party's role"
              label="second_party_role"
              type="text"
              component={renderField}
              initialValues="Bitcoin seller"
            />
            <Field
              name="how much will the first party send to the second party via bitcoin?"
              label="first_party_amount"
              type="text"
              component={renderField}
              initialValues="0"
            />
            <Field
              name="how much will the second party send to the first party via bitcoin?"
              label="second_party_amount"
              type="text"
              component={renderField}
              initialValues="100"
            />
            <Field
              name="oracle fee"
              label="oracle_fee"
              type="text"
              component={renderField}
              initialValues="0"
            />
          </div>
        )}
        {this.props.form.values.type === "loan" && (
          <div>
            <Field
              name="contract name"
              label="contract_name"
              type="text"
              component={renderField}
              initialValues="Bob trades with Alice, $100 in bitcoin for $100 in usd"
            />
            <Field
              name="contract description"
              label="description"
              type="textarea"
              component={renderField}
              initialValues="The 1st party submits an invoice for $100 and hands the 2nd party $100 usd. The 2nd party pays the invoice and the oracle settles that invoice. This completes the contract in the happy case. There are two unhappy cases. If the 2nd party doesn't send the bitcoins, the contract expires on the settlement date. No one loses any money but no one is happy. If the 1st party doesn't hand over the usd, the oracle cancels the 1st party's invoice. No one loses any money but no one is happy."
            />
            <Field
              name="settlement date"
              label="settlement_date"
              type="text"
              component={renderField}
              initialValues="2018-01-01"
            />
            <Field
              name="first party's role"
              label="first_party_role"
              type="text"
              component={renderField}
              initialValues="Bitcoin buyer"
            />
            <Field
              name="second party's role"
              label="second_party_role"
              type="text"
              component={renderField}
              initialValues="Bitcoin seller"
            />
            <Field
              name="how much will the first party send to the second party via bitcoin?"
              label="first_party_amount"
              type="text"
              component={renderField}
              initialValues="0"
            />
            <Field
              name="how much will the second party send to the first party via bitcoin?"
              label="second_party_amount"
              type="text"
              component={renderField}
              initialValues="100"
            />
            <Field
              name="oracle fee"
              label="oracle_fee"
              type="text"
              component={renderField}
              initialValues="0"
            />
          </div>
        )}
        <SubmitButton>Create Contract</SubmitButton>
      </Form>
    );
  }
}

export default CreateContractForm;
