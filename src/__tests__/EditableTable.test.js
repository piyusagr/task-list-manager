// src/__tests__/EditableTable.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import EditableTable from '../components/EditableTable';
import { ToastContainer } from 'react-toastify';
import { notify } from '../components/Toast';

jest.mock('../components/Toast', () => ({
  notify: jest.fn(),
  ToastContainer: () => <div>Toast Container</div>,
}));

describe('EditableTable Component', () => {
  const tasks = [
    { id: 1, title: 'Test Task 1', description: 'Description 1', status: 'To Do' },
    { id: 2, title: 'Test Task 2', description: 'Description 2', status: 'Done' },
  ];
  
  test('renders tasks', () => {
    render(<EditableTable tasks={tasks} setTasks={() => {}} />);

    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  test('can edit a task', () => {
    render(<EditableTable tasks={tasks} setTasks={() => {}} />);

    // Click on Edit button
    fireEvent.click(screen.getAllByText('Edit')[0]);

    // Change title and save
    fireEvent.change(screen.getByDisplayValue('Test Task 1'), { target: { value: 'Edited Task' } });
    fireEvent.click(screen.getByText('Save'));

    // Verify the task title was updated
    expect(screen.getByText('Edited Task')).toBeInTheDocument();
  });

  test('can delete a task', () => {
    render(<EditableTable tasks={tasks} setTasks={() => {}} />);

    // Click on Delete button
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Verify the task is deleted
    expect(screen.queryByText('Test Task 1')).toBeNull();
  });

  test('can add a new task', () => {
    render(<EditableTable tasks={tasks} setTasks={() => {}} />);

    // Show the form
    fireEvent.click(screen.getByText('Insert Task'));

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText('Enter task title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Enter task description'), { target: { value: 'New Task Description' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'In Progress' } });

    // Submit the form
    fireEvent.click(screen.getByText('Add Task'));

    // Verify the new task is added
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});
