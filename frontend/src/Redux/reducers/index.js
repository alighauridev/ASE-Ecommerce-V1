import { combineReducers } from "redux";
import { getFilterProductReducer } from "./filterProductReducer";
import { cartReducer } from "./cartReducer";
import { allProductsReducer, productCreateReviewReducer, singleProductReducer } from "./productReducers";
import {
  forgotPasswordReducer,
  profileReducer,
  userLoginReducer,
  userReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";
import { shippingDetailsReducer } from "./checkoutReducer";
import {
  allOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";
import { categoryListReducer } from "./categoryReducers";
const RootReducer = combineReducers({
  Products: allProductsReducer,
  ProductDetails: singleProductReducer,
  ProductCreateReview: productCreateReviewReducer,
  Cart: cartReducer,
  Checkout: shippingDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  OrderCreate: orderCreateReducer,
  OrderDetails: orderDetailsReducer,
  OrderPay: orderPayReducer,
  Orders: allOrdersReducer,
  filterData: getFilterProductReducer,
  Categories: categoryListReducer,
});

export default RootReducer;
