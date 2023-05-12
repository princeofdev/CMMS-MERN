// import clone from 'clone';
import actions from './actions';
const initState = {  
  business:[],
  mybusiness:{},
  isDelete:false,
  isSave:false
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_BUSINESS_REDUCER:
      return {
        ...state,             
        isSave:true
      };
    // case actions.ADD_FAILED:
    //   return {
    //     ...state,        
    //     accounts: [],             
    //   };
    case actions.GET_BUSINESS_REDUCER: {
      return {
        ...state,
        business: action.data,
        isDelete:false,
        isSave: false
      };
    }
    case actions.GET_BUSINESS_BY_ID_REDUCER: {
      return {
        ...state,
        mybusiness: action.data,
        isDelete: false,
        isSave: false
      };
    } 
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
