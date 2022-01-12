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
    label: "loan",
    value: "loan",
  },
];

class CreateContractForm extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { contract, history } = this.props;
    if (contract) history.push(`/oracle/${contract._id}`);
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
              defaultValue=""
            />
            <Field
              label="contract description"
              name="description"
              type="textarea"
              component={renderField}
              defaultValue=""
            />
            <Field
              label="settlement date"
              name="settlement_date"
              type="text"
              component={renderField}
              defaultValue="2018-01-01"
            />
            <Field
              label="first party task"
              name="first_party_task"
              type="text"
              component={renderField}
              defaultValue="Bitcoin buyer"
            />
            <Field
              label="second party's task"
              name="second_party_task"
              type="text"
              component={renderField}
              defaultValue="Bitcoin seller"
            />
            <Field
              label="how much bitcoin will the first party send to the second party"
              name="first_party_amount"
              type="text"
              component={renderField}
              defaultValue="0"
            />
            <Field
              label="how much bitcoin will the second party send to the first party"
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
              defaultValue=""
            />
            <Field
              label="contract description"
              name="description"
              type="textarea"
              component={renderField}
              defaultValue=""
            />
            <Field
              label="settlement date"
              name="settlement_date"
              type="text"
              component={renderField}
              defaultValue="2018-01-01"
            />
            <Field
              label="first party's task"
              name="first_party_task"
              type="text"
              component={renderField}
              defaultValue="Bitcoin Lender"
            />
            <Field
              label="second party's task"
              name="second_party_task"
              type="text"
              component={renderField}
              defaultValue="Bitcoin Borrower"
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
