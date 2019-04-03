import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SurveyFeild from "./SurveyFeild";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
  { label: "Survey Title", name: "title", placeholder: "Enter a title..." },
  {
    label: "Subject Line",
    name: "subject",
    placeholder: "Enter the subject..."
  },
  { label: "Email Body", name: "body", placeholder: "Enter email body..." },
  {
    label: "Recipient list",
    name: "recipients",
    placeholder: "Enter the list of recipients..."
  }
];

export class SurveyForm extends Component {
  renderFeilds() {
    return FIELDS.map(({ label, name, placeholder }) => (
      <Field
        key={name}
        label={label}
        placeholder={placeholder}
        type="text"
        name={name}
        component={SurveyFeild}
      />
    ));
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "coloumn",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFeilds()}
          <Link to="/surveys">
            <Button size="large" style={{ margin: 10 }}>
              Cancel
            </Button>
          </Link>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            style={{ margin: 10 }}
          >
            Next
          </Button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = "This can't be empty.";
    }

    errors.recipients = validateEmails(values.recipients || "");
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
