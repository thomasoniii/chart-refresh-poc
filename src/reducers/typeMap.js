import {
  CREATE_CHART,
  SET_TYPE,
} from '../constants/types';

const INITIAL = {};

export default (state = INITIAL, action) => {
  switch(action.type) {
    case CREATE_CHART : {
      const chart = action.payload;

      const newState = { ...state };

      newState[chart.type] = newState[chart.type]
        ? [ ...newState[chart.type] ]
        : [];

      newState[chart.type].push(chart.id)
      return newState;

    }
    case SET_TYPE : {
      const { id, type : newType } = action.payload;
      const newState     = { ...state };

      // first thing we need to do, tediously, is nuke the chart id from prior types.
      // this could be faster, but the assumption is that chart types won't change.
      // maybe we wouldn't even need to delete?
      Object.keys(newState).forEach( type => {

        if ( newState[type].indexOf(id) !== -1 ) {
          newState[type] = newState[type].filter( chartId => chartId !== id );
        }
      });

      newState[newType] = newState[newType]
        ? [ ...newState[newType] ]
        : [];

      newState[newType].push(id);
      return newState;
    }
    default :
      return state;
  }
}
