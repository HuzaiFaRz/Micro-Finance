const LoanFormReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      ...state,
      [action.inputID]: action.inputValue,
    };
  } else if (action.type === "RESET_FORM") {
    return {
      ...state,
      [action.inputID]: "",
    };
  }
  return state;
};

export default LoanFormReducer;
