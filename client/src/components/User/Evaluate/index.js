import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getAudioForUser, setPointForAudio } from '../../../actions/user';
import { connect } from 'react-redux';
import { Radio, Result, Button } from 'antd';
import EvaluateStyle from './index.style';

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
  const [disabledButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (user) {
      getAudioForUser(user._id, match.params.id);
    }
  }, [getAudioForUser, match, test, user]);

  const onClickHandler = () => {
    if (indexAudio < audios.length) {
      setIndexAudio(indexAudio + 1);
      setPointForAudio(audios[indexAudio]._id, user._id, point);
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

  return (
    <EvaluateStyle>
      {audios.length && indexAudio < audios.length ? (
        <>
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

          <button
            disabled={disabledButton}
            className="btn btn-warning"
            onClick={onClickHandler}
          >
            Hoàn thành
          </button>
        </>
      ) : (
        <Result
          status="success"
          title="Bạn đã hoàn thành bài test"
          subTitle="Cảm ơn bạn đã tham gia đánh giá chất lượng giọng nói cùng chúng tôi!"
          extra={[
            <Button style={{margin: '0 auto'}} onClick={() => history.push('/')} type="primary" key="console">
              Quay về trang chủ
            </Button>,
          ]}
        />
      )}
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
