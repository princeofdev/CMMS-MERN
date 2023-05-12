// import clone from 'clone';
import actions from './actions';
const initState = {
  billingTerms: [],
  billingTerm: {},
  isDelete: false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_BILLING_TERMS_REDUCER:
      return {
        ...state,
        billingTerms: action.data,
      };

    default:
      return state;
  }
}
