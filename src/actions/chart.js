import {
  CREATE_CHART,
  DELETE_CHART,

  REFRESH_CHARTS,
  REFRESH_CHARTS_OF_TYPE,

  DISPATCH_ACTION_AND_REFRESH,

  SET_DATE,
  SET_TYPE,
  SET_NAME,

  JUNK_ACTION,
} from '../constants/types';

export const createChart = () => {
  return {
    type : CREATE_CHART
  }
};

export const deleteChart = () => {
  return {
    type : DELETE_CHART
  }
};

export const refreshCharts = () => {
  return {
    type : REFRESH_CHARTS
  }
};

export const refreshChartsOfType = (chartType) => {
  return {
    type    : REFRESH_CHARTS_OF_TYPE,
    payload : { chartType }
  }
};

export const dispatchActionAndRefresh = (action, condition) => {
  return {
    type    : DISPATCH_ACTION_AND_REFRESH,
    payload : { action, condition }
  }
}

export const setDate = (id, date) => {
  return {
    type    : SET_DATE,
    payload : {id, date}
  }
};

export const setType = (id, type) => {
  return {
    type    : SET_TYPE,
    payload : {id, type}
  }
};

export const setName = (id, name) => {
  return {
    type    : SET_NAME,
    payload : {id, name}
  }
};

export const junkAction = (name, type) => {
  return {
    type : JUNK_ACTION,
    payload : { name, type }
  }
};
