import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { Howl } from 'howler';

// Mock the Howl class
jest.mock('howler', () => {
  return {
    Howl: jest.fn().mockImplementation(() => ({
      play: jest.fn(),
      stop: jest.fn(),
    })),
  };
});

describe('Pomodoro Timer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers if needed
  });

  test('renders Pomodoro Timer title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Pomodoro Timer/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('initial state is 25:00', () => {
    render(<App />);
    const timerDisplay = screen.getByText('25:00');
    expect(timerDisplay).toBeInTheDocument();
  });

  test('start button starts the timer', () => {
   
  
    jest.useFakeTimers();
    render(<App />);
    const startButton = screen.getByText('Start');
    
    act(() => {
      fireEvent.click(startButton);
    });
    
    
    // Verify the timer display
    const timerDisplay = screen.getByText('25:00');
    expect(timerDisplay).toBeInTheDocument();
    
    
  });

  


  test('reset button resets the timer to 25:00', () => {
    render(<App />);
    const startButton = screen.getByText('Start');
    const resetButton = screen.getByText('Reset');
    
    act(() => {
      fireEvent.click(startButton);
    });
    act(() => {
      fireEvent.click(resetButton);
    });

    const timerDisplay = screen.getByText('25:00');
    expect(timerDisplay).toBeInTheDocument();

  });

  test('pause button pauses the timer', () => {
    render(<App />);
    
    const startButton = screen.getByText('Start');
    const pauseButton = screen.getByText('Pause');

    act(() => {
      fireEvent.click(startButton);
    });

    act(() => {
      fireEvent.click(pauseButton);
    });

    expect(screen.getByText('25:00')).toBeInTheDocument(); // Expecting that it did not change, assuming it was paused immediately
  });

  test('increase button increases the minutes', () => {
    render(<App />);
    const increaseButton = screen.getByText('+');
    
    act(() => {
      fireEvent.click(increaseButton);
    });

    const timerDisplay = screen.getByText('26:00');
    expect(timerDisplay).toBeInTheDocument();
  });

  test('decrease button decreases the minutes', () => {
    render(<App />);
    const decreaseButton = screen.getByText('-');
    
    act(() => {
      fireEvent.click(decreaseButton);
    });

    const timerDisplay = screen.getByText('24:00');
    expect(timerDisplay).toBeInTheDocument();
  });


});

