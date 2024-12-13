import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import {test, expect} from "vitest";

test('renders app', () => {
  const {container} = render(<App />);
  expect(container.firstChild);
});

test('renders todo list', () => {
  const {container} = render(<App />);
  expect(container.className == "ToDoList");
});
