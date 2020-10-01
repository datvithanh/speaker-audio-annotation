import { Button, Result } from 'antd';
import React from 'react';

const FinishTask = ({ history }) => {
  return (
    <Result
      status="success"
      title="Bạn đã hoàn thành nhiệm vụ"
      subTitle="Cảm ơn bạn đã tham gia xây dựng tập dữ liệu trainning cùng chúng tôi!"
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
