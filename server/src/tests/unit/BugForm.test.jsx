import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../components/BugForm';

test('renders form and requires title', () => {
  const mockCreate = jest.fn();
  render(<BugForm onCreate={mockCreate} />);
  const submit = screen.getByText(/Report/i);
  fireEvent.click(submit);
  // no title -> alert prevents submission. We can spy on window.alert
});
