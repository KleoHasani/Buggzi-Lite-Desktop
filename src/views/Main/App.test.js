import { render, screen } from '@testing-library/react';
import App from './App';

test('Should get text hello on screen', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello/i);
  expect(linkElement).toBeInTheDocument();
});
