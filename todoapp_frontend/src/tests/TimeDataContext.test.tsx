import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { expect, test, vi } from 'vitest';
import { useDataContext, TimeDataContext, TimeDataModel } from '../context/TimeDataContext';

const mockContextValue: TimeDataModel = {
    timeTotal: 100,
    setTimeTotal: vi.fn(),
    timeLow: 20,
    setTimeLow: vi.fn(),
    timeMedium: 30,
    setTimeMedium: vi.fn(),
    timeHigh: 50,
    setTimeHigh: vi.fn(),
};

test('useDataContext should throw error if used outside of TimeDataContext', () => {
    const { result } = renderHook(() => useDataContext());
    expect(result.error).toEqual(new Error("Must use TimeDataContext to avoid undefined behavior"));
});

test('useDataContext should return context value when used within TimeDataContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TimeDataContext.Provider value={mockContextValue}>
            {children}
        </TimeDataContext.Provider>
    );

    const { result } = renderHook(() => useDataContext(), { wrapper });
    expect(result.current).toEqual(mockContextValue);
});
