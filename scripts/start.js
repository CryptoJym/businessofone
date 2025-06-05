#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Handle graceful shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

let server;

function gracefulShutdown() {
  console.log('Received shutdown signal, shutting down gracefully...');
  
  if (server) {
    server.kill('SIGTERM');
    
    // Force kill after 30 seconds
    setTimeout(() => {
      console.log('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 30000);
  } else {
    process.exit(0);
  }
}

// Start the application
function startApp() {
  const env = Object.assign({}, process.env, {
    NODE_ENV: 'production',
    PORT: process.env.PORT || 3000
  });

  // Start the frontend server
  server = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '..'),
    env: env,
    stdio: 'inherit',
    shell: true
  });

  server.on('error', (error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

  server.on('exit', (code, signal) => {
    if (signal) {
      console.log(`Server was killed with signal ${signal}`);
    } else if (code !== 0) {
      console.log(`Server exited with code ${code}`);
      process.exit(code);
    }
  });

  console.log(`Server started in ${env.NODE_ENV} mode on port ${env.PORT}`);
}

// Start the application
startApp();