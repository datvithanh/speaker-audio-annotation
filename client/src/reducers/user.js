import {
  GET_PUBLIC_TEST_SUCCESS,
  GET_PRIVATE_TEST_SUCCESS,
  SET_TEST_CURRENTLY,
  GET_AUDIO_FOR_USER,
  SET_POINT_FOR_AUDIO,
  UPDATE_REAL_USER_FOR_AUDIO,
  GET_ALL_AUDIO_BY_TEST_ID,
  INCREASE_INDEX_AUDIO,
  DECREASE_INDEX_AUDIO,
  GET_INDEX_AUDIO,
  SET_AUDIOS,
  SET_INDEX_AUDIO,
  RESET_AUDIOS,
} from '../actions/types';

const initialState = {
  publicTest: null,
  privateTest: null,
  testCurrently: null,
  audios: [],
  indexAudio: 0,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PUBLIC_TEST_SUCCESS:
      return {
        ...state,
        publicTest: payload.tests,
      };
    case GET_PRIVATE_TEST_SUCCESS:
      return {
        ...state,
        privateTest: payload.tests,
      };
    case SET_TEST_CURRENTLY:
      return {
        ...state,
        testCurrently: payload,
      };
    case GET_AUDIO_FOR_USER:
      return {
        ...state,
        audios: payload.audios,
      };
    case SET_POINT_FOR_AUDIO:
      return {
        ...state,
        indexAudio: payload.indexAudio,
      };
    case UPDATE_REAL_USER_FOR_AUDIO:
      return {
        ...state,
      };
    case GET_ALL_AUDIO_BY_TEST_ID:
      return {};
    case INCREASE_INDEX_AUDIO:
      return {
        ...state,
        indexAudio: state.indexAudio + 1,
      };
    case DECREASE_INDEX_AUDIO:
      return {
        ...state,
        indexAudio: state.indexAudio - 1,
      };
    case GET_INDEX_AUDIO:
      return {
        ...state,
        indexAudio: payload.indexAudio,
      };
    case SET_AUDIOS:
      return {
        ...state,
        audios: state.audios.map(audio => {
          if (audio._id === payload.id) {
            return {
              ...audio,
              user: {
                ...audio.user,
                point: payload.point,
              },
            };
          }
          return audio;
        }),
      };
    case SET_INDEX_AUDIO: {
      return {
        ...state,
        indexAudio: payload,
      };
    }
    case RESET_AUDIOS: {
      return {
        ...state,
        audios: [],
        indexAudio: 0,
      };
    }
    default:
      return state;
  }
}
