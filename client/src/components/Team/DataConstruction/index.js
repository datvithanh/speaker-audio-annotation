import React, { useEffect, useRef, useState } from 'react';
import { Row, List, Col, Input, Tooltip } from 'antd';
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

const DataConstruction = ({ match, history }) => {
  const [transcriptInputText, setTranscriptInputText] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const transcriptInput = useRef();
  const {
    currentAudio,
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
    transcriptInput.current.focus();
    dispatch(getCompetitionById(match.params.competitionId));
    dispatch(getTaskProcess(match.params.competitionId));
    dispatch(getRandomizeAudio(match.params.competitionId));
  }, [completed, dispatch, history, match.params.competitionId]);

  useEffect(() => {
    onTrackChange(currentAudio);
  }, [currentAudio]);

  const audio = useRef();
  const toggle = value => () => {
    setCollapsed(value);
  };
  const sendTranscriptHandler = () => {
    transcriptInput.current.focus();
    setTranscriptInputText('');
    dispatch(
      typing(removeRedundantCharacter(transcriptInputText), currentAudio._id),
    );
  };

  const voteHandler = teamId => {
    transcriptInput.current.focus();
    setTranscriptInputText('');
    dispatch(voting(teamId, currentAudio._id));
  };

  const onTrackChange = src => {
    if (src != null) {
      audio.current.pause();
      audio.current.load();
    }
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
                Hướng dẫn chỉnh sửa nội dung audio
              </StyleTextTitle>
              <StyleTextDesc>
                1. Số, ngày tháng, giờ được viết dạng chữ số
              </StyleTextDesc>
              <StyleTextEx>
                VD: mười lăm &rarr; 15, ngày hai mươi tháng ba &rarr; ngày 20/3
              </StyleTextEx>
              <StyleTextDesc>
                2. Từ nước ngoài được viết theo từ gốc
              </StyleTextDesc>
              <StyleTextEx>
                VD: Hemingway, Jordan (xem danh sách các từ tham khảo{' '}
                <a
                  href={`${process.env.REACT_APP_API_DOMAIN}/List-Foreign-Dictionary.xlsx`}
                  className="link-foreign-dictionary"
                >
                  tại đây
                </a>
                )
              </StyleTextEx>
              <StyleTextDesc>
                3. Các loại khác được viết về dạng nguyên bản
              </StyleTextDesc>
              <StyleTextEx>VD: xen-ti-mét &rarr; cm</StyleTextEx>
              <StyleTextDesc>
                4. Các trường hợp khó tìm dạng nguyên bản có thể viết dạng phiên
                âm tiếng Việt
              </StyleTextDesc>
              <StyleTextEx>VD: phát-xít, xi-măng</StyleTextEx>
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
                    <div className="controls box-shadow">
                      {currentAudio && (
                        <audio controls style={{ width: '100%' }} ref={audio}>
                          <source
                            src={`${process.env.REACT_APP_API_DOMAIN}${currentAudio.link}`}
                          />
                          {/* <track kind="captions" /> */}
                        </audio>
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
                                  <CopyOutlined
                                    className="icon-btn"
                                    onClick={() => {
                                      setTranscriptInputText(
                                        transcript.content,
                                      );
                                    }}
                                  />
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
                    >
                      <TextArea
                        value={transcriptInputText}
                        className="input-text"
                        ref={transcriptInput}
                        autoSize={{ minRows: 1, maxRows: 4 }}
                        size="large"
                        placeholder="Nhập nội dung audio"
                        onChange={onChangeTextAreaHandler}
                      />
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
