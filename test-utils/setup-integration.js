// Setup file for integration tests
// This file runs before each integration test suite

// Set test environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce noise in tests

// Mock external services
global.mockExternalServices = {
  // Mock HTTP requests
  mockHttpClient: {
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} }),
  },
  
  // Mock database connections
  mockDb: {
    connect: jest.fn().mockResolvedValue(true),
    disconnect: jest.fn().mockResolvedValue(true),
    query: jest.fn().mockResolvedValue({ rows: [] }),
    transaction: jest.fn().mockImplementation(async (callback) => {
      return callback({
        query: jest.fn().mockResolvedValue({ rows: [] }),
        commit: jest.fn().mockResolvedValue(true),
        rollback: jest.fn().mockResolvedValue(true),
      });
    }),
  },
  
  // Mock file system operations
  mockFs: {
    readFile: jest.fn().mockResolvedValue('file content'),
    writeFile: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
    mkdir: jest.fn().mockResolvedValue(true),
  },
};

// Integration test utilities
global.integrationUtils = {
  // Create a test server instance
  createTestServer: (app) => {
    const server = app.listen(0); // Random port
    return {
      server,
      port: server.address().port,
      close: () => new Promise((resolve) => server.close(resolve)),
    };
  },
  
  // Wait for a condition to be true
  waitFor: async (condition, timeout = 5000, interval = 100) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) return true;
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    throw new Error('Timeout waiting for condition');
  },
  
  // Create test data
  createTestData: (overrides = {}) => ({
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }),
};

// Setup and teardown
beforeAll(async () => {
  // Setup test database, clear caches, etc.
});

afterAll(async () => {
  // Cleanup resources
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});