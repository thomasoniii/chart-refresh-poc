import { createSelector } from 'reselect';

export const getCharts  = state => state.charts;

export const getSortedCharts = createSelector(
  [getCharts],
  (charts) => {
    return Object.values(charts).sort( (a,b) => a - b )
  }
)
