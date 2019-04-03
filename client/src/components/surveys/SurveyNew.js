import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
export class SurveyNew extends Component {
  state = { formReview: false };

  renderContent() {
    if (this.state.formReview) {
      return (
        <SurveyFormReview
          onCancel={() => {
            this.setState({ formReview: false });
          }}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => {
          this.setState({ formReview: true });
        }}
      />
    );
  }
  render() {
    return (
      <div>
        <h1 />
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
