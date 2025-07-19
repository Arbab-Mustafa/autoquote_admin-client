import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      console.log("🔍 AuthContext: Validating token...", { token: !!token });
      if (token) {
        try {
          const decoded = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          console.log("🔍 AuthContext: Token decoded:", {
            exp: decoded.exp,
            currentTime,
            isValid: decoded.exp > currentTime,
          });

          if (decoded.exp < currentTime) {
            // Token expired
            console.log("❌ AuthContext: Token expired, logging out");
            logout();
          } else {
            // Token valid - set user from decoded token
            const user = {
              id: decoded.sub,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
            };
            console.log("✅ AuthContext: Token valid, setting user:", user);
            setCurrentUser(user);
          }
        } catch (error) {
          // Invalid token
          console.error("❌ AuthContext: Invalid token:", error);
          logout();
        }
      } else {
        console.log("🔍 AuthContext: No token found");
      }
      setLoading(false);
    };

    validateToken();
  }, [token]);

  const login = async (email, password) => {
    console.log("🔍 AuthContext: Login attempt with:", { email });
    try {
      // Create a token that expires in 24 hours from now
      const now = Math.floor(Date.now() / 1000);
      const exp = now + 24 * 60 * 60; // 24 hours from now

      // Create a properly formatted JWT token
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: "123456",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          iat: now,
          exp: exp,
        })
      );
      const signature = "mock-signature-for-demo";

      const mockToken = `${header}.${payload}.${signature}`;

      // In a real app, this would call the backend API
      // For this MVP, we'll simulate a successful login with a valid token
      const mockResponse = {
        token: mockToken,
        user: {
          id: "123456",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        },
      };

      console.log("🔍 AuthContext: Setting loading to true");
      // Set loading to prevent flash
      setLoading(true);

      // Store token and update state
      localStorage.setItem("token", mockResponse.token);
      setToken(mockResponse.token);
      setCurrentUser(mockResponse.user);

      console.log(
        "✅ AuthContext: Login successful, user set:",
        mockResponse.user
      );

      // Set loading to false after state updates
      setLoading(false);

      return true;
    } catch (error) {
      console.error("❌ AuthContext: Login error:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log("🔍 AuthContext: Logging out");
    setLoading(true);
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
    setLoading(false);
    navigate("/login");
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
    loading,
  };

  console.log("🔍 AuthContext: Current state:", {
    currentUser: !!currentUser,
    token: !!token,
    loading,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
