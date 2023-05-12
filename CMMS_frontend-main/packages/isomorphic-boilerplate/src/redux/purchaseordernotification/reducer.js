// import clone from 'clone';
import actions from './actions';
const initState = {
  purchaseOrderNotifications: [],
  purchaseOrderNotification: {},
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_PURCHASEORDER_NOTIFICATIONS_REDUCER: {
      return {
        ...state,
        purchaseOrderNotifications: action.data,
        isDelete: false,
      };
    }
    case actions.DELETE_PURCHASER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isDelete: true,
      };
    default:
      return state;
  }
}
