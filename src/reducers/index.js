import { combineReducers } from "redux";
import loginReducer from "../pages/login/login.reducer";

import { SIGN_OUT } from "../constants/types";

const appReducer = combineReducers({
  auth: loginReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
