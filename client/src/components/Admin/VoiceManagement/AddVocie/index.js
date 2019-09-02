import React, { useState } from 'react';
import { connect } from 'react-redux';
import Alert from '../../../Layout/Alert/Alert';
import { addVoice } from '../../../../actions/admin';
import AddVoiceStyle from './index.style';
import { setAlert } from '../../../../actions/alert';

const AddVoice = ({ addVoice, setAlert }) => {
  const [formData, setFormData] = useState({
    voiceId: '',
    voiceName: '',
  });

  const { voiceId, voiceName } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //[] to tell this refer to dynamic key name
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (voiceId === '') {
      setAlert('Mã voice không được bỏ trống', 'danger', 1000);
    } else if (voiceName === '') {
      setAlert('Tên voice không được bỏ trống', 'danger', 1000);
    } else {
      addVoice(voiceId, voiceName);
    }
  };

  return (
    <AddVoiceStyle>
      <Alert />
      <h1 className="fas fa-user large"> Thêm Voice</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Mã voice"
            name="voiceId"
            value={voiceId}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên voice"
            name="voiceName"
            value={voiceName}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group">
          <input type="submit" className="btn btn-primary" value="Thêm Voice" />
        </div>
      </form>
    </AddVoiceStyle>
  );
};

export default connect(
  null,
  { addVoice, setAlert },
)(AddVoice);
