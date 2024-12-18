import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBox from '../components/presentational/FilterBox';
import { test, expect, vi, describe } from 'vitest';
import '@testing-library/jest-dom';

describe('FilterBox Component', () => {
  
  test('renders all filter fields and the search button', () => {
    render(<FilterBox update={false} setUpdate={vi.fn()} setSearchParameters={vi.fn()} />);

    // Check for Name TextField
    expect(screen.getByLabelText('Name')).toBeInTheDocument();

    // Check for Priority Select
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();

    // Check for Status Select

    // Check for Search Button
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

});