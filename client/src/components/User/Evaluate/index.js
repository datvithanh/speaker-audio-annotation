/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  getAudioForUser,
  setPointForAudio,
  getIndexAudio,
  decreaseIndexAudio,
  increaseIndexAudio,
  setAudios,
} from '../../../actions/user';
import { connect } from 'react-redux';
import { Radio, Result, Button, Icon } from 'antd';
import EvaluateStyle from './index.style';

const Evaluate = ({
  getAudioForUser,
  setPointForAudio,
  test,
  audios,
  user,
  match,
  history,
  indexAudio,
  increaseIndexAudio,
  decreaseIndexAudio,
  getIndexAudio,
  setAudios,
}) => {
  const [point, setPoint] = useState();
  const [disabledButton, setDisableButton] = useState(true);
  const [disableButtonBack, setDisableButtonBack] = useState(false);
  const [disableButtonNext, setDisableButtonNext] = useState(false);

  useEffect(() => {
    if (user) {
      getIndexAudio(user._id, match.params.id);
      getAudioForUser(user._id, match.params.id);
      console.log(indexAudio);
    }
  }, [getAudioForUser, getIndexAudio, match.params.id, user]);

  const onClickHandler = () => {
    if (indexAudio < audios.length) {
      console.log('indexAudio', indexAudio);
      setPointForAudio(
        match.params.id,
        audios[indexAudio]._id,
        user._id,
        point,
        indexAudio,
      );
    }
    setPoint(null);

    setDisableButton(true);
    // console.log(audios[indexAudio]._id, point);
    setAudios(audios[indexAudio]._id, point);
  };

  const onChange = e => {
    setPoint(e.target.value);
    setDisableButton(false);
  };

  const backSentence = () => {
    if (indexAudio > 0) {
      decreaseIndexAudio();
      setDisableButtonNext(false);
      console.log(indexAudio);
      console.log(audios);
      setPoint(audios[indexAudio - 1].user.point);
    } else {
      setDisableButtonBack(true);
    }
  };

  const nextSentence = () => {
    if (indexAudio < audios.length - 1) {
      increaseIndexAudio();
      setPoint(audios[indexAudio + 1].user.point);
      console.log(indexAudio);
      setDisableButtonBack(false);
      // }
    } else {
      setDisableButtonNext(true);
    }
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    fontSize: '20px',
  };

  return (
    <>
      {audios && audios.length && indexAudio < audios.length ? (
        <EvaluateStyle>
          <div key={audios[indexAudio]._id} className="container">
            <div className="voice">
              <h5>Giọng đọc: {audios[indexAudio].voice}</h5>
            </div>

            <div className="user-evaluate">
              <h5>
                Câu thứ <b>{indexAudio + 1}</b> (tổng số {audios.length} câu).
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
          <div className="group-button">
            <Button
              disabled={disableButtonBack}
              className="btn btn-warning"
              onClick={backSentence}
              type="primary"
            >
              <Icon type="left" />
              Câu trước
            </Button>
            <Button
              disabled={disabledButton}
              className="btn btn-warning"
              onClick={onClickHandler}
            >
              Hoàn thành
            </Button>
            <Button
              disabled={disableButtonNext}
              className="btn btn-warning"
              onClick={nextSentence}
              type="primary"
            >
              Câu tiếp
              <Icon type="right" />
            </Button>
          </div>
        </EvaluateStyle>
      ) : (
        <Result
          status="success"
          title="Bạn đã hoàn thành bài test"
          subTitle="Cảm ơn bạn đã tham gia đánh giá chất lượng giọng nói cùng chúng tôi!"
          extra={[
            <Button
              style={{ margin: '0 auto' }}
              onClick={backSentence}
              key="console"
            >
              Quay lại đánh giá
            </Button>,
            <Button
              style={{ margin: '0 auto' }}
              onClick={() => history.push('/')}
              type="primary"
              key="console"
            >
              Quay về trang chủ
            </Button>,
          ]}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    test: state.user.testCurrently,
    audios: state.user.audios,
    user: state.auth.user,
    indexAudio: state.user.indexAudio,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getAudioForUser,
      setPointForAudio,
      getIndexAudio,
      decreaseIndexAudio,
      increaseIndexAudio,
      setAudios,
    },
  )(Evaluate),
);
