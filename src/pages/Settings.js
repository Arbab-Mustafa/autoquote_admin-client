import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const Settings = () => {
  const [settings, setSettings] = useState({
    cartRedirectUrl: 'https://checkout.example.com/cart',
    cartApiKey: 'sk_test_abcdefghijklmnopqrstuvwxyz',
    enableLeadCapture: true,
    leadCaptureFields: ['email', 'phone'],
    enableAnalytics: true,
    analyticsProvider: 'google',
    analyticsId: 'UA-12345678-1',
    enableABTesting: true,
    defaultLayout: 'modal'
  });

  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
    setSaved(false);
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
    setSaved(false);
  };

  const handleMultiSelectChange = (e) => {
    setSettings({
      ...settings,
      leadCaptureFields: e.target.value
    });
    setSaved(false);
  };

  const handleSaveSettings = () => {
    // In a real app, this would call the backend API to save settings
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Settings</Typography>
        <Button 
          variant="contained" 
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Cart Integration */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cart Integration
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Configure how the quote widget integrates with your cart system.
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="cartRedirectUrl"
                  label="Cart Redirect URL"
                  value={settings.cartRedirectUrl}
                  onChange={handleInputChange}
                  fullWidth
                  helperText="URL where customers will be redirected to complete purchase"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="cartApiKey"
                  label="Cart API Key"
                  value={settings.cartApiKey}
                  onChange={handleInputChange}
                  fullWidth
                  type="password"
                  helperText="API key for secure cart integration"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Lead Capture */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Lead Capture
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableLeadCapture}
                  onChange={handleSwitchChange}
                  name="enableLeadCapture"
                />
              }
              label="Enable Lead Capture"
              sx={{ mb: 2, display: 'block' }}
            />
            
            <FormControl fullWidth disabled={!settings.enableLeadCapture}>
              <InputLabel>Required Fields</InputLabel>
              <Select
                multiple
                name="leadCaptureFields"
                value={settings.leadCaptureFields}
                onChange={handleMultiSelectChange}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="name">Full Name</MenuItem>
                <MenuItem value="address">Address</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Analytics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Analytics
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableAnalytics}
                  onChange={handleSwitchChange}
                  name="enableAnalytics"
                />
              }
              label="Enable Analytics"
              sx={{ mb: 2, display: 'block' }}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!settings.enableAnalytics}>
                  <InputLabel>Provider</InputLabel>
                  <Select
                    name="analyticsProvider"
                    value={settings.analyticsProvider}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="google">Google Analytics</MenuItem>
                    <MenuItem value="segment">Segment</MenuItem>
                    <MenuItem value="mixpanel">Mixpanel</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="analyticsId"
                  label="Analytics ID"
                  value={settings.analyticsId}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!settings.enableAnalytics}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* A/B Testing */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              A/B Testing & Display
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableABTesting}
                      onChange={handleSwitchChange}
                      name="enableABTesting"
                    />
                  }
                  label="Enable A/B Testing"
                  sx={{ mb: 2, display: 'block' }}
                />
                <Typography variant="body2" color="textSecondary">
                  When enabled, the system will automatically test different layouts and designs to optimize conversion rates.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Default Layout</InputLabel>
                  <Select
                    name="defaultLayout"
                    value={settings.defaultLayout}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="modal">Modal Dialog</MenuItem>
                    <MenuItem value="sidebar">Sidebar</MenuItem>
                    <MenuItem value="inline">Inline Embed</MenuItem>
                    <MenuItem value="page">Full Page</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
