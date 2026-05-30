/**
 * Globex Sales Dashboard - Entry Point
 * Main application entry point for the dashboard server
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS support
app.use(express.json()); // JSON parsing
app.use(express.urlencoded({ extended: true })); // URL-encoded parsing

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    name: 'Globex Sales Dashboard API',
    version: '1.0.0',
    description: 'API for sales tracking and analytics',
    status: 'operational',
  });
});

// Placeholder route for sales
app.get('/api/sales', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Sales endpoint - implementation pending',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested endpoint does not exist',
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    ========================================
    Globex Sales Dashboard
    ========================================
    Server running on port ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    ========================================
  `);
});

export default app;
