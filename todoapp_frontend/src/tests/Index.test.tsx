import { expect, test } from "vitest";
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Corrected import statement
import App from '../App';

test('expects 1 to be 1', () => {
  expect(1).toBe(1);
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);

  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    { container: div }
  );

  expect(div.querySelector('div')).toBeInTheDocument();
});

