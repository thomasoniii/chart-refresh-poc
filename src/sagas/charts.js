import { all, put, takeEvery, select } from 'redux-saga/effects';

import {
  REFRESH_CHARTS,
  REFRESH_CHARTS_OF_TYPE,
  DISPATCH_ACTION_AND_REFRESH,
} from '../constants/types';

import {
  setDate,
} from '../actions';

/*
  Okay, so here's where I'll try to explain my though process. First of all, the
  action being "REFRESH_CHARTS" is arbitrary. Any action that'd cause all the charts
  to refresh could go in here and call the refreshAllCharts function to call them all.

  Note that for demo purposes "refreshing" a chart just consists of setting its date to
  NOW, whereas in actuality we'd want to do something more complicated.
*/

export default function* chartsSaga() {
  yield all([
    takeEvery( REFRESH_CHARTS,              refreshAllCharts ),
    takeEvery( REFRESH_CHARTS_OF_TYPE,      refreshChartsOfType ),
    takeEvery( DISPATCH_ACTION_AND_REFRESH, dispatchActionAndRefresh )
  ])
}

/* This function should hand most cases. I'd make an argument that if "something" happens
that should cause a refresh, we can just blast it out to all charts on the page, unless we
have a performance reason to limit it. Maybe we do? I dunno.

But as a starting point, I'd rather skew towards the less involved flavor.

*/

function* refreshAllCharts(action) {
  const state = yield select();
  const charts = state.charts;

  for (const chart of Object.values(charts)) {
    yield put( setDate( chart.id, Date.now() ) )
  }
}

/* this one is barely slightly more complicated, and just arbitrarily. In this case,
the action takes a single value in its payload ("chartType" here, because of course a
standard redux action already has a "type" and I didn't want the two to get confused
and we can't have nice things), and then behaves the same way except that it checks
to see if the type matches whatever we're refreshing.

Naturally "type" is arbitrary, and we could have different functions to refresh based on
different parameters. But if we're doing this for more than 1 or 2 fields, we'd probably
want to use a more generic approach.

*/

function* refreshChartsOfType(action) {
  const { chartType } = action.payload;
  const state = yield select();
  const charts = state.charts;

  for (const chart of Object.values(charts)) {
    if ( chart.type === chartType ) {
      yield put( setDate( chart.id, Date.now() ) )
    }
  }
}

/* This is a very generic approach, and functionally very similar to the existing code.

To use this one, you'd dispatch an action of type DISPATCH_ACTION_AND_REFRESH, which
has an action and a condition in its payload. Yes, having an action have a payload with an
action is confusing, I agree. Same issue as up above. Anyway, this saga will just immediately
dispatch whatever action it was handed, and then iterate through the charts and check to see
if they match the condition. If so, we refresh, and if not we skip it.

Of course, we could also write a helper function to wrapper the original action creator so its
interface is unchanged. Maybe something like this, which I just dashed off and did not test:

function makeRefreshableAction( actionCreator, condition = () => true ) {
  return (...args) {
    dispatchActionAndRefresh(
      actionCreator(args),
      condition
    )
  }
}

and then:

const refreshableActionCreator = makeRefreshableAction(actionCreator, condition);

to get a drop in replacement for actionCreator. Assuming I dashed off the function properly, of course. :-)

Honestly? I don't like this approach. It feels overly generic without a strong immediate need. On the other hand,
it's very future proofed. It's also virtually the same as what we've already got. But hey, it's in a saga, so it's
a smidgen different.
*/

function* dispatchActionAndRefresh(wrappedAction) {
  const { action, condition } = wrappedAction.payload;
  yield put(action);
  const state = yield select();
  const charts = state.charts;

  for (const chart of Object.values(charts)) {
    if ( condition(chart) ) {
      yield put( setDate( chart.id, Date.now() ) )
    }
  }
}
