import React, { useState } from 'react';
import Progress from './Progress';
import UploadFileStyle from './index.style';
import Message from './Message';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  getListUser,
  setStepCreateTest,
  setAudioPath,
} from '../../../../actions/admin';

const UploadFile = ({ test, setStepCreateTest, getListUser, setAudioPath }) => {
  const [file, setFile] = useState({
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
  const [message, setMessage] = useState({
    sentence: '',
    audio: '',
  });

  // const onChangeSentence = e => {
  //   if (e.target.files[0]) {
  //     setFile({ ...file, sentence: e.target.files[0] });
  //     setFilename({ ...filename, sentence: e.target.files[0].name });
  //   }
  // };

  // const onSubmitSentence = async e => {
  //   e.preventDefault();
  //   if (!test) {
  //     return setMessage({
  //       ...message,
  //       sentence: 'Bạn phải tạo bài test trước khi upload',
  //     });
  //   }

  //   if (file.sentence === '') {
  //     return setMessage({
  //       ...message,
  //       sentence: 'Vui lòng chọn file upload',
  //     });
  //   }
  //   const formData = new FormData();
  //   formData.append('sentence', file.sentence);
  //   formData.append('test', JSON.stringify(test));

  //   try {
  //     const res = await axios.post('/api/admin/upload-sentence', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       onUploadProgress: progressEvent => {
  //         setUploadPercentage({
  //           ...uploadPercentage,
  //           sentence: parseInt(
  //             Math.round((progressEvent.loaded * 100) / progressEvent.total),
  //           ),
  //         });
  //       },
  //     });

  //     if (res.data.status === 1) {
  //       setSentencePath(res.data.results.directoryPath);
  //       setMessage({
  //         ...message,
  //         sentence: 'Upload succesfully',
  //       });
  //     } else {
  //       setMessage({ ...message, sentence: res.data.message });
  //     }
  //   } catch (error) {
  //     if (error.response.status === 500) {
  //       setMessage({
  //         ...message,
  //         sentence: 'Có lỗi xảy ra trên server',
  //       });
  //     } else {
  //       setMessage({ ...message, sentence: error.response.data.message });
  //     }
  //   }
  // };

  const onChangeAudio = e => {
    if (e.target.files[0]) {
      setFile({ ...file, audio: e.target.files[0] });
      setFilename({ ...filename, audio: e.target.files[0].name });
    }
  };

  const onSubmitAudio = async e => {
    e.preventDefault();
    if (!test) {
      return setMessage({
        ...message,
        audio: 'Bạn phải tạo bài test trước khi upload',
      });
    }

    if (file.audio === '') {
      return setMessage({
        ...message,
        audio: 'Vui lòng chọn file upload',
      });
    }

    const formData = new FormData();
    formData.append('audio', file.audio);
    formData.append('test', JSON.stringify(test));

    try {
      const res = await axios.post('/api/admin/upload-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage({
            ...uploadPercentage,
            audio: parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            ),
          });
        },
      });

      if (res.data.status === 1) {
        setAudioPath(res.data.results.directoryPath);
        setMessage({
          ...message,
          audio: 'Upload succesfully',
        });
        getListUser();

        setTimeout(() => {
          if (test.accessModifier === 'Private') {
            setStepCreateTest('step3');
          } else {
            setStepCreateTest('step4');
          }
        }, 1000);
      } else {
        setMessage({ ...message, audio: res.data.message });
      }
    } catch (error) {
      if (error.response.status === 500) {
        setMessage({
          ...message,
          audio: 'Có lỗi xảy ra trên server',
        });
      } else {
        setMessage({ ...message, audio: error.response.data.message });
      }
    }
  };

  return (
    <>
      <UploadFileStyle>
        {/* <div className="container">
          <h4 className="display-4 sentence-center mb-4">Upload câu</h4>
          {message.sentence ? <Message msg={message.sentence} /> : null}
          <form onSubmit={onSubmitSentence}>
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
        </div> */}
        {/* {message.sentence === 'Upload succesfully' ? ( */}
          <div className="container">
            <h4 className="display-4 sentence-center mb-4">Upload audio</h4>
            {message.audio ? <Message msg={message.audio} /> : null}
            <form onSubmit={onSubmitAudio}>
              <div className="custom-file mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  htmlFor="customFile"
                  onChange={onChangeAudio}
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
        {/* ) : null} */}
      </UploadFileStyle>
      <i
        style={{
          display: 'block',
          marginTop: '3rem',
          width: '70%',
          margin: '3rem auto',
          textAlign: 'justify',
        }}
        className="text-danger"
      >
        <u>Chú ý:</u>
        <ul>
          <li>- Cần phải tạo bài test trước khi upload.</li>
          <li>- Upload duy nhất 1 file ZIP (file.zip).</li>
          <li>
            - Upload Sentence bên trong file ZIP chỉ có một loại file duy nhất
            là TEXT theo định dạng Mã_câu.txt. VD: 1234.txt Ngoài ra không được
            có thêm bất kì loại file nào khác.
          </li>
          <li>
            - Upload Audio bên trong file ZIP chỉ có một loại file duy nhất là
            WAV theo định dạng Mã_câu-Mã_voice.wav. VD: 1234-voice1.wav. Ngoài
            ra không được có thêm bất kì loại file nào khác.
          </li>
        </ul>
      </i>
    </>
  );
};

const mapStateToProps = state => {
  return {
    test: state.admin.test,
  };
};

export default connect(
  mapStateToProps,
  { setStepCreateTest, getListUser, setAudioPath },
)(UploadFile);
