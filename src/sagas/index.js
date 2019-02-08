import { all } from 'redux-saga/effects';

import chartsSaga from './charts';

export default function* rootSaga() {
  yield all([
    chartsSaga(),
  ])
}
