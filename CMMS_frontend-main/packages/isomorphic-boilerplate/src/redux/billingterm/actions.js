const actions = {
  GET_BILLING_TERMS: 'GET_BILLING_TERMS',
  ADD_BILLING_TERM: 'ADD_BILLING_TERM',
  GET_BILLING_TERMS_REDUCER: 'GET_BILLING_TERMS_REDUCER',
  getBillingTerms: () => ({ type: actions.GET_BILLING_TERMS }),
  addBilingTerm: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_BILLING_TERM,
        payload: { sendData: sendData },
      });
    };
  },
};
export default actions;
