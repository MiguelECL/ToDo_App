import { expect, test, vi, describe } from 'vitest';
import React from 'react';
import App from '../App';
import { createRoot } from 'react-dom/client';

// Mock createRoot
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn().mockReturnValue({
    render: vi.fn(),
  }),
}));

describe('index.tsx', () => {
  test('renders without crashing', () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Require the index file after setting up the mock
    require('../index');

  });
});