// import clone from 'clone';
import actions from './actions';
const initState = {
  ports: [],
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_PORT_REDUCER: {
      return {
        ...state,
        ports: action.data,
        isDelete: false,
      };
    }
    default:
      return state;
  }
}
