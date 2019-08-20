import React from 'react';
import { Alert } from 'antd';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';
import {
  setStepCreateTest,
  resetTest,
  addUserAndFileupload,
} from '../../../../actions/admin';
import { connect } from 'react-redux';

const index = ({
  setStepCreateTest,
  resetTest,
  test,
  userChosen,
  sentencePath,
  audioPath,
  addUserAndFileupload,
}) => {
  const onClickHandler = () => {
    addUserAndFileupload(userChosen, test._id, sentencePath, audioPath);
    setStepCreateTest('step1');
    resetTest();
    return <Redirect to="/admin/create-test" />;
  };

  return (
    <>
      <Alert
        message="Thành công"
        description="Các thông tin tạo hợp lệ. Chọn hoàn thành để tiến hành tạo bài test."
        type="success"
        showIcon
      />
      <Button
        onClick={onClickHandler}
        style={{ display: 'block', margin: '1rem auto' }}
        type="primary"
      >
        Hoàn thành
      </Button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    sentencePath: state.admin.sentencePath,
    audioPath: state.admin.audioPath,
    userChosen: state.admin.userChosen,
    test: state.admin.test,
  };
};

export default connect(
  mapStateToProps,
  { setStepCreateTest, resetTest, addUserAndFileupload },
)(index);
