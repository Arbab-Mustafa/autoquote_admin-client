import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { ChromePicker } from 'react-color';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';


const generateEmbedCode = (dealerId) => {
  return `<script src="https://yourdomain.com/widget-loader.js" data-api-url="https://api.yourdomain.com" data-dealer-id="${dealerId}"></script>`;
};

const Branding = () => {
  const [dealerId, setDealerId] = React.useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [brandingSettings, setBrandingSettings] = useState({
    logo: '/logo.png',
    primaryColor: '#4a90e2',
    secondaryColor: '#f5a623',
    fontFamily: 'Arial, sans-serif',
    buttonStyle: 'rounded',
    modalPosition: 'bottom-right'
  });
  const [showColorPicker, setShowColorPicker] = useState(null);

  useEffect(() => {
    // Simulate API call to get branding settings
    const fetchBrandingSettings = async () => {
      try {
        // In a real app, this would call the backend API
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load branding settings');
        setLoading(false);
      }
    };

    fetchBrandingSettings();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (color, type) => {
    setBrandingSettings({
      ...brandingSettings,
      [type]: color.hex
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandingSettings({
      ...brandingSettings,
      [name]: value
    });
  };

  const handleSaveChanges = () => {
    // In a real app, this would call the backend API to save changes
    alert('Branding settings saved successfully!');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would upload the file to a server
      // For this demo, we'll just use a local URL
      const reader = new FileReader();
      reader.onload = () => {
        setBrandingSettings({
          ...brandingSettings,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Branding Customization</Typography>
        <Button 
          variant="contained" 
          startIcon={<SaveIcon />}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Visual Settings" />
          <Tab label="Widget Preview" />
          <Tab label="Modal Preview" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {/* Logo Upload */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Logo
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Card sx={{ width: 200, height: 100, mr: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image={brandingSettings.logo}
                    alt="Company Logo"
                    sx={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                  />
                </Card>
                <Box>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="logo-upload"
                    type="file"
                    onChange={handleLogoUpload}
                  />
                  <label htmlFor="logo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Logo
                    </Button>
                  </label>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Recommended size: 400x200px, PNG or SVG with transparent background
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Color Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Colors
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Primary Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: brandingSettings.primaryColor,
                        mr: 2,
                        cursor: 'pointer',
                        border: '1px solid #ccc'
                      }}
                      onClick={() => setShowColorPicker(showColorPicker === 'primary' ? null : 'primary')}
                    />
                    <TextField
                      value={brandingSettings.primaryColor}
                      size="small"
                      onChange={(e) => handleInputChange({ target: { name: 'primaryColor', value: e.target.value } })}
                    />
                  </Box>
                  {showColorPicker === 'primary' && (
                    <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
                      <Box sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={() => setShowColorPicker(null)} />
                      <ChromePicker
                        color={brandingSettings.primaryColor}
                        onChange={(color) => handleColorChange(color, 'primaryColor')}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Secondary Color
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        bgcolor: brandingSettings.secondaryColor,
                        mr: 2,
                        cursor: 'pointer',
                        border: '1px solid #ccc'
                      }}
                      onClick={() => setShowColorPicker(showColorPicker === 'secondary' ? null : 'secondary')}
                    />
                    <TextField
                      value={brandingSettings.secondaryColor}
                      size="small"
                      onChange={(e) => handleInputChange({ target: { name: 'secondaryColor', value: e.target.value } })}
                    />
                  </Box>
                  {showColorPicker === 'secondary' && (
                    <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
                      <Box sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={() => setShowColorPicker(null)} />
                      <ChromePicker
                        color={brandingSettings.secondaryColor}
                        onChange={(color) => handleColorChange(color, 'secondaryColor')}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Typography & Layout */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Typography & Layout
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Font Family</InputLabel>
                    <Select
                      name="fontFamily"
                      value={brandingSettings.fontFamily}
                      label="Font Family"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Arial, sans-serif">Arial</MenuItem>
                      <MenuItem value="'Roboto', sans-serif">Roboto</MenuItem>
                      <MenuItem value="'Open Sans', sans-serif">Open Sans</MenuItem>
                      <MenuItem value="'Montserrat', sans-serif">Montserrat</MenuItem>
                      <MenuItem value="'Lato', sans-serif">Lato</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Button Style</InputLabel>
                    <Select
                      name="buttonStyle"
                      value={brandingSettings.buttonStyle}
                      label="Button Style"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="rounded">Rounded</MenuItem>
                      <MenuItem value="pill">Pill</MenuItem>
                      <MenuItem value="square">Square</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Widget Position</InputLabel>
                    <Select
                      name="modalPosition"
                      value={brandingSettings.modalPosition}
                      label="Widget Position"
                      onChange={handleInputChange}
                    >
                      <MenuItem value="bottom-right">Bottom Right</MenuItem>
                      <MenuItem value="bottom-left">Bottom Left</MenuItem>
                      <MenuItem value="top-right">Top Right</MenuItem>
                      <MenuItem value="top-left">Top Left</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Widget Preview
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 800, height: 500, border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden' }}>
              {/* Simulated website */}
              <Box sx={{ p: 2, bgcolor: '#f9f9f9', height: '100%' }}>
                <Typography variant="h5" gutterBottom>Example Dealer Website</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Button variant="contained" size="small">Home</Button>
                  <Button variant="outlined" size="small">Inventory</Button>
                  <Button variant="outlined" size="small">Services</Button>
                  <Button variant="outlined" size="small">Contact</Button>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6">2018 Ford F-150 XLT</Typography>
                <Typography variant="body1" gutterBottom>$31,295</Typography>
                <Typography variant="body2" paragraph>VIN: 1FTFW1E57JFC12345 | Mileage: 48,722</Typography>
                
                {/* Widget button */}
                <Box sx={{ 
                  position: 'absolute', 
                  [brandingSettings.modalPosition.split('-')[0]]: 20, 
                  [brandingSettings.modalPosition.split('-')[1]]: 20 
                }}>
                  <Button 
                    variant="contained"
                    sx={{ 
                      bgcolor: brandingSettings.primaryColor,
                      color: '#ffffff',
                      fontFamily: brandingSettings.fontFamily,
                      borderRadius: brandingSettings.buttonStyle === 'rounded' ? 1 : 
                                   brandingSettings.buttonStyle === 'pill' ? 20 : 0,
                      '&:hover': {
                        bgcolor: brandingSettings.primaryColor,
                        opacity: 0.9
                      }
                    }}
                  >
                    Get Protection Plan
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Modal Preview
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 800, height: 500, border: '1px solid #ccc', borderRadius: 1, overflow: 'hidden', bgcolor: 'rgba(0,0,0,0.5)' }}>
              {/* Modal */}
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: 700,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  borderBottom: '1px solid #eaeaea'
                }}>
                  <Typography variant="h6" sx={{ fontFamily: brandingSettings.fontFamily }}>
                    Vehicle Protection Options
                  </Typography>
                  <IconButton size="small">×</IconButton>
                </Box>
                
                <Box sx={{ p: 2 }}>
                  <Box sx={{ 
                    p: 2, 
                    mb: 2, 
                    bgcolor: '#f9f9f9', 
                    borderRadius: 1 
                  }}>
                    <Typography variant="h6" sx={{ fontFamily: brandingSettings.fontFamily }}>
                      2018 Ford F-150 XLT
                    </Typography>
                    <Typography variant="body2">
                      VIN: 1FTFW1E57JFC12345 | Mileage: 48,722 miles
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Tabs value={0}>
                      <Tab label="VSC" sx={{ fontFamily: brandingSettings.fontFamily }} />
                      <Tab label="GAP" sx={{ fontFamily: brandingSettings.fontFamily }} />
                      <Tab label="Tire" sx={{ fontFamily: brandingSettings.fontFamily }} />
                    </Tabs>
                  </Box>
                  
                  <Card sx={{ mb: 2, border: `2px solid ${brandingSettings.primaryColor}` }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontFamily: brandingSettings.fontFamily }}>
                            Premium Coverage
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Provider A
                          </Typography>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">
                              Term: 36 months | Mileage: 36,000 miles | Deductible: $100
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h5" sx={{ fontFamily: brandingSettings.fontFamily }}>
                            $1,295
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            One-time payment
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="outlined" size="small">
                          View Details
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small"
                          sx={{ 
                            bgcolor: brandingSettings.primaryColor,
                            color: '#ffffff',
                            fontFamily: brandingSettings.fontFamily,
                            borderRadius: brandingSettings.buttonStyle === 'rounded' ? 1 : 
                                        brandingSettings.buttonStyle === 'pill' ? 20 : 0,
                            '&:hover': {
                              bgcolor: brandingSettings.primaryColor,
                              opacity: 0.9
                            }
                          }}
                        >
                          Continue
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                  
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                    Coverage is subject to terms and conditions of the service contract.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Branding;
