// import clone from 'clone';
import actions from './actions';
const initState = {
  businesses: [],
  business: {},
  isDelete: false,
  view: null,
  workorderId: null,
  isSaved: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.ADD_BUSINESSES_SUCCESS:
      return {
        ...state,
        // workorders: [],
        // workorderId: action.data.id,
        isDelete: false,
        isSaved: true,
      };
    case actions.ADD_FAILED:
      return {
        ...state,
        workorder: [],
        isDelete: false,
        isSaved: false,
      };
    case actions.GET_BUSINESSES_REDUCER: {
      return {
        ...state,
        businesses: action.data,
        isDelete: false,
        isSaved: false,
      };
    }

    case actions.GET_BUSINESSES_BY_ID_REDUCER: {
      return {
        ...state,
        business: action.data,
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
    default:
      return state;
  }
}
