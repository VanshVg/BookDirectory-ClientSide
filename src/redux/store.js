import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import bookReducer from "./reducers/bookReducer";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
