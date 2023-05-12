// import clone from 'clone';
import actions from './actions';
const initState = {
  branches: [],
  isChanged: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {

    case actions.GET_BUSINESS_BRANCH_REDUCER: {
      return {
        ...state,
        branches: action.data,
        isChanged: false
      };
    }
    case actions.CHANGED_REDUCER: {
      return {
        ...state,
        isChanged: true
      };
    }
    // case actions.UPDATE_SUCCESS:
    //   return {
    //     ...state,      
    //     assetcategories: [],
    //     //isUpdateUser:true
    //   };
    //  case actions.DELETE_FAILED:
    //     return {
    //       ...state,    
    //       isDelete:false
    //     };
    //     case actions.DELETE_SUCCESS:
    //       return {
    //         ...state, 
    //        // assets:[],         
    //         isDelete:true
    //       };  
    default:
      return state;
  }
}
