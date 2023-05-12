// import clone from 'clone';
import actions from './actions';
const initState = {  
  codeTypes:[],
  codeType:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    // case actions.ADD_SUCCESS:
    //   return {
    //     ...state,             
    //     assetcategories: [],        
    //   };    
    case actions.GET_CODE_TYPE_REDUCER: {
      return {
        ...state,
        codeTypes: action.data,      
        isDelete:false
      };
    }    
    default:
      return state;
  }
}
