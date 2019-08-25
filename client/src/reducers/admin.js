import {
  GET_LIST_USERS,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  ADD_TEST_FAILED,
  ADD_TEST_SUCCESS,
  SET_STEP_CREATE_TEST,
  SET_DIRECTORY_SENTENCES_PATH,
  SET_DIRECTORY_AUDIO_PATH,
  ADD_USER_AND_FILEUPLOAD_SUCCESS,
  ADD_USER_USER_AND_FILEUPLOAD_FAILED,
  RESET_TEST,
  SET_USER_CHOSEN,
  GET_LIST_TEST,
  GET_TEST_BY_ID,
  GET_AUDIO_BY_TEST_AND_VOICE,
} from '../actions/types';

const initialState = {
  loading: true,
  users: [],
  tests: [],
  test: null,
  sentencePath: null,
  audioPath: null,
  stepCreateTest: 'step1',
  userChosen: [],
  testDetail: null,
  audios: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIST_USERS:
      return {
        ...state,
        loading: false,
        users: payload.users,
      };
    case ADD_USER_SUCCESS:
    case ADD_USER_FAILED:
    case ADD_TEST_FAILED:
    case ADD_USER_USER_AND_FILEUPLOAD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ADD_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: payload.test,
      };
    case SET_STEP_CREATE_TEST:
      return {
        ...state,
        stepCreateTest: payload,
      };
    case RESET_TEST:
      return {
        ...state,
        test: null,
      };
    case SET_DIRECTORY_SENTENCES_PATH:
      return {
        ...state,
        sentencePath: payload,
      };
    case SET_DIRECTORY_AUDIO_PATH:
      return {
        ...state,
        audioPath: payload,
      };
    case ADD_USER_AND_FILEUPLOAD_SUCCESS:
      return {
        ...state,
        test: payload.test,
      };
    case SET_USER_CHOSEN:
      return {
        ...state,
        userChosen: payload,
      };
    case GET_LIST_TEST:
      return {
        ...state,
        tests: payload.tests,
      };
    case GET_TEST_BY_ID:
      return {
        ...state,
        testDetail: payload.test,
      };
    case GET_AUDIO_BY_TEST_AND_VOICE: 
      return {
        ...state,
        audios: payload.audios,
      }
    default:
      return state;
  }
}
