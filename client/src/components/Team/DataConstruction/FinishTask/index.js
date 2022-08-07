import { Button, Result } from 'antd';
import React from 'react';

const FinishTask = ({ history }) => {
  return (
    <Result
      status="success"
      title="You have completed the evaluation."
      subTitle="Thank you for your contribution to the challenge!"
      extra={[
        <Button
          style={{ margin: '0 auto' }}
          onClick={() => history.push('/')}
          type="primary"
        >
          Quay về trang chủ
        </Button>,
      ]}
    />
  );
};

export default FinishTask;
