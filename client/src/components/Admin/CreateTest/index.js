import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CreateTestStyle from './index.style';
import {
  addTest,
  setStepCreateTest,
  getListUser,
} from '../../../actions/admin';
import UploadFile from './UploadFile';
import UserChoosen from './UserChoosen';
import AlertSuccess from './AlertSuccess';
import { toast } from 'react-toastify';

const CreateTest = ({
  addTest,
  stepCreateTest,
  setStepCreateTest,
  getListUser,
  users,
}) => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   numberOfVoices: '',
  //   voices: '',
  //   numberOfSentences: '',
  //   accessModifier: 'Private',
  //   dateOpened: '',
  //   dateClosed: '',
  // });
  const [formData, setFormData] = useState({
    type: '1',
    name: 'Test1',
    numberOfVoices: 3,
    voices: ['FIN', 'INI', 'NA1'],
    numberOfSentences: 4, // n
    minSentences: 2, // a
    minPeopleListenAudio: 3, // b
    accessModifier: 'Public',
    dateOpened: '2020-10-20',
    dateClosed: '2020-12-30',
  });

  useEffect(() => {
    getListUser();
  }, [getListUser]);

  const {
    type,
    name,
    numberOfVoices,
    voices,
    numberOfSentences,
    minSentences,
    minPeopleListenAudio,
    accessModifier,
    dateOpened,
    dateClosed,
  } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //[] to tell this refer to dynamic key name
    });
  };

  const onChangeVoices = e => {
    const voicesString = e.target.value;
    const voicesArray = voicesString.split(',').map(voice => voice.trim());

    setFormData({
      ...formData,
      voices: voicesArray,
    });
  };

  const onChangeAccessModifier = e => {
    setFormData({
      ...formData,
      accessModifier: e.target.value,
    });
  };

  const onChangeTestType = e => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (voices.length !== parseInt(numberOfVoices, 10)) {
      toast.error(
        `Không khớp số lượng voices. Hãy nhập đúng ${numberOfVoices} voices`,
      );
    } else if (parseInt(numberOfSentences) % parseInt(minSentences) !== 0) {
      toast.error(`Số câu phải chia hết cho số câu tối thiểu 1 người nghe`);
    } else if (
      (parseInt(numberOfSentences) / parseInt(minSentences)) *
        parseInt(minPeopleListenAudio) >
      users.filter(user => user.role !== 1 && user.type === false).length
    ) {
      toast.error(
        `Bài test cần ${(parseInt(numberOfSentences) / parseInt(minSentences)) *
          parseInt(
            minPeopleListenAudio,
          )} số người. Vượt quá số lượng user trong hệ thống: ${
          users.filter(user => user.role !== 1 && user.type === false).length
        }`,
      );
    } else {
      addTest({
        type,
        name,
        numberOfVoices,
        voices,
        numberOfSentences,
        minSentences,
        minPeopleListenAudio,
        accessModifier,
        dateOpened,
        dateClosed,
      });
    }
  };

  let content = null;
  if (stepCreateTest === 'step1') {
    content = (
      <CreateTestStyle>
        <h1 className="fas fa-user large"> Tạo bài test</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="container">
            <div className="column1">
              <div className="form-group">
                <h6>Chọn loại bài test</h6>
                <select
                  value={formData.type}
                  style={{
                    fontStyle: 'italic',
                    height: '46px',
                    backgroundColor: 'white',
                    borderRadius: '0px',
                  }}
                  onChange={e => onChangeTestType(e)}
                >
                  <option value="1">Đánh giá giọng nói</option>
                  <option value="2">Kiểm tra ý định</option>
                  <option value="3">Gõ nội dung audio</option>
                </select>
              </div>
              <div className="form-group">
                <h6>Nhập tên bài test</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nhập số lượng voices</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="numberOfVoices"
                  value={numberOfVoices}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nhập tên các voice cách nhau bởi dấu ","</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  placeholder="VD: Mạnh, Nam, Hùng"
                  name="voices"
                  value={voices}
                  onChange={e => onChangeVoices(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nhập số câu của bài test</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="numberOfSentences"
                  value={numberOfSentences}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="column2">
              <div className="form-group">
                <h6>Nhập số câu của một giọng một người phải nghe</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="minSentences"
                  value={minSentences}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nhập số người tối thiểu phải nghe 1 audio</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="minPeopleListenAudio"
                  value={minPeopleListenAudio}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Chọn chỉ định truy cập</h6>
                <select
                  value={formData.accessModifier}
                  style={{
                    fontStyle: 'italic',
                    height: '45px',
                    backgroundColor: 'white',
                    borderRadius: '0px',
                  }}
                  onChange={e => onChangeAccessModifier(e)}
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>
              <div className="form-group">
                <h6>Ngày bắt đầu (tháng/ngày/năm)</h6>
                <input
                  type="date"
                  name="dateOpened"
                  value={dateOpened}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Ngày kết thúc (tháng/ngày/năm)</h6>
                <input
                  type="date"
                  name="dateClosed"
                  value={dateClosed}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Xác nhận và chuyển sang bước tiếp theo"
            />
          </div>
        </form>
      </CreateTestStyle>
    );
  } else if (stepCreateTest === 'step2') {
    content = <UploadFile />;
  } else if (stepCreateTest === 'step3') {
    content = <UserChoosen />;
  } else {
    content = <AlertSuccess />;
  }

  return <>{content}</>;
};

const mapStateToProps = state => {
  return {
    stepCreateTest: state.admin.stepCreateTest,
    users: state.admin.users,
  };
};

export default connect(
  mapStateToProps,
  { addTest, setStepCreateTest, getListUser },
)(CreateTest);
