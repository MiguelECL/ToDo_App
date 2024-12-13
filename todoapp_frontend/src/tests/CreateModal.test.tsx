import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateModal from "../components/presentational/CreateModal";
import {test, expect, vitest} from "vitest";
import '@testing-library/jest-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

test('renders Add To Do button', () => {
  render(<CreateModal update={false} setUpdate={() => {}} />);
  expect(screen.getByText('Add To Do')).toBeInTheDocument();
});

test('opens and closes the modal dialog', async () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CreateModal update={false} setUpdate={() => { }} />
    </LocalizationProvider>
  );

  // Open the modal
  await userEvent.click(screen.getByText('Add To Do'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Close the modal
  await fireEvent.click(document.body, {clientX: 20, clientY: 20});
  await fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
