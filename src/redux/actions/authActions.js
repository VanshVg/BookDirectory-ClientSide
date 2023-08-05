import { SET_IS_LOGGED_IN, SET_USER_TYPE, SET_CART_ITEMS, LOGIN, LOGOUT, SET_USER_TOKEN } from "../types";

export const login = (isLoggedIn, userType, userToken) => {
  return {
    type: LOGIN,
    payload: { isLoggedIn, userType, userToken },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setIsLoggedIn = (isLoggedIn) => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const setUserType = (userType) => {
  return {
    type: SET_USER_TYPE,
    payload: userType,
  };
};

export const setCartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    payload: cartItems,
  };
};

export const setUserToken = (userToken) => {
  return {
    type: SET_USER_TOKEN,
    payload: userToken,
  };
};
