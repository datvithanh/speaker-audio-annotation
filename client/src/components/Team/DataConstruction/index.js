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
  {label: 'Same speaker', value: 'same'},
  {label: 'Different speakers', value: 'different'},
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
                Data Labeling instruction
              </StyleTextTitle>
              <StyleTextDesc>
                1. If two audio files are of the same speaker, choose the option "Audio files come from one speaker".
              </StyleTextDesc>
              <StyleTextDesc>
                2. if two audio files are of different speakers, choose the option "Audio files come from different speakers".
              </StyleTextDesc>
              <StyleTextDesc>
                3. If Audio 1 contains multiple speakers, choose the option "Audio 1 contains multiple speakers", the same rule is applied to Audio 2.
              </StyleTextDesc>
              <StyleTextDesc>
                4. If both Audio 1 and Audio 2 contain multiple speakers, choose the option "Both audio files contains multiple speakers".
              </StyleTextDesc>
              <StyleTextEx>
                Note: The sound of laughing SHOULD NOT BE considered an utterance of a speaker. If an audio contains no speaker, choose the option of the audio contains multiple speakers. 
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
                      ? `Well done, you have finished 50% of the evaluation, keep it up!`
                      : processTask.numberOfCompletedAudio >=
                        processTask.totalAmountOfAudio - 1
                      ? `The last audio pairs!`
                      : processTask.numberOfCompletedAudio === 0
                      ? 'Start'
                      : `You have completed labeling ${processTask.numberOfCompletedAudio} / ${processTask.totalAmountOfAudio} audio pairs`}
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
                          <Radio value={'Audio files come from one speaker'}>Audio files come from one speaker</Radio>
                          <Radio value={'Audio files come from different speakers'}>Audio files come from different speakers</Radio>
                          <Radio value={'Audio 1 contains multiple speakers'}>Audio 1 contains multiple speakers</Radio>
                          <Radio value={'Audio 2 contains multiple speakers'}>Audio 2 contains multiple speakers</Radio>
                          <Radio value={'Both audio files contains multiple speakers'}>Both audio files contains multiple speakers</Radio>
                        </Space>
                      </Radio.Group>
                      <div
                        className="send-button"
                        onClick={sendTranscriptHandler}
                      >
                      <SendOutlined className="send-icon">Submit</SendOutlined>
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
                  ? 'View audio edit instructions'
                  : 'Hide instructions'
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