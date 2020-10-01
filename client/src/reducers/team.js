import {
  FINISH_TASK,
  GET_COMPETITION_BY_ID,
  GET_LIST_COMPETITION,
  GET_LIST_TRANSCRIPT,
  GET_TASK_PROCESS,
  GET_RANDOMIZE_AUDIO,
  RESET_TEAM_STATE,
  INCEASE_COMPLETED_AUDIO,
} from '../actions/types';

const initialState = {
  competitions: [],
  transcripts: [],
  currentAudio: null,
  competition: null,
  completed: false,
  processTask: {
    numberOfCompletedAudio: 0,
    totalAmountOfAudio: 0,
  },
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIST_COMPETITION:
      return {
        ...state,
        competitions: payload.competitions,
      };

    case GET_RANDOMIZE_AUDIO:
      return {
        ...state,
        currentAudio: payload.audio,
      };

    case FINISH_TASK:
      return {
        ...state,
        completed: true,
      };

    case GET_LIST_TRANSCRIPT:
      return {
        ...state,
        transcripts: payload.transcripts,
      };

    case GET_COMPETITION_BY_ID:
      return {
        ...state,
        competition: payload.competition,
      };

    case RESET_TEAM_STATE:
      return initialState;

    case GET_TASK_PROCESS:
      return {
        ...state,
        processTask: {
          numberOfCompletedAudio: payload.numberOfCompletedAudio,
          totalAmountOfAudio: payload.totalAmountOfAudio,
        },
      };

    case INCEASE_COMPLETED_AUDIO:
      return {
        ...state,
        processTask: {
          ...state.processTask,
          numberOfCompletedAudio: state.processTask.numberOfCompletedAudio + 1,
        },
      };
    default:
      return state;
  }
}
