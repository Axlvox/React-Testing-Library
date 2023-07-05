import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente <NotFound.tsx />', () => {
  renderWithRouter(<App />, { route: '/something-else' });

  expect(screen.getByRole('heading', { name: 'Page requested not found' })).toBeInTheDocument();

  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
