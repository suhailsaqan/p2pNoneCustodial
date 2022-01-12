import React from "react";
import { Field } from "redux-form";
import Form from "../../shared/form/Form";
import renderField from "../../shared/form/renderField";
import SubmitButton from "../../shared/form/SubmitButton";

class InvoiceForm extends React.Component {
  addInvoice = (invoice) => {
    console.log(this.props.contract._id, this.props.party, invoice);
    this.props.attemptAddInvoice(
      this.props.contract._id,
      this.props.party,
      invoice
    );
  };

  onSubmit = () => this.props.handleSubmit(this.addInvoice);

  render() {
    return (
      <Form loading={this.props.isFetching} onSubmit={this.onSubmit()}>
        <Field
          name="invoice"
          label="invoice"
          type="text"
          component={renderField}
        />
        <SubmitButton type="submit">Submit Invoice</SubmitButton>
      </Form>
    );
  }
}

export default InvoiceForm;
