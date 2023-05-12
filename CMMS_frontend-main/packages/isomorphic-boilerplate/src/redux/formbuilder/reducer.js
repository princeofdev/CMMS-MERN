// import clone from 'clone';
import actions from './actions';
const initState = {
  formDatas: [],
  formData: [],
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_FORM_DATAS_REDUCER:
      return {
        ...state,
        formDatas: action.data,
        isDelete: false,
      };
    // case actions.ADD_FAILED:
    //   return {
    //     ...state,
    //     projects: [],
    //   };
    // case actions.GET_PROJECT_REDUCER: {
    //   return {
    //     ...state,
    //     projects: action.projects,
    //     isDelete:false
    //   };
    // }
    case actions.GET_FORM_DATA_BY_ID_REDUCER: {
      return {
        ...state,
        isDelete: false,
        formData: action.formdata,
      };
    }
    // case actions.UPDATE_SUCCESS:
    //   return {
    //     ...state,
    //     projects: [],
    //     //isUpdateUser:true
    //   };
    //  case actions.DELETE_FAILED:
    //   return {
    //     ...state,
    //     isDelete: false
    //   };
    case actions.DELETE_FORM_DATA_REDUCER:
      return {
        ...state,
        // assets:[],
        isDelete: true,
      };
    default:
      return state;
  }
}
