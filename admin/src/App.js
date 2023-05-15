import React, { useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "./Redux/actions/orderActions";
import { getAllProducts } from "./Redux/actions/productActions";
import PrivateRouter from "./PrivateRouter";
function App() {
  const dispatch = useDispatch();
  const UserLogin = useSelector((state) => state.UserLogin);
  const { userInfo } = UserLogin;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
      dispatch(getAllProducts());
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route exact element={<PrivateRouter />}>
          <Route exact path="/" element={<HomeScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/products" element={<ProductScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/category" element={<CategoriesScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/orders" element={<OrderScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/order/:id" element={<OrderDetailScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/users" element={<UsersScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/order/:id" element={<OrderDetailScreen />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/product/:id/edit" element={<ProductEditScreen />} />
        </Route>
        <Route path="/login" element={<Login />} />{" "}
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </>
  );
}

export default App;
