// import clone from 'clone';
import actions from './actions';
const initState = {  
  checklists:[],
  checklist:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_CHECKLIST_REDUCER:
      return {
        ...state,             
        checklists: action.data,
        isDelete: false
      };
    case actions.DELETE_CHECKLIST_REDUCER:
      return {
        ...state,
        isDelete:true
      };
      
    default:
      return state;
  }
}
