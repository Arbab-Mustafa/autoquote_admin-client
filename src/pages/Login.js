import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    console.log("🔍 Login: useEffect triggered", { currentUser, authLoading });
    if (currentUser && !authLoading) {
      console.log("✅ Login: User authenticated, redirecting to /overview");
      navigate("/overview");
    }
  }, [currentUser, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("🔍 Login: Form submitted with:", { email });

    try {
      const success = await login(email, password);
      console.log("🔍 Login: Login result:", success);
      if (success) {
        // Navigation will be handled by useEffect above
        console.log("✅ Login: Login successful, waiting for redirect");
      } else {
        setError("Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("❌ Login: Error during login:", error);
    }

    setLoading(false);
  };

  // Show loading if auth is still loading
  if (authLoading) {
    console.log("🔍 Login: Showing loading state");
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  // Don't show login if already authenticated
  if (currentUser) {
    console.log("🔍 Login: User already authenticated, not showing login form");
    return null;
  }

  console.log("🔍 Login: Rendering login form");
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, width: "100%", borderRadius: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              For demo purposes, use any email and password.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
