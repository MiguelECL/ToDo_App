import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToDoListPresentation } from './ToDoListPresentation';
import dayjs from 'dayjs';
import { act } from 'react'; // Update this import

const mockProps = {
    isLoading: false,
    currentToDos: [
        { id: 1, name: 'Test ToDo 1', priority: 'High', dueDate: '2023-12-31', creationDate: '2023-01-01', doneFlag: false },
        { id: 2, name: 'Test ToDo 2', priority: 'Medium', dueDate: '2023-11-30', creationDate: '2023-02-01', doneFlag: true }
    ],
    currentPage: 1,
    toDos: [
        { id: 1, name: 'Test ToDo 1', priority: 'High', dueDate: '2023-12-31', creationDate: '2023-01-01', doneFlag: false },
        { id: 2, name: 'Test ToDo 2', priority: 'Medium', dueDate: '2023-11-30', creationDate: '2023-02-01', doneFlag: true }
    ],
    open: false,
    todoData: { name: '', priority: '', dueDate: '', doneFlag: false },
    handlePrioritySort: vi.fn(),
    handleDateSort: vi.fn(),
    handleCheck: vi.fn(),
    handleOpen: vi.fn(),
    handleClose: vi.fn(),
    handleEdit: vi.fn(),
    handleDelete: vi.fn(),
    handlePaginatePrev: vi.fn(),
    handlePaginateNext: vi.fn(),
    setTodoData: vi.fn(),
    ToDoRowStyle: vi.fn().mockReturnValue({})
};

describe('ToDoListPresentation Component', () => {
    it('renders without crashing', () => {
        act(() => { // Wrap render in act
            render(<ToDoListPresentation {...mockProps} />);
        });
        expect(screen.getByText('Priority <>')).toBeInTheDocument();
        expect(screen.getByText('Due Date <>')).toBeInTheDocument();
    });

    it('calls handlePrioritySort when priority button is clicked', () => {
        act(() => { // Wrap render in act
            render(<ToDoListPresentation {...mockProps} />);
        });
        fireEvent.click(screen.getByText('Priority <>'));
        expect(mockProps.handlePrioritySort).toHaveBeenCalled();
    });

    it('calls handleDateSort when date button is clicked', () => {
        act(() => { // Wrap render in act
            render(<ToDoListPresentation {...mockProps} />);
        });
        fireEvent.click(screen.getByText('Due Date <>'));
        expect(mockProps.handleDateSort).toHaveBeenCalled();
    });

    it('calls handleCheck when toggle button is clicked', () => {
        act(() => { // Wrap render in act
            render(<ToDoListPresentation {...mockProps} />);
        });
        fireEvent.click(screen.getAllByText('Toggle')[0]);
        expect(mockProps.handleCheck).toHaveBeenCalled();
    });

    it('calls handlePaginatePrev when previous page button is clicked', () => {
        act(() => { // Wrap render in act
            render(<ToDoListPresentation {...mockProps} currentPage={2} />);
        });
        fireEvent.click(screen.getByText('1'));
        expect(mockProps.handlePaginatePrev).toHaveBeenCalled();
    });
    
});
