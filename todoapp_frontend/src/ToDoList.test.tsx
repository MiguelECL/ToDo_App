import { render, screen, fireEvent } from "@testing-library/react";
import { describe, beforeEach, test, expect, vi } from "vitest";
import ToDoList from "./ToDoList";
import { TimeDataContext } from "./context/TimeDataContext";

const mockSetUpdate = vi.fn();
const mockSetTodoData = vi.fn();
const mockHandleOpen = vi.fn();
const mockHandleClose = vi.fn();
const mockHandlePrioritySort = vi.fn();
const mockHandleDateSort = vi.fn();
const mockHandleCheck = vi.fn();
const mockHandleEdit = vi.fn();
const mockHandleDelete = vi.fn();
const mockHandlePaginatePrev = vi.fn();
const mockHandlePaginateNext = vi.fn();
const mockToDoRowStyle = vi.fn();

const mockContextValue = {
    timeTotal: 0,
    timeHigh: 0,
    timeMedium: 0,
    timeLow: 0,
    setTimeTotal: vi.fn(),
    setTimeHigh: vi.fn(),
    setTimeMedium: vi.fn(),
    setTimeLow: vi.fn(),
};

const renderComponent = () => {
    render(
        <TimeDataContext.Provider value={mockContextValue}>
            <ToDoList
                endpoint="testEndpoint"
                searchParameters={["", "", ""]}
                update={false}
                setUpdate={mockSetUpdate}
            />
        </TimeDataContext.Provider>
    );
};

describe("ToDoList Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });


    test("calls setUpdate on priority sort", () => {
        renderComponent();
        fireEvent.click(screen.getByRole("button", { name: /priority/i }));
        expect(mockSetUpdate).toHaveBeenCalled();
    });

    test("calls setUpdate on date sort", () => {
        renderComponent();
        fireEvent.click(screen.getByRole("button", { name: /due date/i }));
        expect(mockSetUpdate).toHaveBeenCalled();
    });

});
