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
        `Kh??ng kh???p s??? l?????ng voices. H??y nh???p ????ng ${numberOfVoices} voices`,
      );
    } else if (parseInt(numberOfSentences) % parseInt(minSentences) !== 0) {
      toast.error(`S??? c??u ph???i chia h???t cho s??? c??u t???i thi???u 1 ng?????i nghe`);
    } else if (
      (parseInt(numberOfSentences) / parseInt(minSentences)) *
        parseInt(minPeopleListenAudio) >
      users.filter(user => user.role !== 1 && user.type === false).length
    ) {
      toast.error(
        `B??i test c???n ${(parseInt(numberOfSentences) / parseInt(minSentences)) *
          parseInt(
            minPeopleListenAudio,
          )} s??? ng?????i. V?????t qu?? s??? l?????ng user trong h??? th???ng: ${
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
        <h1 className="fas fa-user large"> T???o b??i test</h1>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="container">
            <div className="column1">
              <div className="form-group">
                <h6>Ch???n lo???i b??i test</h6>
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
                  <option value="1">????nh gi?? gi???ng n??i</option>
                  <option value="2">Ki???m tra ?? ?????nh</option>
                  <option value="3">G?? n???i dung audio</option>
                </select>
              </div>
              <div className="form-group">
                <h6>Nh???p t??n b??i test</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="name"
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nh???p s??? l?????ng voices</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="numberOfVoices"
                  value={numberOfVoices}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nh???p t??n c??c voice c??ch nhau b???i d???u ","</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  placeholder="VD: M???nh, Nam, H??ng"
                  name="voices"
                  value={voices}
                  onChange={e => onChangeVoices(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nh???p s??? c??u c???a b??i test</h6>
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
                <h6>Nh???p s??? c??u c???a m???t gi???ng m???t ng?????i ph???i nghe</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="minSentences"
                  value={minSentences}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Nh???p s??? ng?????i t???i thi???u ph???i nghe 1 audio</h6>
                <input
                  type="text"
                  style={{ fontStyle: 'italic' }}
                  name="minPeopleListenAudio"
                  value={minPeopleListenAudio}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Ch???n ch??? ?????nh truy c???p</h6>
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
                <h6>Ng??y b???t ?????u (th??ng/ng??y/n??m)</h6>
                <input
                  type="date"
                  name="dateOpened"
                  value={dateOpened}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <h6>Ng??y k???t th??c (th??ng/ng??y/n??m)</h6>
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
              value="X??c nh???n v?? chuy???n sang b?????c ti???p theo"
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
