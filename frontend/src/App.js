import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
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
      <Header />
      <main className="container content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomeScreen />} />

          <Route path="/category" element={<Category />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<ProfileScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
