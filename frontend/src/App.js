import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";

import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from './components/User/Login';
import Register from './components/User/Register';
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";
import Category from "./components/Category/Category";

function App() {
  return (
    <div>


      <main className="container content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vendor/register" element={<VendorRegister />} />
          <Route path="/" element={<HomeScreen />} />

          <Route path="/category" element={<Category />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
