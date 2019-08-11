import React, { useState } from 'react';
import { connect } from 'react-redux';
import Alert from '../../../components/Layout/Alert/Alert';
import CreateTestStyle from './index.style';
import { setAlert } from '../../../actions/alert';
import { addTest } from '../../../actions/admin';

const CreateTest = ({ setAlert, addTest }) => {
  const [formData, setFormData] = useState({
    name: '',
    numberOfVoices: '',
    voices: '',
    numberOfSentences: '',
    accessModifier: 'Private',
    dateOpened: '',
    dateClosed: '',
  });

  const {
    name,
    numberOfVoices,
    voices,
    numberOfSentences,
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
      console.log(formData);
      // addTest({
      //   name,
      //   numberOfVoices,
      //   voices,
      //   numberOfSentences,
      //   accessModifier,
      //   dateOpened,
      //   dateClosed,
      // });
      // setAlert('Thêm thành công', 'danger', 2000);
    }
  };

  return (
    <CreateTestStyle>
      <Alert />
      <h1 className="fas fa-user large text-primary"> Tạo bài test</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <h4>Nhập tên bài test</h4>
          <input
            type="text"
            style={{ fontStyle: 'italic' }}
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Nhập số lượng voices</h4>
          <input
            type="text"
            style={{ fontStyle: 'italic' }}
            name="numberOfVoices"
            value={numberOfVoices}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Nhập tên các voice cách nhau bởi dấu ","</h4>
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
          <h4>Nhập số câu của bài test</h4>
          <input
            type="text"
            style={{ fontStyle: 'italic' }}
            name="numberOfSentences"
            value={numberOfSentences}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Chọn chỉ định truy cập</h4>
          <select
            style={{
              fontStyle: 'italic',
              height: '48px',
              backgroundColor: 'white',
            }}
            onChange={e => onChangeAccessModifier(e)}
          >
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
          {/* <input
            type="text"
            name="accessModifier"
            value={accessModifier}
            onChange={e => onChange(e)}
          /> */}
        </div>
        <div className="form-group">
          <h4>Ngày mở</h4>
          <input
            type="date"
            name="dateOpened"
            value={dateOpened}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>Ngày hết hạn</h4>
          <input
            type="date"
            name="dateClosed"
            value={dateClosed}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary"
            value="Thêm bài test"
          />
        </div>
      </form>
    </CreateTestStyle>
  );
};

export default connect(
  null,
  { setAlert, addTest },
)(CreateTest);
