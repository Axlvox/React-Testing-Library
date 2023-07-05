import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente <App.tsx />', () => {
  renderWithRouter(<App />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Favorite Pokémon')).toBeInTheDocument();
});

test('Teste a rota Home', async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });

  expect(screen.getByText('Home')).toBeInTheDocument();

  const goHome = screen.getByRole('link', { name: 'Home' });

  await user.click(goHome);

  const homeElements = screen.queryAllByText('Home');
  expect(homeElements.length).toBeGreaterThan(0);
});

test('Teste a rota About', async () => {
  const { user } = renderWithRouter(<App />, { route: '/about' });

  expect(screen.getByText('About')).toBeInTheDocument();

  const goHome = screen.getByRole('link', { name: 'About' });

  await user.click(goHome);

  const aboutElements = screen.queryAllByText('About');
  expect(aboutElements.length).toBeGreaterThan(0);
});

test('Teste a rota Favorites', async () => {
  renderWithRouter(<App />, { route: '/favorites' });

  const favoritePokemonElements = screen.queryAllByText('Favorite Pokémon');
  expect(favoritePokemonElements.length).toBe(2);
});

it('Testa rota not found', async () => {
  await renderWithRouter(<App />, { route: '/something-else' });

  expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
});
