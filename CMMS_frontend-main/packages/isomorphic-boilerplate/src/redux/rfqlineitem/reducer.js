import clone from 'clone';
import actions from './actions';
const initState = {
  rfqLineItems: [],
  isChanged: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_RFQ_LINEITEM_REDUCER:
      return {
        ...state,
        rfqLineItems: action.data,
        isChanged: false,
      };
    case actions.CHANGE_LINEITEM_REDUCER:
      return {
        ...state,
        isChanged: true,
      };
    case actions.UPGRADE_RFQ_LINE_ITEM:
      return {
        ...state,
        rfqLineItems: clone(action.lineData),
        // planBoards: clone(action.lineData),
      };
    default:
      return state;
  }
}
