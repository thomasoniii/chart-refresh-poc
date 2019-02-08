import { dispatchActionAndRefresh } from '../actions';

export function makeRefreshableAction( actionCreator, condition = () => true ) {
  return (...args) => {
    return dispatchActionAndRefresh(
      actionCreator(...args),
      condition
    )
  }
}
