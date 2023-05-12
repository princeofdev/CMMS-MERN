// import clone from 'clone';
import actions from './actions';
const initState = {
  currencies: [],
  currency: {},
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    // case actions.ADD_SUCCESS:
    //   return {
    //     ...state,
    //     assetcategories: [],
    //   };
    case actions.GET_CURRENCY_REDUCER: {
      return {
        ...state,
        currencies: action.data,
        isDelete: false,
      };
    }
    default:
      return state;
  }
}
