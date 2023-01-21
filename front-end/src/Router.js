import React from "react";
import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Cats from './pages/Cats';
import Customers from './pages/Customers';
import Dogs from './pages/Dogs';
import Users from "./pages/Users";
import Register from "./pages/Register";
import NavBar from './components/NavBar';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar/>
      {children}
    </>
  );
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navigate to="/users" />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
        
      <Route 
        path="/cats" 
        element={ 
          <PrivateRoute>
            <Cats/>
          </PrivateRoute> 
        }
      />

      <Route 
        path="/dogs" 
        element={ 
          <PrivateRoute>
            <Dogs/>
          </PrivateRoute>
         } 
      />
      
      <Route 
        path="/customers" 
        element={ 
          <PrivateRoute>
            <Customers/>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Router;