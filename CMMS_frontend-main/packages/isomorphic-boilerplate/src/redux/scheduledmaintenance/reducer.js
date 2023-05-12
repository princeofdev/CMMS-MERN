// import clone from 'clone';
import actions from "./actions";
const initState = {
  scheduledmaintenances:[],  
  scheduledmaintenance:{},
  smLogs:[],
  codeName:"",
  smID:null,
  isDelete: false,
  isSaved:false,
  printData:null,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_SM_SUCCESS:
      return {
        ...state,      
        codeName:action.data.strCode,
        smID:action.data.id,   
        isSaved:true  
      };
  
    case actions.GET_SM_REDUCER: {
    
      return {
        ...state,
        scheduledmaintenances:action.data,  
        scheduledmaintenance:{},
        isDelete: false,        
        isSaved:false
      };
    }
    case actions.GET_SM_BYID_REDUCER: {
      return {
        ...state,
        scheduledmaintenance: action.data,
        isDelete: false,
        isSaved:false
      };
    }    
    case actions.GET_SM_PRINT_BYID_REDUCER:{
      return {
        ...state,
        printData: action.data,
        isDelete: false,
        isSaved: false
      };
    }
    case actions.DELETE_SM_SUCCESS:
      return {
        ...state,     
        isDelete: true,
        isSaved:false
      };
    case actions.CREATE_SM_ID_SUCCESS:
      return {
        ...state,
        smID: action.smId,
      };
    case actions.GET_SM_LOGS_REDUCER:
      return {
        ...state,
        smLogs:action.data
      };
    default:
      return state;
  }
}
