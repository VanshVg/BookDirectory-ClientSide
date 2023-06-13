import {
  SET_IS_LOGGED_IN,
  SET_USER_TYPE,
  SET_CART_ITEMS,
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  userType: null,
  userToken: "",
  cartItems: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userType: action.payload.userType,
        userToken: action.payload.userToken,
      };
    case "LOGOUT":
      return initialState;
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload,
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case "SET_USER_TOKEN":
      return {
        ...state,
        userToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
