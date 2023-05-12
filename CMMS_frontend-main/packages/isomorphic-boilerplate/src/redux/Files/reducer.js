// import clone from 'clone';
import actions from './actions';
const initState = {  
  isSaved:false,
  isDelete:false,
  fileLists:[],
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.SUBMIT_SUCCESS:
      return {
        ...state,             
        isSaved: true,
      };   
      case actions.GET_FILELIST_REDUCER:
      return {
        ...state,
        fileLists: action.files,
      };
    default:
      return state;
  }
}
