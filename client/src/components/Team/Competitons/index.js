import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input } from 'antd';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import CompetitionsStyle from './index.style';
import {
  getListCompetition,
  joinCompetition,
  getTaskProcess,
  getRandomizeAudio,
} from '../../../actions/team';

import axios from 'axios';
import { isUrl } from '../../../utils/validation';
import { toast } from 'react-toastify';
const { TextArea } = Input;

const Competitions = ({
  getListCompetition,
  joinCompetition,
  competitions,
  history,
}) => {
  const [resource, setResource] = useState();
  const [submission, setSubmission] = useState();
  const [submissions, setSubmissions] = useState([]);
  const dispatch = useDispatch();
  const [formSubmitApi, setFormSubmitApi] = useState({
    linkApi: '',
    description: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getListCompetition();
    getResource();
    getSubmissions();
  }, [getListCompetition]);

  const getSubmissions = async () => {
    await axios
      .get(process.env.REACT_APP_API_DOMAIN + `/api/teams/submissions`)
      .then(res => {
        setSubmissions(res.data.results.submissions);
      });
  };

  const joinCompetitionHandler = (competitionId, status) => {
    status === 'join' && joinCompetition(competitionId);
    history.push(`/team/competitions/${competitionId}`);
    dispatch(getTaskProcess(competitionId));
    dispatch(getRandomizeAudio(competitionId));
  };

  const getResource = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN + `/api/teams/get-resource`,
    );

    if (res && res.data) {
      setResource(res.data.results.file);
    }
  };

  const submitApi = async (linkApi, description, submissionId) => {
    const body = { linkApi, description, submissionId };
    const config = {
      'Content-Type': 'application/json',
    };
    const res = await axios.post(
      process.env.REACT_APP_API_DOMAIN + `/api/teams/submit-api`,
      body,
      config,
    );

    setSubmission(res.data.results.submission);

    const { submission } = res.data.results;

    const index = submissions.findIndex(sub => sub._id === submission._id);
    submissions[index].submitted = submission.submitted;

    setSubmissions(
      [...submissions],
      // submissions.map(sub => {
      //   if (sub._id === submission._id) {
      //     console.log('chay vao day');
      //     return { ...sub, submitted: submission.submitted };
      //   }
      //   return sub;
      // }),
    );
  };

  const getInfoApi = async submissionId => {
    const res = await axios.get(
      process.env.REACT_APP_API_DOMAIN +
        `/api/teams/get-submit-api-info/${submissionId}`,
    );

    if (res.data.status === 1) {
      const { linkApi, description } = res.data.results;

      setFormSubmitApi({ ...formSubmitApi, linkApi, description });
    }
  };

  const modifyApi = async (linkApi, description, submissionId) => {
    const body = { linkApi, description, submissionId };
    const config = {
      'Content-Type': 'application/json',
    };
    const res = await axios.patch(
      process.env.REACT_APP_API_DOMAIN + `/api/teams/modify-api`,
      body,
      config,
    );

    setSubmission(res.data.results.submission);

    const { submission } = res.data.results;

    const index = submissions.findIndex(sub => sub._id === submission._id);
    submissions[index].submitted = submission.submitted;

    setSubmissions(
      [...submissions],
      // submissions.map(sub => {
      //   if (sub._id === submission._id) {
      //     console.log('chay vao day');
      //     return { ...sub, submitted: submission.submitted };
      //   }
      //   return sub;
      // }),
    );
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = e => {
    // if (!isUrl(formSubmitApi.linkApi)) {
    //   toast.error('Link nhập không hợp lệ');
    //   setModalVisible(false);
    //   return;
    // }
    if (!submission.submitted) {
      submitApi(
        formSubmitApi.linkApi,
        formSubmitApi.description,
        submission._id,
      );
    } else {
      modifyApi(
        formSubmitApi.linkApi,
        formSubmitApi.description,
        submission._id,
      );
    }

    // getSubmissions();
    // const index = submissions.findIndex(sub => sub._id === submission._id);
    // submissions[index].submitted = submission.submitted;

    // setSubmissions(
    //   [...submissions]
    //   // submissions.map(sub => {
    //   //   if (sub._id === submission._id) {
    //   //     console.log('chay vao day');
    //   //     return { ...sub, submitted: submission.submitted };
    //   //   }
    //   //   return sub;
    //   // }),
    // );
    setModalVisible(false);
    // setAudios(
    //   audios.map(audio => {
    //     if (audiosChosenIds.includes(audio._id)) return { ...audio, label };
    //     return audio;
    //   }),
    // );
  };

  const handleCancel = e => {
    setModalVisible(false);
  };

  const displayFormSubmit = submission => {
    const currentDate = new Date();
    if (new Date(submission.timeExpired) < currentDate) {
      toast.error('Đã hết hạn nộp bài!');
      return;
    }
    showModal();
    setSubmission(submission);
    if (submission.submitted === true) {
      getInfoApi(submission._id);
    }
  };

  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'submitted',
      align: 'center',
      render: submitted => (submitted ? 'Đã hoàn thành' : 'Chưa hoàn thành'),
    },
    {
      title: 'Deadline',
      dataIndex: 'timeExpired',
      align: 'center',
      render: dateString => {
        const date = new Date(dateString);
        date.setHours(date.getHours() - 7);

        return (
          <span style={{ textAlign: 'center', display: 'block' }}>
            {moment(date).add(7, 'hours').format('HH:mm DD-MM-YYYY')}
          </span>
        );
      },
    },
    {
      key: 'action',
      width: 200,
      render: submission => {
        return submission.submitted ? (
          <Button
            style={{
              margin: '0 auto',
              display: 'block',
              backgroundColor: '#0b6398',
            }}
            type="primary"
            onClick={() => displayFormSubmit(submission)}
          >
            Sửa thông tin
          </Button>
        ) : (
          <Button
            style={{
              margin: '0 auto',
              display: 'block',
              backgroundColor: '#0b6398',
            }}
            type="primary"
            onClick={() => displayFormSubmit(submission)}
          >
            Thực hiện
          </Button>
        );
      },
    },
  ];

  // const columns = [
  //   {
  //     // title: 'Tên cuộc thi',
  //     dataIndex: 'name',
  //     width: '50%',
  //     render: name => name.toUpperCase(),
  //   },
  //   {
  //     // title: 'Ngày bắt đầu',
  //     dataIndex: 'createdAt',
  //     align: 'center',
  //     render: dateString => {
  //       const date = new Date(dateString);
  //       return (
  //         <span style={{ textAlign: 'center', display: 'block' }}>
  //           {date.getDate() +
  //             ' - ' +
  //             (date.getMonth() + 1) +
  //             ' - ' +
  //             date.getFullYear()}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     title: 'Ngày kết thúc',
  //     dataIndex: 'timeExpired',
  //     key: 'timeExpired',
  //     align: 'center',
  //     width: 200,
  //     render: dateString => {
  //       const date = new Date(dateString);
  //       return (
  //         <span>
  //           {date.getDate() -
  //             1 +
  //             ' - ' +
  //             (date.getMonth() + 1) +
  //             ' - ' +
  //             date.getFullYear()}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: 'action',
  //     width: 200,
  //     render: competition => {
  //       return competition.numberOfCompletedAudio === undefined ? (
  //         <Button
  //           style={{
  //             margin: '0 auto',
  //             display: 'block',
  //             backgroundColor: '#0b6398',
  //           }}
  //           type="primary"
  //           onClick={() => joinCompetitionHandler(competition._id, 'join')}
  //         >
  //           Tham gia
  //         </Button>
  //       ) : competition.numberOfCompletedAudio &&
  //         competition.numberOfCompletedAudio >=
  //           competition.rules.numberOfAudiosPerListener ? (
  //         <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
  //           Đã hoàn thành
  //         </div>
  //       ) : (
  //         <Button
  //           style={{
  //             margin: '0 auto',
  //             display: 'block',
  //             backgroundColor: '#0b6398',
  //           }}
  //           type="primary"
  //           onClick={() => joinCompetitionHandler(competition._id, 'joined')}
  //         >
  //           Thực hiện tiếp
  //         </Button>
  //       );
  //     },
  //   },
  // ];

  // // DEMO
  const columnsFile = [
    {
      title: 'FileName',
      dataIndex: 'fileName',
      width: '50%',
      render: name => 'Dữ liệu huấn luyện cho cuộc thi VLSP TTS 2020',
    },
    {
      title: 'Link Download',
      dataIndex: 'link',
      align: 'center',
      render: link => {
        return (
          <Button
            style={{ color: 'white', backgroundColor: '#0f6398' }}
            href={`${process.env.REACT_APP_API_DOMAIN}/${link}`}
          >
            Download
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <CompetitionsStyle>
        <h4>Công việc cần hoàn thành</h4>
        <Table
          columns={columns}
          rowKey="_id"
          bordered
          className="table"
          dataSource={submissions}
          pagination={{ pageSize: 6 }}
        />
      </CompetitionsStyle>

      <CompetitionsStyle>
        <h4>Tài nguyên được chia sẻ</h4>
        <Table
          columns={columnsFile}
          rowKey="_id"
          bordered
          className="table"
          dataSource={resource}
          pagination={{ pageSize: 6 }}
        />
      </CompetitionsStyle>
      <Modal
        title="Nộp link API"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Link API"
          type="url"
          onChange={e =>
            setFormSubmitApi({ ...formSubmitApi, linkApi: e.target.value })
          }
          value={formSubmitApi.linkApi}
          style={{ marginBottom: '12px' }}
        />
        <TextArea
          placeholder="Mô tả"
          onChange={e =>
            setFormSubmitApi({ ...formSubmitApi, description: e.target.value })
          }
          rows={4}
          value={formSubmitApi.description}
        />

        <div style={{ marginTop: '10px' }}>
          Hoặc submit kết quả tại Google Form:{' '}
          <a
            href="https://forms.gle/KcXKuLJDiQgb8t5K8"
            style={{ textDecoration: 'underline' }}
            target="blank"
          >
            https://forms.gle/KcXKuLJDiQgb8t5K8
          </a>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = state => {
  return {
    competitions: state.team.competitions,
  };
};

export default connect(
  mapStateToProps,
  { getListCompetition, joinCompetition },
)(Competitions);
