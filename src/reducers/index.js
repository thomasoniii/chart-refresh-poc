import { combineReducers } from 'redux';

import charts  from './charts';
import typeMap from './typeMap';

export default combineReducers({
  charts,
  typeMap
});
