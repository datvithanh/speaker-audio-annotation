import React, { useState } from 'react';
import { connect } from 'react-redux';
import Alert from '../../../components/Layout/Alert/Alert';
import CreateTestStyle from './index.style';
import { setAlert } from '../../../actions/alert';
import { addTest, setStepCreateTest } from '../../../actions/admin';
import UploadFile from './UploadFile';
import UserChoosen from './UserChoosen';
import AlertSuccess from './AlertSuccess';

const CreateTest = ({
  setAlert,
  addTest,
  stepCreateTest,
  setStepCreateTest,
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
    name: 'Test1',
    numberOfVoices: 4,
    voices: ['FIN', 'INI', 'NA1', 'NA2'],
    numberOfSentences: 40, // n
    minSentences: 20, // a
    minPeopleListenAudio: 3, // b
    accessModifier: 'Private',
    dateOpened: '2019-07-05',
    dateClosed: '2019-09-09',
  });

  const {
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

  const onSubmit = e => {
    e.preventDefault();
    if (voices.length !== parseInt(numberOfVoices, 10)) {
      setAlert(
        `Không khớp số lượng voices. Hãy nhập đúng ${numberOfVoices} voices`,
        'danger',
        3000,
      );
    } else {
      addTest({
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
        <Alert />
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="container">
            <div className="column1">
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
              <div className="form-group">
                <h6>
                  Nhập số câu của một giọng mà bạn muốn một người phải nghe
                </h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="minSentences"
                  value={minSentences}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="column2">
              <div className="form-group">
                <h6>Nhập số người tối thiểu phải nghe 1 audio</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="minPeople"
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
                    height: '40px',
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
                <h6>Ngày mở</h6>
                <input
                  type="date"
                  name="dateOpened"
                  value={dateOpened}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Ngày hết hạn</h6>
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
  };
};

export default connect(
  mapStateToProps,
  { setAlert, addTest, setStepCreateTest },
)(CreateTest);
