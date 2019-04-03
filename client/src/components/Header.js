import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Icon, Tag } from "antd";
import Payments from "./Payments";

export class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <>
            <a href="/auth/facebook">
              <img
                alt="facebook-authentication"
                style={styles.imageStyle}
                src="https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-02-512.png"
              />
            </a>
            <a href="/auth/google">
              <img
                alt="google-authentication"
                style={styles.imageStyle}
                src="https://cdn0.iconfinder.com/data/icons/shift-logotypes/32/Google-512.png"
              />
            </a>
          </>
        );
      default:
        return (
          <>
            <Tag>Credits: {this.props.auth.credits}</Tag>
            <Payments />
            <a href="/api/logout">
              <Icon
                style={{ fontSize: 30, color: "White", marginTop: 10 }}
                type="logout"
                theme="outlined"
              />
            </a>
          </>
        );
    }
  };
  render() {
    return (
      <div style={styles.headerStyles}>
        <Row>
          <Col
            span={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "10px 10px 10px 30px"
            }}
          >
            <Link to="/surveys">
              <h1 style={{ color: "white" }}>Emaily</h1>
            </Link>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "10px 30px 10px 30px"
            }}
          >
            {this.renderContent()}
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  headerStyles: {
    height: "70px",
    width: "100%",
    background: "linear-gradient(to right, #48b1bf, #06beb6)"
  },
  imageStyle: {
    height: 35,
    opacity: 0.8,
    margin: "8px"
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(
  mapStateToProps,
  null
)(Header);
