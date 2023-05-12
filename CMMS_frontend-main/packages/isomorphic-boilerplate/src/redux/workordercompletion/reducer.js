import actions from './actions';
const initState = {  
  workordercompletion:[],
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_WORKORDER_COMPLETION_REDUCER: {
      return {
        ...state,
        workordercompletion: action.data,
      };
    }  
    default:
      return state;
  }
}
