// import clone from 'clone';
import actions from './actions';
const initState = {
  workorderbusinesses: [],
  workordertask: {},
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_WORKORDER_BUSINESSES_REDUCER: {
      return {
        ...state,
        workorderbusinesses: action.data,
        isDelete: false,
      };
    }
    case actions.DELETE_WORKORDER_BUSINESSES_SUCCESS:
      return {
        ...state,
        isDelete: true,
      };
    default:
      return state;
  }
}
