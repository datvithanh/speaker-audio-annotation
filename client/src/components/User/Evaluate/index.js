/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import {
  getAudioForUser,
  setPointForAudio,
  getIndexAudio,
  decreaseIndexAudio,
  increaseIndexAudio,
  setAudios,
  setIndexAudio,
} from '../../../actions/user';
import { connect } from 'react-redux';
import { Radio, Result, Button, Icon, Spin } from 'antd';
import EvaluateStyle from './index.style';

const Evaluate = ({
  getAudioForUser,
  setPointForAudio,
  audios,
  user,
  match,
  history,
  indexAudio,
  increaseIndexAudio,
  decreaseIndexAudio,
  getIndexAudio,
  setAudios,
  setIndexAudio,
}) => {
  const [point, setPoint] = useState();
  const [disabledButton, setDisableButton] = useState(true);
  const [disableButtonBack, setDisableButtonBack] = useState(false);
  const [disableButtonNext, setDisableButtonNext] = useState(false);
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [displayFinishButton, setDisplayFinishButton] = useState(false);
  const [displayFinishForm, setDisplayFinishForm] = useState(false);

  useEffect(() => {
    if (user) {
      if (audios && (audios.length !== 0 && indexAudio < audios.length)) {
        setDisplaySpinner(false);
        setPoint(audios[indexAudio].user.point);
        const check = audios.every(audio => audio.user.point !== null);
        console.log('check', check);
        if (check) {
          // setCheckFinished(true);
          setDisplayFinishButton(true);
        }
      } else if (audios && indexAudio === audios.length) {
        setDisplaySpinner(false);
        setIndexAudio(indexAudio - 1);
      } else {
        setDisplaySpinner(true);

        getIndexAudio(user._id, match.params.id);
        getAudioForUser(user._id, match.params.id);

        setTimeout(() => {
          setDisplaySpinner(false);
        }, 100);
      }
    }
  }, [
    displaySpinner,
    getAudioForUser,
    getIndexAudio,
    match.params.id,
    user,
    indexAudio,
  ]);

  const onClickHandler = () => {
    if (indexAudio < audios.length) {
      setPointForAudio(
        match.params.id,
        audios[indexAudio]._id,
        user._id,
        point,
        indexAudio,
      );
    }
    if (indexAudio < audios.length) {
      console.log(indexAudio);
      if (audios[indexAudio + 1] && audios[indexAudio + 1].user.point) {
        setPoint(audios[indexAudio + 1].user.point);
      } else {
        setPoint(null);
      }

      setDisableButton(true);
      setAudios(audios[indexAudio]._id, point);
    }
  };

  const onClickFinishButton = () => {
    setDisplayFinishForm(true);
  };

  const onChange = e => {
    setPoint(e.target.value);
    setDisableButton(false);
  };

  const backSentence = () => {
    setDisableButton(true);

    if (indexAudio > 0) {
      decreaseIndexAudio();
      setDisableButtonNext(false);
      setPoint(audios[indexAudio - 1].user.point);
    } else {
      setDisableButtonBack(true);
    }
  };

  const nextSentence = () => {
    setDisableButton(true);

    if (indexAudio < audios.length - 1) {
      increaseIndexAudio();
      setPoint(audios[indexAudio + 1].user.point);
      setDisableButtonBack(false);
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

  const jumpToSentence = _id => {
    const index = audios.findIndex(item => item._id === _id);
    setIndexAudio(index);
    if (index !== indexAudio && audios[indexAudio - 1]) {
      setPoint(audios[indexAudio - 1].user.point);
    }

    // console.log('indexAudio', indexAudio);
    // if (audios[indexAudio - 1].user.point) {
    //   console.log(audios[indexAudio - 1].user.point);
    //   setPoint(audios[indexAudio - 1].user.point);
    // } else {
    //   setPoint(null);
    // }
  };

  const columnsPoint = [
    {
      title: 'Số thứ tự',
      dataIndex: '_id',
      width: 150,
      render: _id => {
        const index = audios.findIndex(item => item._id === _id);

        return (
          <span
            style={{ cursor: 'Pointer', textDecoration: 'underline' }}
            onClick={() => jumpToSentence(_id)}
          >
            Câu {index + 1}
          </span>
        );
      },
    },
    {
      title: 'Điểm',
      dataIndex: 'user.point',
      width: 150,
    },
  ];

  return (
    <>
      {displaySpinner ? (
        <Spin />
      ) : (
        <>
          {!displayFinishForm &&
            audios &&
            audios.length !== 0 &&
            indexAudio < audios.length && (
              <EvaluateStyle>
                <div>
                  <Table
                    columns={columnsPoint}
                    dataSource={audios}
                    rowKey="_id"
                    bordered
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: 840 }}
                  />
                  <Button
                    disabled={!displayFinishButton}
                    className="btn btn-warning"
                    onClick={onClickFinishButton}
                  >
                    Nộp kết quả
                  </Button>
                </div>
                <div className="content-evaluate">
                  <div key={audios[indexAudio]._id} className="container">
                    <div className="voice">
                      <h5>Giọng đọc: {audios[indexAudio].voice}</h5>
                    </div>

                    <div className="user-evaluate">
                      <h5>
                        Câu thứ <b>{indexAudio + 1}</b> (tổng số {audios.length}{' '}
                        câu).
                      </h5>
                    </div>

                    <div className="content">
                      <h5>Nội dung câu: </h5>
                      <div className="content-text">
                        {audios[indexAudio].sentence}
                      </div>
                    </div>

                    <audio controls>
                      <source
                        src={
                          process.env.REACT_APP_API_DOMAIN +
                          audios[indexAudio].link
                        }
                      />
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
                      Lưu điểm
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
                </div>
              </EvaluateStyle>
            )}
          {displayFinishForm && (
            <Result
              status="success"
              title="Bạn đã hoàn thành bài test"
              subTitle="Cảm ơn bạn đã tham gia đánh giá chất lượng giọng nói cùng chúng tôi!"
              extra={[
                <Button
                  style={{ margin: '0 auto' }}
                  onClick={() => setDisplayFinishForm(false)}
                >
                  Quay lại đánh giá
                </Button>,
                <Button
                  style={{ margin: '0 auto' }}
                  onClick={() => history.push('/')}
                  type="primary"
                >
                  Quay về trang chủ
                </Button>,
              ]}
            />
          )}
        </>
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
      setIndexAudio,
    },
  )(Evaluate),
);
