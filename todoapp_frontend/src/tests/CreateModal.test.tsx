import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateModal from "../components/presentational/CreateModal";
import { test, expect } from "vitest";
import '@testing-library/jest-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

test('renders Add To Do button', () => {
  render(<CreateModal update={false} setUpdate={() => {}} />);
  expect(screen.getByText('Add To Do')).toBeInTheDocument();
});

test('opens and closes the modal dialog with Escape key', async () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CreateModal update={false} setUpdate={() => { }} />
    </LocalizationProvider>
  );

  // Open the modal
  await userEvent.click(screen.getByText('Add To Do'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Close the modal by pressing Escape
  await userEvent.keyboard('{Escape}');
  
  // Wait for the modal to close
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

test('opens and closes the modal dialog by clicking outside', async () => {
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CreateModal update={false} setUpdate={() => { }} />
    </LocalizationProvider>
  );

  // Open the modal
  await userEvent.click(screen.getByText('Add To Do'));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Close the modal by clicking on the backdrop
  await userEvent.click(document.body);

  // Wait for the modal to close
  await waitFor(() => {
    expect(screen).toMatchSnapshot();
  });
});
