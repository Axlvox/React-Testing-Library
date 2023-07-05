import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente <App.tsx />', () => {
  const { user } = renderWithRouter(<App />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Favorite Pokémon')).toBeInTheDocument();
});
