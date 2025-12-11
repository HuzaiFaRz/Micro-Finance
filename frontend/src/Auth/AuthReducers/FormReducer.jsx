const FormReducer = (state, action) => {
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
};

export default FormReducer;
