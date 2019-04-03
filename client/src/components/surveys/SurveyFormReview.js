import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Icon, Button } from "antd";
import * as actions from "../../actions";

function SurveyFormReview({ onCancel, formValues, submitSurvey, history }) {
  console.log(formValues);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      <Card
        title="Please confirm your entries"
        style={{ width: 500 }}
        actions={[
          <Button onClick={onCancel}>
            <Icon type="arrow-left" /> Cancel
          </Button>,
          <Button
            onClick={() => {
              submitSurvey(formValues, history);
            }}
          >
            Send Surveys <Icon type="arrow-right" />
          </Button>
        ]}
      >
        <p>
          <b>Title:</b> {formValues.title}
        </p>
        <p>
          <b>Subject</b> {formValues.subject}
        </p>
        <p>
          <b>Body: </b>
          {formValues.body}
        </p>
        <p>
          <b>Recipients:</b> {formValues.recipients}
        </p>
      </Card>
    </div>
  );
}

function mapStateToProps({ form }) {
  return { formValues: form.surveyForm.values };
}
export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
