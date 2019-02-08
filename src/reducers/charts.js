import {
  CREATE_CHART,
  DELETE_CHART,

  SET_DATE,
  SET_TYPE,
  SET_NAME,

  JUNK_ACTION
} from '../constants/types';

const INITIAL = {};

export default (state = INITIAL, action) => {
  switch(action.type) {
    case CREATE_CHART : {
      const chart = action.payload;
      return {
        ...state,
        [chart.id] : chart
      }
    }
    case DELETE_CHART : {
      const {id} = action.payload;
      const newState = {...state};
      delete newState[id];
      return newState;
    }
    case SET_DATE : {
      const { id, date } = action.payload;
      const newState   = { ...state };
      newState[id]     = { ...newState[id], date };
      return newState;
    }
    case SET_TYPE : {
      const { id, type } = action.payload;
      const newState   = { ...state };
      newState[id]     = { ...newState[id], type };
      return newState;
    }
    case SET_NAME : {
      const { id, name } = action.payload;
      const newState   = { ...state };
      newState[id]     = { ...newState[id], name };
      return newState;
    }
    case JUNK_ACTION : {
      const { name, type } = action.payload;
      console.log(`A junk action with name "${name}" of type "${type}" was run. Nothing happens.`);
      return state;
    }
    default :
      return state;
  }
};
