import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    baseUrl: '',
    apiKey: '',
    products: [],
    markup: 1.0,
    priority: 1,
    active: true
  });

  useEffect(() => {
    // Simulate API call to get providers
    const fetchProviders = async () => {
      try {
        // In a real app, this would call the backend API
        setTimeout(() => {
          const mockProviders = [
            {
              id: 'providerA',
              name: 'Provider A',
              baseUrl: 'https://api.provider-a.example.com',
              apiKey: '••••••••••••••••',
              products: ['vsc', 'gap'],
              markup: 1.2,
              priority: 1,
              active: true
            },
            {
              id: 'providerB',
              name: 'Provider B',
              baseUrl: 'https://api.provider-b.example.com',
              apiKey: '••••••••••••••••',
              products: ['vsc', 'tire', 'dent'],
              markup: 1.15,
              priority: 2,
              active: true
            },
            {
              id: 'providerC',
              name: 'Provider C',
              baseUrl: 'https://api.provider-c.example.com',
              apiKey: '••••••••••••••••',
              products: ['gap'],
              markup: 1.25,
              priority: 3,
              active: true
            },
            {
              id: 'providerD',
              name: 'Provider D',
              baseUrl: 'https://api.provider-d.example.com',
              apiKey: '••••••••••••••••',
              products: ['tire', 'dent'],
              markup: 1.3,
              priority: 4,
              active: false
            }
          ];
          setProviders(mockProviders);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load providers');
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleOpenDialog = (provider = null) => {
    if (provider) {
      setCurrentProvider(provider);
      setFormData({
        id: provider.id,
        name: provider.name,
        baseUrl: provider.baseUrl,
        apiKey: provider.apiKey,
        products: provider.products,
        markup: provider.markup,
        priority: provider.priority,
        active: provider.active
      });
    } else {
      setCurrentProvider(null);
      setFormData({
        id: '',
        name: '',
        baseUrl: '',
        apiKey: '',
        products: [],
        markup: 1.0,
        priority: providers.length + 1,
        active: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleProductsChange = (e) => {
    setFormData({
      ...formData,
      products: e.target.value
    });
  };

  const handleSubmit = () => {
    // In a real app, this would call the backend API
    if (currentProvider) {
      // Update existing provider
      const updatedProviders = providers.map(p => 
        p.id === currentProvider.id ? formData : p
      );
      setProviders(updatedProviders);
    } else {
      // Add new provider
      const newProvider = {
        ...formData,
        id: formData.id || `provider${Math.floor(Math.random() * 1000)}`
      };
      setProviders([...providers, newProvider]);
    }
    handleCloseDialog();
  };

  const handleDelete = (providerId) => {
    // In a real app, this would call the backend API
    const updatedProviders = providers.filter(p => p.id !== providerId);
    setProviders(updatedProviders);
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
        <Typography variant="h4">Provider Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Provider
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>API Endpoint</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Markup</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.baseUrl}</TableCell>
                <TableCell>
                  {provider.products.map(product => (
                    <Chip 
                      key={product} 
                      label={product.toUpperCase()} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }} 
                    />
                  ))}
                </TableCell>
                <TableCell>{(provider.markup * 100 - 100).toFixed(0)}%</TableCell>
                <TableCell>{provider.priority}</TableCell>
                <TableCell>
                  <Chip 
                    label={provider.active ? 'Active' : 'Inactive'} 
                    color={provider.active ? 'success' : 'default'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(provider)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleDelete(provider.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Provider Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentProvider ? `Edit Provider: ${currentProvider.name}` : 'Add New Provider'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Provider Name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="id"
                label="Provider ID"
                value={formData.id}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={!!currentProvider}
                helperText={currentProvider ? "ID cannot be changed" : "Unique identifier for this provider"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="baseUrl"
                label="API Base URL"
                value={formData.baseUrl}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="apiKey"
                label="API Key"
                value={formData.apiKey}
                onChange={handleInputChange}
                fullWidth
                required
                type="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Products</InputLabel>
                <Select
                  multiple
                  name="products"
                  value={formData.products}
                  onChange={handleProductsChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value.toUpperCase()} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="vsc">VSC (Vehicle Service Contract)</MenuItem>
                  <MenuItem value="gap">GAP Insurance</MenuItem>
                  <MenuItem value="tire">Tire & Wheel Protection</MenuItem>
                  <MenuItem value="dent">Dent & Ding Protection</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="markup"
                label="Markup (%)"
                value={(formData.markup * 100 - 100).toFixed(0)}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setFormData({
                      ...formData,
                      markup: (value / 100) + 1
                    });
                  }
                }}
                fullWidth
                type="number"
                InputProps={{
                  endAdornment: '%',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="priority"
                label="Priority"
                value={formData.priority}
                onChange={handleInputChange}
                fullWidth
                type="number"
                helperText="Lower number = higher priority"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={handleSwitchChange}
                    name="active"
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentProvider ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Providers;
