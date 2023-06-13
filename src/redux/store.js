import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import bookReducer from "./reducers/bookReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
