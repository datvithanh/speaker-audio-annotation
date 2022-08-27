import React, { useEffect, useRef, useState } from 'react';
import { Row, List, Col, Input, Tooltip, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import StyleDataConstruction, {
  StyleGuide,
  StyleTextDesc,
  StyleTextEx,
  StyleTextTitle,
} from './index.style';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import {
  getRandomizeAudio,
  getCompetitionById,
  typing,
  voting,
  getTaskProcess,
} from '../../../actions/team';
import { CopyOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons';
import { removeRedundantCharacter } from '../../../utils/prePocessStringInput';

const { TextArea } = Input;

const options = [
  {label: 'Giọng cùng một người', value: 'same'},
  {label: 'Giọng khác người nói', value: 'different'},
];

const DataConstruction = ({ match, history }) => {
  const [transcriptInputText, setTranscriptInputText] = useState('');
  const [sameSpeakerDecision, setSameSpeakerDecision] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const transcriptInput = useRef()
  const sameSpeakerInput = useRef();

  const {
    currentAudio,
    currentAudio2,
    competition,
    transcripts,
    completed,
    processTask,
  } = useSelector(state => state.team);

  const dispatch = useDispatch();

  useEffect(() => {
    if (completed) {
      return history.push('/team/finish');
    }
    // transcriptInput.current.focus();
    dispatch(getCompetitionById(match.params.competitionId));
    dispatch(getTaskProcess(match.params.competitionId));
    dispatch(getRandomizeAudio(match.params.competitionId));
  }, [completed, dispatch, history, match.params.competitionId]);

  useEffect(() => {
    onTrackChange(currentAudio);
  }, [currentAudio]);

  const audio = useRef();
  const audio2 = useRef();

  const toggle = value => () => {
    setCollapsed(value);
  };
  const sendTranscriptHandler = () => {
    // transcriptInput.current.focus();
    // setTranscriptInputText('');
    console.log(sameSpeakerDecision);
    dispatch(
      typing(removeRedundantCharacter(sameSpeakerDecision), currentAudio._id),
    );
    setSameSpeakerDecision(null);
  };

  const voteHandler = teamId => {
    // transcriptInput.current.focus();
    setTranscriptInputText('');
    dispatch(voting(teamId, currentAudio._id));
  };

  const onTrackChange = src => {
    if (src != null) {
      audio.current.pause();
      audio.current.load();

      audio2.current.pause();
      audio2.current.load();
    }
  };

  const radioOnChange = e => {
    sameSpeakerInput.current.focus();
    setSameSpeakerDecision(e.target.value);
  };

  const onChangeTextAreaHandler = e => {
    setTranscriptInputText(e.target.value);
  };

  return (
    <StyleDataConstruction>
      <div className="app-data-construction">
        {competition && (
          <h2 className="flex-center">{competition.name.toUpperCase()}</h2>
        )}
        <div className="main">
          <Col span={collapsed ? 0 : 8}>
            <StyleGuide>
              <StyleTextTitle>
                Hướng dẫn kiểm tra audio
              </StyleTextTitle>
              <StyleTextDesc>
                1. Nếu 2 audio là của cùng một người nói, chọn option "Giọng của một người".
              </StyleTextDesc>
              <StyleTextDesc>
                2. Nếu 2 audio là của 2 người khác nhau, chọn option "Giọng của 2 người khác nhau".
              </StyleTextDesc>
              <StyleTextDesc>
                3. Nếu audio 1 có chứa giọng của 2 người nói, chọn option "Có 2 người nói trong audio 1", tương tự với audio 2.
              </StyleTextDesc>
              <StyleTextDesc>
                4. Nếu cả 2 audio đều chứa giọng của 2 người nói, chọn option "Cả 2 audio có 2 người nói".
              </StyleTextDesc>
              <StyleTextEx>
                Lưu ý: nếu audio không có giọng người nói hoặc có nhiều hơn 2 người nói -> đánh nhãn tương tự như có 2 người nói. 
              </StyleTextEx>
              <StyleTextEx>
                Nếu audio có tiếng cười nhưng không lấn át tiếng nói của người nói chính thì vẫn tính là audio có 1 người nói.
              </StyleTextEx>
            </StyleGuide>
          </Col>
          <Col span={collapsed ? 24 : 16} className="right-content">
            <Row type="flex" justify="center">
              <Col span={collapsed ? 16 : 24}>
                <Row justify="center">
                  <span
                    className="text"
                    style={{
                      fontStyle: 'italic',
                      marginBottom: '10px',
                      fontSize: '25px',
                    }}
                  >
                    {processTask.numberOfCompletedAudio /
                      processTask.totalAmountOfAudio ===
                    0.5
                      ? `Làm tốt lắm, bạn đã hoàn thành được 50%, cố lên!`
                      : processTask.numberOfCompletedAudio >=
                        processTask.totalAmountOfAudio - 1
                      ? `Câu cuối cùng!`
                      : processTask.numberOfCompletedAudio === 0
                      ? 'Bắt đầu nào'
                      : `Bạn đã hoàn thành ${processTask.numberOfCompletedAudio} / ${processTask.totalAmountOfAudio} câu`}
                  </span>
                </Row>
                <Row type="flex" justify="start" align="middle">
                  <Col span={24}>
                    <h5>Audio 1</h5>
                    <div className="controls box-shadow">
                      {currentAudio && (
                        <video controls style={{ width: '100%' }} ref={audio}>
                          <source
                            src={`${currentAudio.link}`}
                          />
                          {/* <track kind="captions" /> */}
                        </video>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" style={{ marginTop: '10px', width: '100%' }}>
                  <Col span={24}>
                    <h5>Audio 2</h5>
                    <div className="controls box-shadow">
                      {currentAudio2 && (
                        <video controls style={{ width: '100%' }} ref={audio2}>
                          <source
                            src={`${currentAudio2.link}`}
                          />
                          {/* <track kind="captions" /> */}
                        </video>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px', width: '100%' }}>
                  <div
                    className="box-shadow"
                    style={{ width: '100%', borderRadius: '5px' }}
                  >
                    <div
                      style={{
                        paddingTop: '7px',
                        background: '#fff',
                        borderRadius: '5px',
                        height: '140px',
                      }}
                    >
                      <Col className="content">
                        <List
                          itemLayout="horizontal"
                          dataSource={transcripts}
                          renderItem={transcript => (
                            <List.Item
                              className={
                                transcript.content ===
                                  removeRedundantCharacter(
                                    transcriptInputText,
                                  ) && 'ant-item-list'
                              }
                            >
                              <div className="text">{transcript.content}</div>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <div className="number-of-votes">
                                  {/* <CopyOutlined
                                    className="icon-btn"
                                    onClick={() => {
                                      setTranscriptInputText(
                                        transcript.content,
                                      );
                                    }}
                                  /> */}
                                  <LikeOutlined
                                    className="icon-btn"
                                    onClick={() =>
                                      voteHandler(transcript.teamId)
                                    }
                                  />
                                  <div style={{}}>
                                    {transcript.numberOfVotes}
                                  </div>
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </Col>
                    </div>
                    <Row
                      className="input-container"
                      type="flex"
                      justify="space-between"
                      style={{ padding: '10px', margin: '10px'}}
                    >
                      {/* <TextArea
                        value={transcriptInputText}
                        className="input-text"
                        ref={transcriptInput}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        size="large"
                        placeholder="Nhập nội dung audio"
                        onChange={onChangeTextAreaHandler}
                      /> */}
                      <Radio.Group onChange={radioOnChange} value={sameSpeakerDecision} ref={sameSpeakerInput}>
                        <Space direction="vertical">
                          <Radio value={'Giọng của một người (nam)'}>Giọng của một người (nam)</Radio>
                          <Radio value={'Giọng của một người (nữ)'}>Giọng của một người (nữ)</Radio>
                          <Radio value={'Giọng 2 người khác nhau'}>Giọng 2 người khác nhau</Radio>
                          <Radio value={'Có 2 người nói trong audio 1'}>Có 2 người nói trong audio 1</Radio>
                          <Radio value={'Có 2 người nói trong audio 2'}>Có 2 người nói trong audio 2</Radio>
                          <Radio value={'Cả 2 audio có 2 người nói'}>Cả 2 audio có 2 người nói</Radio>
                        </Space>
                      </Radio.Group>
                      <div
                        className="send-button"
                        onClick={sendTranscriptHandler}
                      >
                      <SendOutlined className="send-icon">Gửi</SendOutlined>
                      </div>
                    </Row>
                  </div>
                </Row>
                <div style={{ flex: 1 }}></div>
              </Col>
            </Row>
          </Col>
          <div className="collapse-left-content">
            <Tooltip
              placement="topLeft"
              title={
                collapsed
                  ? 'Xem hướng dẫn chỉnh sửa nội dung audio'
                  : 'Ẩn hướng dẫn'
              }
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ fontSize: '40px' }}
                  onClick={toggle(false)}
                  width="1.2rem"
                />
              ) : (
                <MenuFoldOutlined
                  style={{ fontSize: '40px' }}
                  onClick={toggle(true)}
                  width="2rem"
                />
              )}
            </Tooltip>
          </div>
        </div>
      </div>
    </StyleDataConstruction>
  );
};

export default DataConstruction;