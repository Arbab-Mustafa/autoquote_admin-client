import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import DownloadIcon from '@mui/icons-material/Download';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const dummyLeads = [
  { name: 'John Doe', email: 'john@example.com', quoteId: 'A1B2C3' },
  { name: 'Jane Smith', email: 'jane@example.com', quoteId: 'D4E5F6' }
];

const exportLeads = () => {
  const csv = dummyLeads.map(row => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads.csv';
  a.click();
};

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [productFilter, setProductFilter] = useState('all');

  useEffect(() => {
    // Simulate API call to get analytics data
    const fetchAnalyticsData = async () => {
      try {
        // In a real app, this would call the backend API
        setTimeout(() => {
          setAnalyticsData(generateMockData());
          setLoading(false);
        }, 1500);
      } catch (error) {
        setError('Failed to load analytics data');
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange, productFilter]);

  const generateMockData = () => {
    // Generate dates for the selected time range
    const dates = [];
    const now = new Date();
    let days;
    
    switch (timeRange) {
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
      case '1y':
        days = 365;
        break;
      default:
        days = 30;
    }
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    // Generate quote data
    const quoteData = dates.map(() => Math.floor(Math.random() * 50) + 10);
    const conversionData = dates.map(() => Math.floor(Math.random() * 10));
    
    // Generate product distribution data
    const productDistribution = {
      vsc: Math.floor(Math.random() * 40) + 30, // 30-70%
      gap: Math.floor(Math.random() * 20) + 10, // 10-30%
      tire: Math.floor(Math.random() * 15) + 5, // 5-20%
      dent: Math.floor(Math.random() * 10) + 5  // 5-15%
    };
    
    // Generate provider performance data
    const providerPerformance = [
      { name: 'Provider A', quotes: Math.floor(Math.random() * 500) + 300, conversions: Math.floor(Math.random() * 50) + 30 },
      { name: 'Provider B', quotes: Math.floor(Math.random() * 400) + 200, conversions: Math.floor(Math.random() * 40) + 20 },
      { name: 'Provider C', quotes: Math.floor(Math.random() * 300) + 100, conversions: Math.floor(Math.random() * 30) + 10 },
      { name: 'Provider D', quotes: Math.floor(Math.random() * 200) + 50, conversions: Math.floor(Math.random() * 20) + 5 }
    ];
    
    // Calculate totals
    const totalQuotes = quoteData.reduce((sum, val) => sum + val, 0);
    const totalConversions = conversionData.reduce((sum, val) => sum + val, 0);
    const conversionRate = totalQuotes > 0 ? (totalConversions / totalQuotes * 100).toFixed(1) : 0;
    
    // Calculate revenue (assuming average sale of $1000)
    const revenue = totalConversions * 1000;
    
    return {
      dates,
      quoteData,
      conversionData,
      productDistribution,
      providerPerformance,
      summary: {
        totalQuotes,
        totalConversions,
        conversionRate,
        revenue
      }
    };
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleProductFilterChange = (event) => {
    setProductFilter(event.target.value);
  };

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV or Excel file
    alert('Analytics data export initiated. The file would be downloaded in a real application.');
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

  const quoteChartData = {
    labels: analyticsData.dates,
    datasets: [
      {
        label: 'Quotes',
        data: analyticsData.quoteData,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const conversionChartData = {
    labels: analyticsData.dates,
    datasets: [
      {
        label: 'Conversions',
        data: analyticsData.conversionData,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const productDistributionData = {
    labels: ['VSC', 'GAP', 'Tire & Wheel', 'Dent & Ding'],
    datasets: [
      {
        data: [
          analyticsData.productDistribution.vsc,
          analyticsData.productDistribution.gap,
          analyticsData.productDistribution.tire,
          analyticsData.productDistribution.dent
        ],
        backgroundColor: [
          '#4a90e2',
          '#f5a623',
          '#7ed321',
          '#bd10e0'
        ],
        borderWidth: 1
      }
    ]
  };

  const providerPerformanceData = {
    labels: analyticsData.providerPerformance.map(p => p.name),
    datasets: [
      {
        label: 'Quotes',
        data: analyticsData.providerPerformance.map(p => p.quotes),
        backgroundColor: 'rgba(74, 144, 226, 0.7)'
      },
      {
        label: 'Conversions',
        data: analyticsData.providerPerformance.map(p => p.conversions),
        backgroundColor: 'rgba(76, 175, 80, 0.7)'
      }
    ]
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
              size="small"
            >
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
              <MenuItem value="90d">Last 90 Days</MenuItem>
              <MenuItem value="1y">Last Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Product</InputLabel>
            <Select
              value={productFilter}
              label="Product"
              onChange={handleProductFilterChange}
              size="small"
            >
              <MenuItem value="all">All Products</MenuItem>
              <MenuItem value="vsc">VSC</MenuItem>
              <MenuItem value="gap">GAP</MenuItem>
              <MenuItem value="tire">Tire & Wheel</MenuItem>
              <MenuItem value="dent">Dent & Ding</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            onClick={handleExportData}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Quotes
              </Typography>
              <Typography variant="h4">
                {analyticsData.summary.totalQuotes.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Conversions
              </Typography>
              <Typography variant="h4">
                {analyticsData.summary.totalConversions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h4">
                {analyticsData.summary.conversionRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h4">
                ${analyticsData.summary.revenue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Quote Activity" />
          <Tab label="Product Distribution" />
          <Tab label="Provider Performance" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Quote Volume
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={quoteChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Conversion Volume
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line 
                  data={conversionChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Product Distribution
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
                <Pie 
                  data={productDistributionData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Product Performance
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2">VSC (Vehicle Service Contract)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '70%', mr: 2 }}>
                    <Box sx={{ width: `${analyticsData.productDistribution.vsc}%`, height: 10, bgcolor: '#4a90e2', borderRadius: 5 }} />
                  </Box>
                  <Typography variant="body2">{analyticsData.productDistribution.vsc}%</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Most popular product with highest conversion rate.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2">GAP Insurance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '70%', mr: 2 }}>
                    <Box sx={{ width: `${analyticsData.productDistribution.gap}%`, height: 10, bgcolor: '#f5a623', borderRadius: 5 }} />
                  </Box>
                  <Typography variant="body2">{analyticsData.productDistribution.gap}%</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Strong performer for new vehicle purchases.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2">Tire & Wheel Protection</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '70%', mr: 2 }}>
                    <Box sx={{ width: `${analyticsData.productDistribution.tire}%`, height: 10, bgcolor: '#7ed321', borderRadius: 5 }} />
                  </Box>
                  <Typography variant="body2">{analyticsData.productDistribution.tire}%</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Popular add-on product, often purchased with VSC.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2">Dent & Ding Protection</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '70%', mr: 2 }}>
                    <Box sx={{ width: `${analyticsData.productDistribution.dent}%`, height: 10, bgcolor: '#bd10e0', borderRadius: 5 }} />
                  </Box>
                  <Typography variant="body2">{analyticsData.productDistribution.dent}%</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Opportunity for growth with targeted marketing.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Provider Performance
          </Typography>
          <Box sx={{ height: 400 }}>
            <Bar 
              data={providerPerformanceData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </Box>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {analyticsData.providerPerformance.map((provider, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{provider.name}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="textSecondary">
                        Quotes: {provider.quotes}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Conversions: {provider.conversions}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Rate: {((provider.conversions / provider.quotes) * 100).toFixed(1)}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Analytics;
