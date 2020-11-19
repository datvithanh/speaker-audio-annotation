import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Col, Row, Select, Table, Input, Button, Modal, Spin } from 'antd';
import DataInCompetitionStyle from './index.style';
import {
  DownloadOutlined,
  SoundOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import queryString from 'querystring';
const { Option } = Select;
const { Search } = Input;

const DataInCompetition = ({ match }) => {
  const [audios, setAudios] = useState([]);
  const [audioIdsChosen, setAudioIdsChosen] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(1);
  const [hideSelectLabel, setHideSelect] = useState(false);

  const [keywordSearch, setKeywordSearch] = useState('');
  const [labelSearch, setLabelSearch] = useState('all');
  const [lengthAudio, setLengthAudio] = useState({
    minLength: 0,
    maxLength: 5000,
  });
  const [lengthText, setLengthText] = useState({
    minLength: 0,
    maxLength: 5000,
  });

  const [assignLabelType, setAssignLabelType] = useState('');
  const [visibileModal, setVisibleModal] = useState(false);
  const [linkData, setLinkData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioRef = useRef(null);
  const [disableButtonAssign, setDisableButtonAssign] = useState(false);

  const columns = [
    {
      title: 'Nội dung audio',
      dataIndex: 'rawOriginContent',
      key: 'rawOriginContent',
      className: 'column',
      width: '600px',
      render: data => (
        <span
          style={{
            textAlign: 'justify',
            display: 'flex',
            alignItems: 'flex-end',
            maxWidth: '600px',
          }}
        >
          {data}
        </span>
      ),
    },
    {
      title: 'Nghe audio',
      dataIndex: 'link',
      key: 'link',
      className: 'column',
      width: '100px',
      align: 'center',
      render: link => (
        <span
          style={{
            textAlign: 'center',
            display: 'block',
            cursor: 'pointer',
          }}
        >
          <SoundOutlined
            onClick={() => onClickIconAudioHanler(link)}
            theme="filled"
          />
        </span>
      ),
    },
    {
      title: 'Lượt tương tác',
      dataIndex: 'numberOfEditors',
      key: 'numberOfEditors',
      className: 'column',
      align: 'center',
      width: '100px',
    },
    {
      title: 'Nhãn',
      dataIndex: 'label',
      key: 'label',
      align: 'center',
      width: '100px',
    },
  ];

  const showModal = () => {
    setVisibleModal(true);
  };

  const handleOk = e => {
    setVisibleModal(false);
  };

  const handleCancel = e => {
    setVisibleModal(false);
  };

  const onClickIconAudioHanler = link => {
    audioRef.current.src = process.env.REACT_APP_API_DOMAIN + link;
    audioRef.current.play();
  };

  const setLabelForAudios = async (audiosChosenIds, label) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { label, audios: audiosChosenIds };

    const res = await axios.patch(
      process.env.REACT_APP_API_DOMAIN + `/api/admin/assign-label-for-audio`,
      body,
      config,
    );

    if (res.data.status === 1) {
      setAudios(
        audios.map(audio => {
          if (audiosChosenIds.includes(audio._id)) return { ...audio, label };
          return audio;
        }),
      );
    }
  };

  const setLabelForSearchedAudios = async labelAssigned => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      textLengthFrom: lengthText.minLength,
      textLengthTo: lengthText.maxLength,
      sizeFrom: lengthAudio.minLength,
      sizeTo: lengthAudio.maxLength,
      keyword: keywordSearch,
      competitionId: match.params.competitionId,
      label: labelSearch,
      labelAssigned,
    };

    const res = await axios.patch(
      process.env.REACT_APP_API_DOMAIN +
        `/api/admin/assign-label-for-searched-audio`,
      body,
      config,
    );

    if (res.data.status === 1) {
      let assignedAudios = [];
      if (labelSearch !== 'all') {
        assignedAudios = audios.filter(
          audio =>
            audio.textLength >= lengthText.minLength &&
            audio.textLength <= lengthText.maxLength &&
            audio.sizeInKilobytes >= lengthAudio.minLength &&
            audio.sizeInKilobytes <= lengthAudio.maxLength &&
            labelSearch !== 'all' &&
            audio.label === labelSearch &&
            audio.rawOriginContent
              .toUpperCase()
              .includes(keywordSearch.toUpperCase()),
        );
      } else {
        assignedAudios = audios.filter(
          audio =>
            audio.textLength >= lengthText.minLength &&
            audio.textLength <= lengthText.maxLength &&
            audio.sizeInKilobytes >= lengthAudio.minLength &&
            audio.sizeInKilobytes <= lengthAudio.maxLength &&
            audio.rawOriginContent
              .toUpperCase()
              .includes(keywordSearch.toUpperCase()),
        );
      }
      setAudios(
        assignedAudios.map(assignedAudio => {
          return { ...assignedAudio, label: labelAssigned };
        }),
      );
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowKeys.length !== 0) {
        setHideSelect(true);
        setAssignLabelType('hand-select');
        setDisableButtonAssign(true);
      } else {
        setHideSelect(false);
        setDisableButtonAssign(false);
      }
      setAudioIdsChosen(selectedRowKeys);
    },
  };

  const handlePagination = pagination => {
    const { pageSize, current } = pagination;
    setLimit(pageSize);
    setPage(current);
  };

  const handleChangeSelectLabel = label => {
    if (assignLabelType === 'hand-select') {
      setLabelForAudios(audioIdsChosen, label);
    }

    if (assignLabelType === 'series') {
      setLabelForSearchedAudios(label);
    }

    // getAudiosByCompetitionId(match.params.competitionId);
  };

  const handleChangeSelectLabelSearch = label => {
    const { minLength: minLengthSize, maxLength: maxLengthSize } = lengthAudio;
    const { minLength: minLengthText, maxLength: maxLengthText } = lengthText;

    searchApi(
      keywordSearch,
      label,
      minLengthSize,
      maxLengthSize,
      minLengthText,
      maxLengthText,
    );
    setLabelSearch(label);
  };

  async function searchApi(
    keyword,
    labelSearch,
    sizeFrom = 0,
    sizeTo = 5000,
    textLengthFrom = 0,
    textLengthTo = 500,
  ) {
    setLoadingAudio(true);
    if (sizeFrom === '') sizeFrom = 0;
    if (sizeTo === '') sizeTo = 5000;
    if (textLengthFrom === '') textLengthFrom = 0;
    if (textLengthTo === '') textLengthTo = 500;

    const competitionId = match.params.competitionId;
    const searchParams = queryString.stringify({
      competitionId,
      keyword,
      label: labelSearch,
      sizeFrom,
      sizeTo,
      textLengthFrom,
      textLengthTo,
      page,
      limit,
    });

    await axios
      .get(
        process.env.REACT_APP_API_DOMAIN +
          `/api/admin/search-data?${searchParams}`,
      )
      .then(res => {
        setTimeout(() => {
          setLoadingAudio(false);
        }, 500);
        setAudios(res.data.results.audios);
        setPage(res.data.results.currentPage);
        setTotal(res.data.results.total);
      });
  }

  const onSearch = keyword => {
    setKeywordSearch(keyword);
    searchApi(
      keyword,
      labelSearch,
      lengthAudio.minLength,
      lengthAudio.maxLength,
      lengthText.minLength,
      lengthText.maxLength,
    );
  };

  const searchBySize = () => {
    searchApi(
      keywordSearch,
      labelSearch,
      lengthAudio.minLength,
      lengthAudio.maxLength,
      lengthText.minLength,
      lengthText.maxLength,
    );
  };

  const searchByTextLength = () => {
    searchApi(
      keywordSearch,
      labelSearch,
      lengthAudio.minLength,
      lengthAudio.maxLength,
      lengthText.minLength,
      lengthText.maxLength,
    );
  };

  const assignLabelSearchedAudios = () => {
    setHideSelect(true);
    setAssignLabelType('series');
  };

  const shareDataTrain = async () => {
    setLoading(true);
    await axios
      .post(process.env.REACT_APP_API_DOMAIN + `/api/admin/export-data`)
      .then(res => {
        setLoading(false);
        setLinkData(res.data.results.link);
        showModal();
      });
  };

  useEffect(() => {
    const getAudiosByCompetitionId = async competitionId => {
      const searchParams = queryString.stringify({
        competitionId,
        keyword: keywordSearch,
        label: labelSearch,
        sizeFrom: lengthAudio.minLength,
        sizeTo: lengthAudio.maxLength,
        textLengthFrom: lengthText.minLength,
        textLengthTo: lengthText.maxLength,
        page,
        limit,
      });

      setLoadingAudio(true);

      await axios
        .get(
          process.env.REACT_APP_API_DOMAIN +
            `/api/admin/search-data?${searchParams}`,
        )
        .then(res => {
          setLoadingAudio(false);
          setAudios(res.data.results.audios);
          setPage(res.data.results.currentPage);
          setTotal(res.data.results.total);
        });
    };

    getAudiosByCompetitionId(match.params.competitionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.competitionId, page]);

  return (
    <DataInCompetitionStyle>
      <audio className="audio" ref={audioRef} controls>
        <track kind="captions" />
      </audio>
      <Row justify="space-between">
        <Col span={11.5}>
          <Search
            allowClear
            placeholder="Tìm kiếm theo từ khoá"
            onSearch={onSearch}
            enterButton
          />
          <Select
            placeholder="Tìm theo nhãn"
            style={{ width: '100%' }}
            onSelect={handleChangeSelectLabelSearch}
          >
            <Option value="all">Tất cả</Option>
            <Option value="train">Train</Option>
            <Option value="test">Test</Option>
            <Option value="">Chưa có nhãn</Option>
          </Select>
          <Input.Group compact style={{ display: 'flex' }}>
            <Input
              className="site-input-split"
              style={{
                width: 65,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="Từ"
              disabled
            />
            <Input
              style={{ width: 125, textAlign: 'center' }}
              placeholder="Min(428KB)"
              onChange={length =>
                setLengthAudio({
                  ...lengthAudio,
                  minLength: length.target.value,
                })
              }
              type="number"
            />
            <Input
              className="site-input-split"
              style={{
                width: 65,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="Đến"
              disabled
            />
            <Input
              className="site-input-right"
              style={{
                width: 125,
                textAlign: 'center',
              }}
              placeholder="Max(3332KB)"
              type="number"
              onChange={length =>
                setLengthAudio({
                  ...lengthAudio,
                  maxLength: length.target.value,
                })
              }
            />
            <Button style={{ flex: 1 }} type="primary" onClick={searchBySize}>
              Tìm theo kích thước audio
            </Button>
          </Input.Group>

          <Input.Group compact style={{ display: 'flex' }}>
            <Input
              className="site-input-split"
              style={{
                width: 65,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="Từ"
              disabled
            />
            <Input
              style={{ width: 125, textAlign: 'center' }}
              placeholder="Min(10)"
              onChange={length =>
                setLengthText({
                  ...lengthText,
                  minLength: length.target.value,
                })
              }
              type="number"
            />
            <Input
              className="site-input-split"
              style={{
                width: 65,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="Đến"
              disabled
            />
            <Input
              className="site-input-right"
              style={{
                width: 125,
                textAlign: 'center',
              }}
              placeholder="Max(299)"
              onChange={length =>
                setLengthText({
                  ...lengthText,
                  maxLength: length.target.value,
                })
              }
              type="number"
            />
            <Button
              style={{ flex: 1 }}
              type="primary"
              onClick={searchByTextLength}
            >
              Tìm theo kích thước text
            </Button>
          </Input.Group>
        </Col>
        <Col span={6}>
          <Select
            placeholder="Chọn nhãn muốn gán"
            style={{ width: '100%' }}
            onChange={handleChangeSelectLabel}
            disabled={!hideSelectLabel}
          >
            <Option value="train">Train</Option>
            <Option value="test">Test</Option>
            <Option value="">Bỏ nhãn</Option>
          </Select>
          <Button
            onClick={assignLabelSearchedAudios}
            style={{ width: '100%' }}
            type="primary"
            disabled={disableButtonAssign}
          >
            Gán nhãn tất cả các audio được tìm thấy
          </Button>
          <Button
            style={{ width: '100%' }}
            type="primary"
            onClick={shareDataTrain}
            icon={loading ? <SyncOutlined spin /> : <DownloadOutlined />}
          >
            Chia sẻ dữ liệu
          </Button>
        </Col>
      </Row>

      {!loadingAudio ? (
        <Table
          className="table"
          bordered
          rowKey="_id"
          columns={columns}
          rowSelection={{ ...rowSelection }}
          dataSource={audios}
          pagination={{
            current: page,
            pageSize: limit,
            total,
          }}
          onChange={handlePagination}
        />
      ) : (
        <Spin />
      )}
      <Modal
        visible={visibileModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            type="primary"
            onClick={handleOk}
            href={`${process.env.REACT_APP_API_DOMAIN}/${linkData}`}
          >
            Download
          </Button>,
        ]}
      >
        <h6>Chia sẻ dữ liệu thành công</h6>
        <p>Bạn có muốn download dữ liệu?</p>
      </Modal>
    </DataInCompetitionStyle>
  );
};

export default DataInCompetition;
