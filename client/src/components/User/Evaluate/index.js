import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getAudioForUser, setPointForAudio } from '../../../actions/user';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import EvaluateStyle from './index.style';
import { Modal } from 'antd';

const Evaluate = ({
  getAudioForUser,
  setPointForAudio,
  test,
  audios,
  user,
  match,
  history,
}) => {
  const [indexAudio, setIndexAudio] = useState(0);
  const [point, setPoint] = useState();
  const [visibleModal, setVisibleModal] = useState(false);
  const [disabledButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (user) {
      getAudioForUser(user._id, match.params.id);
    }
  }, [getAudioForUser, match, test, user]);

  const onClickHandler = () => {
    if (indexAudio < audios.length - 1) {
      setIndexAudio(indexAudio + 1);
      setPointForAudio(audios[indexAudio]._id, user._id, point);
    } else {
      showModal();
    }
    setPoint();
    setDisableButton(true);
  };

  const onChange = e => {
    setPoint(e.target.value);
    setDisableButton(false);
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    fontSize: '20px',
  };

  const showModal = () => {
    setVisibleModal(true);
  };

  const handleOk = e => {
    // setVisibleModal(false);
    history.push('/');
  };

  const handleCancel = e => {
    setVisibleModal(false);
  };

  return (
    <EvaluateStyle>
      <Modal
        title="Basic Modal"
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Bạn đã đánh giá xong {audios.length}/{audios.length} câu.
        </p>
        <p>Chọn ok để quay lại trang chủ.</p>
      </Modal>
      {audios.length ? (
        <div key={audios[indexAudio]._id} className="container">
          <div className="voice">
            <h5>Giọng đọc: {audios[indexAudio].voice}</h5>
          </div>

          <div className="user-evaluate">
            <h5>
              Bạn đã đánh giá :{' '}
              <b>
                {indexAudio}/{audios.length}
              </b>{' '}
              câu.
            </h5>
          </div>

          <div className="content">
            <h5>Nội dung câu: </h5>
            <div className="content-text">{audios[indexAudio].sentence}</div>
          </div>

          <audio controls>
            <source src={audios[indexAudio].link} />
            <track kind="captions" />
          </audio>
        </div>
      ) : null}
      <div className="evaluate">
        <h3>Đánh giá chất lượng giọng đọc</h3>
        <Radio.Group onChange={onChange} value={point}>
          <Radio style={radioStyle} value={5}>
            5 điểm, như giọng người thật.
          </Radio>
          <Radio style={radioStyle} value={4}>
            4 điểm, khá gần với ngôn ngữ tự nhiên.
          </Radio>
          <Radio style={radioStyle} value={3}>
            3 điểm, nghe được nhưng không tự nhiên.
          </Radio>
          <Radio style={radioStyle} value={2}>
            2 điểm, giọng quá nhiều yếu tố nhân tạo.
          </Radio>
          <Radio style={radioStyle} value={1}>
            1 điểm, không nghe được, phát âm sai hoặc không rõ ràng.
          </Radio>
        </Radio.Group>
      </div>

      <button disabled={disabledButton} className="btn btn-warning" onClick={onClickHandler}>
        Hoàn thành
      </button>
    </EvaluateStyle>
  );
};

const mapStateToProps = state => {
  return {
    test: state.user.testCurrently,
    audios: state.user.audios,
    user: state.auth.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getAudioForUser, setPointForAudio },
  )(Evaluate),
);
