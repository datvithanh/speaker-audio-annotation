import React, { useState } from 'react';
import Progress from './Progress';
import UploadFileStyle from './index.style';
import axios from 'axios';
import { setAlert } from '../../../../actions/alert';
import { connect } from 'react-redux';
import Alert from '../../../Layout/Alert/Alert';

const UploadFile = ({ setAlert, test }) => {
  const [isUploadSentence, setIsUploadSentence] = useState(false);
  const [file, setFile] = useState({
    sentence: '',
    audio: '',
  });
  const [filename, setFilename] = useState({
    sentence: 'Choose File',
    audio: 'Choose File',
  });
  const [uploadPercentage, setUploadPercentage] = useState({
    sentence: 0,
    audio: 0,
  });

  const onChangeSentence = e => {
    setFile({ ...file, sentence: e.target.files[0] });
    setFilename({ ...filename, sentence: e.target.files[0].name });
  };

  const onSubMitSentence = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sentence', file.sentence);
    formData.append('test', JSON.stringify(test));
    
    try {
      const res = await axios.post('/api/admin/upload-sentence', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage({
            ...uploadPercentage,
            sentence: parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            ),
          });
          // Clear percentage
          // setTimeout(
          //   () =>
          //     setUploadPercentage({
          //       ...uploadPercentage,
          //       sentence: 0,
          //     }),
          //   1000,
          // );
          setTimeout(() => {
            setIsUploadSentence(true);
          }, 1500)
        },
      });
      if (res.data.status === 1) {
        setAlert('Upload succesfully', 'danger', 1000);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setAlert('There was a problem with the server', 'danger');
      } else {
        setAlert(error.response.data.msg, 'danger');
      }
    }
  };

  const onSubMitAudio = e => {};

  return (
    <UploadFileStyle>
      <div className="container">
        <h4 className="display-4 sentence-center mb-4">Upload Sentence</h4>
        <form onSubmit={onSubMitSentence}>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              htmlFor="customFile"
              onChange={onChangeSentence}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename.sentence}
            </label>
            <Progress percentage={uploadPercentage.sentence} />
          </div>
          <input
            type="submit"
            value="Upload"
            className="btn btn btn-success btn-block mt-4"
          />
        </form>
      </div>
      {isUploadSentence ? (
        <div className="container">
          <h4 className="display-4 sentence-center mb-4">Upload Audio</h4>
          <form onSubmit={onSubMitAudio}>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                htmlFor="customFile"
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename.audio}
              </label>
              <Progress percentage={uploadPercentage.audio} />
            </div>
            <input
              type="submit"
              value="Upload"
              className="btn btn btn-success btn-block mt-4"
            />
          </form>
        </div>
      ) : null}
    </UploadFileStyle>
  );
};

const mapStateToProps = state => {
  return {
    test: state.admin.test,
  }
}

export default connect(
  mapStateToProps,
  { setAlert },
)(UploadFile);
