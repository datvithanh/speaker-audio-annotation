import React from 'react';
import { Alert } from 'antd';
import { Button, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import { setStepCreateTest, resetTest } from '../../../../actions/admin';
import { connect } from 'react-redux';

const index = ({setStepCreateTest, resetTest}) => {
  const onClickHandler = () => {
    setStepCreateTest('step1');
    resetTest();
    return <Redirect to="/admin/create-test" />;
  };

  return (
    <>
      <Alert
        message="Thành công"
        description="Bạn đã tạo bài test thành công."
        type="success"
        showIcon
      />
      <Button
        onClick={onClickHandler}
        style={{ display: 'block', marginLeft: 'auto' }}
        type="primary"
      >
        <Icon type="left" />
        Quay về trang chủ
      </Button>
    </>
  );
};

export default connect(null,{setStepCreateTest, resetTest})(index);
