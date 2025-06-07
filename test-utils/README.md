# Test Utilities

This directory contains utilities and setup files for different types of tests in the Business of One project.

## Setup Files

### `setup-unit.js`
- Configures environment for unit tests
- Provides global test utilities
- Mocks console methods to reduce noise
- Custom matchers for common assertions

### `setup-integration.js`
- Configures environment for integration tests
- Mocks external services (HTTP, database, filesystem)
- Provides integration test utilities
- Server creation helpers

### `setup-dom.js`
- Configures environment for DOM/React tests
- Sets up Testing Library
- Mocks browser APIs (matchMedia, IntersectionObserver, etc.)
- Provides DOM test utilities

## Available Utilities

### Unit Test Utilities (`testUtils`)
```javascript
testUtils.delay(ms)           // Promise-based delay
testUtils.mockFn(returnValue) // Create mock function
testUtils.mockAsyncFn(value)  // Create async mock function
testUtils.generateId()        // Generate random ID
```

### Integration Test Utilities (`integrationUtils`)
```javascript
integrationUtils.createTestServer(app)     // Create test server
integrationUtils.waitFor(condition, timeout) // Wait for condition
integrationUtils.createTestData(overrides)  // Generate test data
```

### DOM Test Utilities (`domUtils`)
```javascript
domUtils.waitForElement(testId)        // Wait for element by test ID
domUtils.typeIntoInput(input, text)    // Simulate typing
domUtils.getStyles(element)            // Get computed styles
domUtils.isVisible(element)            // Check visibility
domUtils.createMockEvent(type, props)  // Create mock event
```

### Mock Services (`mockExternalServices`)
```javascript
// HTTP Client Mock
mockExternalServices.mockHttpClient.get()
mockExternalServices.mockHttpClient.post()
mockExternalServices.mockHttpClient.put()
mockExternalServices.mockHttpClient.delete()

// Database Mock
mockExternalServices.mockDb.connect()
mockExternalServices.mockDb.query()
mockExternalServices.mockDb.transaction()

// File System Mock
mockExternalServices.mockFs.readFile()
mockExternalServices.mockFs.writeFile()
mockExternalServices.mockFs.exists()
```

## Mock Files

### `mocks/styleMock.js`
Returns empty object for CSS imports in tests.

### `mocks/fileMock.js`
Returns string stub for file imports (images, etc.) in tests.

## Usage Examples

### Using test utilities
```javascript
// In your test file
it('should delay execution', async () => {
  const start = Date.now();
  await testUtils.delay(100);
  const end = Date.now();
  expect(end - start).toBeGreaterThanOrEqual(100);
});
```

### Using mock services
```javascript
it('should handle API calls', async () => {
  mockExternalServices.mockHttpClient.get.mockResolvedValue({
    data: { users: [] }
  });
  
  const result = await fetchUsers();
  expect(mockExternalServices.mockHttpClient.get).toHaveBeenCalledWith('/api/users');
});
```

### Using DOM utilities
```javascript
it('should render and interact with form', async () => {
  render(<ContactForm />);
  
  const input = screen.getByLabelText('Email');
  await domUtils.typeIntoInput(input, 'test@example.com');
  
  expect(input.value).toBe('test@example.com');
});
```

## Best Practices

1. **Use appropriate utilities for test type** - Don't use DOM utilities in unit tests
2. **Reset mocks between tests** - Handled automatically in setup files
3. **Leverage global utilities** - Avoid recreating common functionality
4. **Keep mocks simple** - Only mock what you need for the test

## Adding New Utilities

To add new utilities:

1. Add to appropriate setup file
2. Document in this README
3. Add TypeScript definitions if needed
4. Include usage examples