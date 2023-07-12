import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const rotaPokemon = '/pokemon/25';
const pokemonName = 'Pikachu';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela:', async () => {
    renderWithRouter(<App />, { route: rotaPokemon });

    const name = screen.getByRole('heading', {
      name: new RegExp(`${pokemonName} details`, 'i'),
    });

    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    const description = screen.getByText(
      /This intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    const locations = screen.getByRole('heading', {
      name: new RegExp(`Game Locations of ${pokemonName}`, 'i'),
    });

    expect(name).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(locations).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', async () => {
    renderWithRouter(<App />, { route: rotaPokemon });
    const { user } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    await user.click(moreDetails);
    const locations = screen.getAllByRole('heading', { name: new RegExp(`Game Locations of ${pokemonName}`, 'i') });
    const viridianForestMap = screen.getAllByAltText(/pikachu location/i)[0];
    const powerPlantMap = screen.getAllByAltText(/pikachu location/i)[1];

    expect(moreDetails).not.toBeInTheDocument();
    expect(locations.length).toBe(2);
    expect(viridianForestMap).toBeInTheDocument();
    expect(powerPlantMap).toBeInTheDocument();
    expect(viridianForestMap).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(powerPlantMap).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes:', async () => {
    renderWithRouter(<App />, { route: rotaPokemon });
    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');

    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox.checked).toBe(false);

    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);

    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(false);
  });
});
