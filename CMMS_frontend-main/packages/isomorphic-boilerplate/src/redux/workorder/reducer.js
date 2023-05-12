// import clone from 'clone';
import actions from './actions';
const initState = {
  workorders: [],
  workOrderLogs:[],
  workorder: {},
  isDelete: false,
  view: null,
  workorderId: null,
  isSaved: false,
  printData: null,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_WORKORDER_SUCCESS:
      return {
        ...state,
        workorders: [],
        workorderId: action.data.id,
        isDelete: false,
        isSaved: true,
      };
    case actions.GET_WO_BY_SM_ID_REDUCER:
      return {
        ...state,
        workOrderLogs: action.data,
        isDelete: false,
        isSaved: false,
      };      
    case actions.ADD_FAILED:
      return {
        ...state,
        workorder: [],
        isDelete: false,
        isSaved: false,
      };
    case actions.GET_WORKORDER_REDUCER: {
      return {
        ...state,
        workorders: action.workorders,
        isDelete: false,
        isSaved: false,
      };
    }
    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        workorder: action.workorder,
        isDelete: false,
        isSaved: false,
      };
    }
    case actions.PRINT_WORKORDERS_REDUCER: {
      return {
        ...state,
        printData: action.workorder,
        isDelete: false,
        isSaved: false,
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        workorders: [],
        isDelete: false,
      };
    case actions.DELETE_FAILED:
      return {
        ...state,
        isDelete: false,
      };
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        // assets:[],
        isDelete: true,
        isSaved: false,
      };
    case actions.CREATE_WOID_SUCCESS:
      return {
        ...state,
        workorders: [],
        workorderId: action.workorderid,
        isDelete: false,
        isSaved: false,
      };
    default:
      return state;
  }
}
