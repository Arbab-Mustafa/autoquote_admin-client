import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState({
    vsc: { enabled: true, name: 'Vehicle Service Contract', description: 'Covers mechanical breakdowns and repairs.' },
    gap: { enabled: true, name: 'GAP Insurance', description: 'Covers the difference between what you owe and what your vehicle is worth.' },
    tire: { enabled: true, name: 'Tire & Wheel Protection', description: 'Covers damage to tires and wheels from road hazards.' },
    dent: { enabled: true, name: 'Dent & Ding Protection', description: 'Covers minor dents and dings on your vehicle.' }
  });
  
  const [stateRestrictions, setStateRestrictions] = useState({
    gap: ['NY', 'CA'],
    vsc: [],
    tire: [],
    dent: []
  });
  
  const [selectedProduct, setSelectedProduct] = useState('vsc');
  const [recommendationRules, setRecommendationRules] = useState({
    vsc: { newVehicle: true, usedVehicle: true, highMileage: false },
    gap: { newVehicle: true, usedVehicle: true, highMileage: false },
    tire: { newVehicle: true, usedVehicle: true, highMileage: true },
    dent: { newVehicle: true, usedVehicle: true, highMileage: true }
  });

  useEffect(() => {
    // Simulate API call to get product settings
    const fetchProductSettings = async () => {
      try {
        // In a real app, this would call the backend API
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load product settings');
        setLoading(false);
      }
    };

    fetchProductSettings();
  }, []);

  const handleProductToggle = (productId) => {
    setProducts({
      ...products,
      [productId]: {
        ...products[productId],
        enabled: !products[productId].enabled
      }
    });
  };

  const handleProductNameChange = (productId, value) => {
    setProducts({
      ...products,
      [productId]: {
        ...products[productId],
        name: value
      }
    });
  };

  const handleProductDescriptionChange = (productId, value) => {
    setProducts({
      ...products,
      [productId]: {
        ...products[productId],
        description: value
      }
    });
  };

  const handleRecommendationChange = (productId, rule, value) => {
    setRecommendationRules({
      ...recommendationRules,
      [productId]: {
        ...recommendationRules[productId],
        [rule]: value
      }
    });
  };

  const handleStateRestrictionChange = (productId, states) => {
    setStateRestrictions({
      ...stateRestrictions,
      [productId]: states
    });
  };

  const handleSaveChanges = () => {
    // In a real app, this would call the backend API to save changes
    alert('Product settings saved successfully!');
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

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Product Management</Typography>
        <Button 
          variant="contained" 
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Product Visibility */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Product Visibility
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Enable or disable products across the platform.
            </Typography>
            
            {Object.keys(products).map((productId) => (
              <FormControlLabel
                key={productId}
                control={
                  <Switch
                    checked={products[productId].enabled}
                    onChange={() => handleProductToggle(productId)}
                    color="primary"
                  />
                }
                label={products[productId].name}
                sx={{ display: 'block', mb: 2 }}
              />
            ))}
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Product</InputLabel>
              <Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                label="Select Product"
              >
                {Object.keys(products).map((productId) => (
                  <MenuItem key={productId} value={productId}>
                    {products[productId].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Display Name"
                  value={products[selectedProduct].name}
                  onChange={(e) => handleProductNameChange(selectedProduct, e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={products[selectedProduct].description}
                  onChange={(e) => handleProductDescriptionChange(selectedProduct, e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  margin="normal"
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Recommendation Rules
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Configure when this product should be recommended to customers.
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={recommendationRules[selectedProduct].newVehicle}
                      onChange={(e) => handleRecommendationChange(selectedProduct, 'newVehicle', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="New Vehicles"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={recommendationRules[selectedProduct].usedVehicle}
                      onChange={(e) => handleRecommendationChange(selectedProduct, 'usedVehicle', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Used Vehicles"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={recommendationRules[selectedProduct].highMileage}
                      onChange={(e) => handleRecommendationChange(selectedProduct, 'highMileage', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="High Mileage (75k+)"
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              State Restrictions
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Select states where this product is not available.
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Restricted States</InputLabel>
              <Select
                multiple
                value={stateRestrictions[selectedProduct]}
                onChange={(e) => handleStateRestrictionChange(selectedProduct, e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
