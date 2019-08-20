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
} from '../actions/types';

const initialState = {
  // token: localStorage.getItem('token'),
  // isAuthenticated: null,
  loading: true,
  users: [],
  test: null,
  sentencePath: null,
  audioPath: null,
  stepCreateTest: 'step1',
  userChosen: [],
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
      }
    case SET_USER_CHOSEN:
      return {
        ...state,
        userChosen: payload,
      }
    default:
      return state;
  }
}
