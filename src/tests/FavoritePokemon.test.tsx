import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

test('Testa se há a mensagem "No favorite pokemon found"', () => {
  const mockPokemonList = [];
  renderWithRouter(
    <FavoritePokemon pokemonList={ mockPokemonList } />,
  );

  expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();
});

test('Teste o componente <FavoritePokemon /> com Pokémon favoritados', async () => {
  renderWithRouter(<App />);

  const detailsLink = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(detailsLink);

  const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
  await userEvent.click(favoritePokemon);

  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(favoriteLink);

  renderWithRouter(<FavoritePokemon />);

  const pikachuImage = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(pikachuImage).toBeInTheDocument();
});
