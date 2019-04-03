import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <Link to="/surveys/new">
        <Button
          type="primary"
          size="large"
          shape="circle"
          icon="plus"
          style={{ position: 'fixed', bottom: 40, right: 50, marginTop: 30 }}
        />
      </Link>
    </div>
  );
};

export default Dashboard;
