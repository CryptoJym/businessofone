// Setup file for DOM/React tests
// This file runs before each DOM test suite

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Set test environment
process.env.NODE_ENV = 'test';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
global.sessionStorage = localStorageMock;

// DOM test utilities
global.domUtils = {
  // Wait for element to appear
  waitForElement: async (testId, container = document) => {
    const element = await screen.findByTestId(testId, { container });
    return element;
  },
  
  // Simulate user typing
  typeIntoInput: async (input, text) => {
    await userEvent.clear(input);
    await userEvent.type(input, text);
  },
  
  // Get computed styles
  getStyles: (element) => window.getComputedStyle(element),
  
  // Check if element is visible
  isVisible: (element) => {
    const styles = window.getComputedStyle(element);
    return styles.display !== 'none' && 
           styles.visibility !== 'hidden' && 
           styles.opacity !== '0';
  },
  
  // Create mock event
  createMockEvent: (type, props = {}) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(event, props);
    return event;
  },
};

// Custom render function with common providers
global.renderWithProviders = (ui, options = {}) => {
  const { initialState = {}, ...renderOptions } = options;
  
  // Add common providers here (Redux, Router, Theme, etc.)
  const Wrapper = ({ children }) => {
    return children;
  };
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Cleanup after each test
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});