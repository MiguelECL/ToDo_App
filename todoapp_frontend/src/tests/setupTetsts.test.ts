// setupTests.test.ts
import { expect, test } from 'vitest';

test('custom jest-dom matchers are available', () => {
  // Create a simple DOM element
  const element = document.createElement('div');
  element.textContent = 'Hello, World!';

  // Use jest-dom matcher to verify the text content
  expect(element).toHaveTextContent('Hello, World!');
});