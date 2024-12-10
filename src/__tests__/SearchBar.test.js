// src/__tests__/SearchBar.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('SearchBar component works correctly', () => {
  const setSearchQuery = jest.fn();
  render(<SearchBar searchQuery="" setSearchQuery={setSearchQuery} />);

  // Type into the search bar
  fireEvent.change(screen.getByPlaceholderText('Search by Title or Description'), { target: { value: 'Test' } });

  // Check if setSearchQuery is called with the correct argument
  expect(setSearchQuery).toHaveBeenCalledWith('Test');
});
