import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student crud heading', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(<App />);
  await screen.findByText(/no student records available/i);
  expect(screen.getByRole('heading', { name: /student portfolio crud/i, level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/simple mern stack implementation/i)).toBeInTheDocument();
});
