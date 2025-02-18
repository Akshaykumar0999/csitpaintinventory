import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Employee from "./components/Employee";
import Supplier from "./components/Supplier";
import Product from "./components/Product";
import Purchase from "./components/Purchase";
import Dashboard from "./components/Dashboard";
import Login from "./components/Pages/Login";

import { useSelector } from "react-redux";
import Settings from "./components/Settings";
import Home from "./components/Home";
import { useEffect } from "react";

function App() {
  const { auth } = useSelector((state) => state);
  const jwtToken = auth.token;

  useEffect(() => {
    console.log("Redux Auth State on Load:", auth);
  }, [auth]);
  const ProtectedRoute = ({ children, role }) => {
    // const userRole = auth.user.role;
    if (!jwtToken || jwtToken === 'no token') {
      return <Navigate to="/login" />;
    } else {
      if (auth.user.role === role) {
        return children;
      } else {
        return (
          <div className="not-authorized-styles ">
            Your Not Authorized To This Page
          </div>
        );
      }
    }
  };

  const CheckLoggedIn = ({ children }) => {
    if (jwtToken && auth.user?.role) {
      // if (auth.user.role === "admin") {
      //   return <Navigate to={"/"} />;
      // }
      // if (auth.user.role === "user") {
      //   return <Navigate to={"/home"} />;
      // }
      return auth.user.role === 'admin' ? <Navigate to='/' /> : <Navigate to='/home' />
    } else {
      return children;
    }
  };

  return (
    <div className="paint-inventory-main-container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute role={"admin"}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute role={"admin"}>
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplier"
            element={
              <ProtectedRoute role={"admin"}>
                <Supplier />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute role={"admin"}>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <ProtectedRoute role={"admin"}>
                <Purchase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute role={"user"}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute role={"admin"}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <CheckLoggedIn>
                <Login />
              </CheckLoggedIn>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
