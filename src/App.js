import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

// Layout components
import Dashboard from "./components/layout/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Overview from "./pages/Overview";
import Providers from "./pages/Providers";
import KPIReport from "./pages/KPIReport";
import Products from "./pages/Products";
import Branding from "./pages/Branding";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

// Auth context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
        </Route>
        <Route
          path="/providers"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Providers />} />
        </Route>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Products />} />
        </Route>
        <Route
          path="/branding"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Branding />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Analytics />} />
        </Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
