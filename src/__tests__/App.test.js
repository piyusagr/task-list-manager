// src/__tests__/App.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

// Mocking axios.get
jest.mock('axios');

describe('App Component', () => {
  test('renders the task manager app', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Test Task 1', completed: false },
        { id: 2, title: 'Test Task 2', completed: true },
      ],
    });

    render(<App />);

    // Wait for tasks to be loaded
    await waitFor(() => screen.getByText('Test Task 1'));

    // Check if tasks are displayed
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  test('can filter tasks', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Test Task 1', completed: false },
        { id: 2, title: 'Test Task 2', completed: true },
      ],
    });

    render(<App />);

    await waitFor(() => screen.getByText('Test Task 1'));

    // Set filter to "Done"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Done' } });

    // Check if filtered task is visible
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Task 1')).toBeNull();
  });

  test('can search tasks', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Test Task 1', completed: false },
        { id: 2, title: 'Test Task 2', completed: true },
      ],
    });

    render(<App />);

    await waitFor(() => screen.getByText('Test Task 1'));

    // Search for "Task 2"
    fireEvent.change(screen.getByPlaceholderText('Search by Title or Description'), { target: { value: 'Task 2' } });

    // Check if the searched task is visible
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Task 1')).toBeNull();
  });
});
