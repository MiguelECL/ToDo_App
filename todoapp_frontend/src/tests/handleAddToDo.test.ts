// handleAddToDo.test.ts
import { vi, describe, test, expect, beforeEach, Mock } from 'vitest';
import { handleAddToDo } from '../components/container/handleAddTodo';
import { SyntheticEvent } from 'react';

describe('handleAddToDo', () => {
  // Mock setup
  const mockEvent = {
    preventDefault: vi.fn()
  } as unknown as React.SyntheticEvent;

  const mockSetUpdate = vi.fn();
  const mockSetName = vi.fn();

  const mockAdd = {
    id: 123,
    name: 'Test Todo',
    setName: mockSetName,
    priority: 'High',
    setPriority: vi.fn(),
    dueDate: '2024-03-12',
    doneFlag: false,
    doneDate: '',
    creationDate: '2024-03-12'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  test('should submit todo when name is not empty', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true
    });

    await handleAddToDo(mockEvent, mockAdd, false, mockSetUpdate);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:9090/todos',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockAdd)
      })
    );
    expect(mockSetName).toHaveBeenCalledWith('');
    expect(mockSetUpdate).toHaveBeenCalledWith(true);
  });

  test('should not submit when name is empty', async () => {
    const emptyNameAdd = { ...mockAdd, name: '  ' };
    
    await handleAddToDo(mockEvent, emptyNameAdd, false, mockSetUpdate);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(mockSetName).not.toHaveBeenCalled();
    expect(mockSetUpdate).not.toHaveBeenCalled();
  });

});

