import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders 3 products on default category', () => {
  render(
    <MemoryRouter initialEntries={['/category/man']}>
      <App />
    </MemoryRouter>
  );

  const productCards = screen.getAllByRole('img');
  expect(productCards.length).toBe(3);
});