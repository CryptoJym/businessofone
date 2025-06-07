# Testing Infrastructure Guide

## Overview

The Business of One project uses a comprehensive testing infrastructure built on Jest and Testing Library. This guide covers everything you need to know about writing and running tests.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Test Types](#test-types)
3. [Running Tests](#running-tests)
4. [Writing Tests](#writing-tests)
5. [Test Structure](#test-structure)
6. [Mocking](#mocking)
7. [Best Practices](#best-practices)
8. [CI/CD Integration](#cicd-integration)
9. [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test type
npm run test:unit
npm run test:integration
npm run test:dom

# Run with coverage
npm run test:coverage
```

## Test Types

### 1. Unit Tests
- **Location**: `__tests__/unit/`
- **Purpose**: Test individual functions and modules in isolation
- **Environment**: Node.js
- **Example**: Testing utility functions, business logic, data transformations

### 2. Integration Tests
- **Location**: `__tests__/integration/`
- **Purpose**: Test how different parts of the system work together
- **Environment**: Node.js
- **Example**: API endpoints, database operations, service interactions

### 3. DOM Tests
- **Location**: `__tests__/dom/`
- **Purpose**: Test React components and DOM interactions
- **Environment**: jsdom
- **Example**: Component rendering, user interactions, form submissions

### 4. E2E Tests (Future)
- **Location**: `__tests__/e2e/`
- **Purpose**: Test complete user workflows
- **Environment**: Real browser
- **Example**: User registration flow, checkout process

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only DOM tests
npm run test:dom

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Advanced Usage

```bash
# Run tests matching a pattern
npm test -- agent-orchestrator

# Run tests in a specific file
npm test -- __tests__/unit/scripts/agent-orchestrator.test.js

# Update snapshots
npm test -- -u

# Run tests with verbose output
npm test -- --verbose

# Debug tests
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

## Writing Tests

### Unit Test Example

```javascript
// __tests__/unit/utils/calculator.test.js
const { add, multiply } = require('../../../utils/calculator');

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-1, 5)).toBe(4);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });
  });
});
```

### Integration Test Example

```javascript
// __tests__/integration/api/users.test.js
const request = require('supertest');
const app = require('../../../backend/app');

describe('Users API', () => {
  let server;

  beforeAll(() => {
    server = integrationUtils.createTestServer(app);
  });

  afterAll(async () => {
    await server.close();
  });

  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(server.server)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      ...userData
    });
  });
});
```

### DOM Test Example

```javascript
// __tests__/dom/components/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../frontend/src/components/Button';

describe('Button Component', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Test Structure

### File Organization

```
businessofone/
├── __tests__/
│   ├── unit/
│   │   ├── scripts/
│   │   │   └── agent-orchestrator.test.js
│   │   └── utils/
│   │       └── helpers.test.js
│   ├── integration/
│   │   ├── api/
│   │   │   └── endpoints.test.js
│   │   └── services/
│   │       └── database.test.js
│   ├── dom/
│   │   └── components/
│   │       └── Button.test.js
│   └── e2e/
│       └── workflows/
│           └── user-journey.test.js
└── test-utils/
    ├── setup-unit.js
    ├── setup-integration.js
    ├── setup-dom.js
    └── mocks/
        ├── fileMock.js
        └── styleMock.js
```

### Test Naming Conventions

- Test files: `*.test.js` or `*.spec.js`
- Test suites: Use `describe()` blocks
- Test cases: Start with "should" for clarity
- Be descriptive but concise

## Mocking

### Available Mock Utilities

#### Unit Tests
```javascript
// Available in global scope
testUtils.mockFn(returnValue)
testUtils.mockAsyncFn(returnValue)
testUtils.delay(ms)
testUtils.generateId()
```

#### Integration Tests
```javascript
// Mock external services
mockExternalServices.mockHttpClient
mockExternalServices.mockDb
mockExternalServices.mockFs

// Integration utilities
integrationUtils.createTestServer(app)
integrationUtils.waitFor(condition, timeout)
integrationUtils.createTestData(overrides)
```

#### DOM Tests
```javascript
// DOM utilities
domUtils.waitForElement(testId)
domUtils.typeIntoInput(input, text)
domUtils.getStyles(element)
domUtils.isVisible(element)
domUtils.createMockEvent(type, props)

// Custom render
renderWithProviders(component, options)
```

### Common Mocking Patterns

```javascript
// Mock a module
jest.mock('../../../services/email', () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}));

// Mock environment variables
process.env.API_KEY = 'test-key';

// Mock timers
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
jest.useRealTimers();

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  json: async () => ({ data: 'test' })
});
```

## Best Practices

### 1. Test Structure
- Follow AAA pattern: Arrange, Act, Assert
- One assertion per test when possible
- Use descriptive test names
- Group related tests with `describe` blocks

### 2. Test Isolation
- Each test should be independent
- Clean up after tests (handled automatically)
- Don't rely on test execution order
- Mock external dependencies

### 3. Performance
- Keep tests fast (< 100ms for unit tests)
- Use `beforeAll` for expensive setup
- Mock heavy operations
- Run tests in parallel when possible

### 4. Maintainability
- DRY principle: Extract common test utilities
- Update tests when changing code
- Remove obsolete tests
- Keep tests simple and readable

### 5. Coverage
- Aim for 70%+ coverage (configured threshold)
- Focus on critical paths
- Don't test implementation details
- Test edge cases and error scenarios

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linter
      run: npm run lint
      
    - name: Run tests
      run: npm run test:ci
      
    - name: Upload coverage
      uses: codecov/codecov-action@v2
```

### Pre-commit Hook

```bash
# Run before committing
npm run precommit
```

## Troubleshooting

### Common Issues

#### 1. Tests Timing Out
```javascript
// Increase timeout for specific test
it('should handle long operation', async () => {
  // test code
}, 10000); // 10 second timeout
```

#### 2. Module Not Found
```javascript
// Check jest.config.js moduleNameMapper
// Ensure paths are correct
```

#### 3. React Testing Errors
```javascript
// Wrap async operations properly
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

#### 4. Mock Not Working
```javascript
// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

### Debug Mode

```bash
# Run tests in debug mode
node --inspect-brk ./node_modules/.bin/jest --runInBand

# Then open chrome://inspect in Chrome
```

### Useful Flags

- `--runInBand`: Run tests serially
- `--bail`: Stop after first test failure
- `--onlyChanged`: Run tests related to changed files
- `--findRelatedTests`: Run tests for specific files
- `--maxWorkers=2`: Limit parallel execution

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

For questions or improvements to the testing infrastructure, please open an issue or submit a PR.