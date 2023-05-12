// import clone from 'clone';
import actions from './actions';
const initState = {
  auditReports: [],
  auditReport: {},
  isDelete: false,
  isSaved: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_AUDIT_REPORT_REDUCER:
      return {
        ...state,
        auditReports: action.data,
        isDelete: false,
        isSaved: false,
      };
    case actions.GET_AUDIT_REPORT_BY_ID_REDUCER:
      return {
        ...state,
        auditReport: action.data,
        isDelete: false,
        isSaved: false,
      };
    case actions.DELETE_AUDIT_REPORT_REDUCER:
      return {
        ...state,
        isDelete: true,
        isSaved: false,
      };
    case actions.ADD_AUDIT_REPORT_REDUCER:
      return {
        ...state,
        isSaved: true,
      };

    default:
      return state;
  }
}
