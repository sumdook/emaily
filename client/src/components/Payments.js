import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Button } from "antd";
import * as actions from "../actions";
export class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 credits"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button style={{ margin: "10px 30px" }}>Add Credits</Button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
