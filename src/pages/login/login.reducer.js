import {SIGN_IN, SIGN_OUT, USER_INFO} from "../../constants/types";

const INTIAL_STATE = {
  isSignedIn: window.localStorage.getItem("token") ? true : false,
  profile: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    case USER_INFO:
      return { ...state, profile: action.payload};
    case SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
