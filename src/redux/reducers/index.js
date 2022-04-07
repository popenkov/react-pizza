import { combineReducers } from "redux";

import filters from "./filters";
import pizzas from "./pizzas";
import cart from "./cart";

const rootReducer = combineReducers({
  filters: filters,
  pizzas: pizzas,
  cart: cart,
});

export default rootReducer;
