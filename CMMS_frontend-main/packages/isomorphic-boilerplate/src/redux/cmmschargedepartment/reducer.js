// import clone from 'clone';
import actions from './actions';
const initState = {
  chargedepartments: [],
  chargedepartment: {},
  isDelete: false,
  isSaved: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_CMMS_SETTING_CHARGEDEPARTMENT:
      return {
        ...state,
        // accounts: [],
        isSaved: true,
        isDelete: false,
      };
    case actions.ADD_FAILED:
      return {
        ...state,
        accounts: [],
      };
    case actions.GET_CHARGEDEPARTMENT_SETTING_REDUCER: {
      return {
        ...state,
        chargedepartments: action.chargedepartments,
        isDelete: false,
        isSaved: false,
      };
    }
    case actions.GET_BY_ID_REDUCER: {
      return {
        ...state,
        account: action.account,
      };
    }
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        accounts: [],
        //isUpdateUser:true
      };
    case actions.DELETE_FAILED:
      return {
        ...state,
        isDelete: false,
      };
    case actions.DELETE_CHARGEDEPARTMENT_SETTING:
      return {
        ...state,
        // assets:[],
        isDelete: true,
        isSaved: false,
      };
    default:
      return state;
  }
}
