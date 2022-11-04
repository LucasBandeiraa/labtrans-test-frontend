import React from "react";
import { BrowserRouter,Routes as RoutesList, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Navbar";
import Login from "../pages/Login";
import { Reservas } from "../pages/reservas";
import ReservasForm from "../pages/reservas/reservas-form";
import { isAuthenticated } from "../services/auth";

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };

  const Teste = () => {
    return <h2>Home (Protected: authenticated user required)</h2>;
  };

const Routes = () => (
  <BrowserRouter>
    {isAuthenticated() && <Header/>}
    <RoutesList>
        <Route index element={<Login/>} />
        <Route path="home" element={
        <ProtectedRoute>
            <ReservasForm/>
        </ProtectedRoute>} 
        />
        <Route path="reservas" element={
        <ProtectedRoute>
            <Reservas/>
        </ProtectedRoute>}   
    />
    </RoutesList>
  </BrowserRouter>
);

export default Routes;