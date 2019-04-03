import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { Card } from 'antd';
const { Meta } = Card;
const sgkey =
  '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';
class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (Array.isArray(this.props.surveys)) {
      return this.props.surveys.reverse().map(survey => {
        return (
          <Card
            key={survey.title}
            style={{ width: 600, margin: '20px auto' }}
            actions={[<p>Yes:{survey.yes}</p>, <p>No:{survey.no}</p>]}
          >
            <Meta title={survey.title} description={survey.body} />
            <p>
              <b>Date Sent:</b> {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </Card>
        );
      });
    }
  }

  render() {
    return (
      <>
        <div>{this.renderSurveys()}</div>
      </>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
