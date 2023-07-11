import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const NEXT_BUTTON_LABEL = /Próximo Pokémon/i;
  const ENCOUNTERED_POKEMON_HEADING = /Encountered Pokémon/i;
  const INITIAL_POKEMON_ALT_TEXT = 'Pikachu sprite';
  const SECOND_POKEMON_ALT_TEXT = 'Charmander sprite';
  const THIRD_POKEMON_ALT_TEXT = 'Caterpie sprite';
  const POKEMON_TYPE_BUTTON_DATA_TESTID = 'pokemon-type-button';
  const FILTER_ALL_BUTTON_LABEL = /All/i;
  const ELECTRIC_TYPE_LABEL = /Electric/i;
  const FIRE_TYPE_LABEL = /Fire/i;
  const CHARMANDER_ALT_TEXT = /Charmander sprite/i;
  const PIKACHU_ALT_TEXT = /Pikachu sprite/i;
  const POKEMON_NAME = 'pokemon-name';

  it('deve exibir um heading h2 com o texto "Encountered Pokémon"', () => {
    const heading = screen.getByRole('heading', { name: ENCOUNTERED_POKEMON_HEADING });
    expect(heading).toBeInTheDocument();
  });

  it('deve exibir apenas um Pokémon por vez', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_BUTTON_LABEL });

    const initialPokemon = screen.getByAltText(INITIAL_POKEMON_ALT_TEXT);
    expect(initialPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const newInitialPokemon = screen.queryByAltText(INITIAL_POKEMON_ALT_TEXT);
    expect(newInitialPokemon).not.toBeInTheDocument();

    const newSecondPokemon = screen.getByAltText(SECOND_POKEMON_ALT_TEXT);
    expect(newSecondPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const secondPokemon = screen.queryByAltText(SECOND_POKEMON_ALT_TEXT);
    expect(secondPokemon).not.toBeInTheDocument();

    const thirdPokemon = screen.getByAltText(THIRD_POKEMON_ALT_TEXT);
    expect(thirdPokemon).toBeInTheDocument();
  });

  it('deve exibir o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_BUTTON_LABEL });

    fireEvent.click(nextButton);
    const pokemonName = screen.getByTestId(POKEMON_NAME);
    expect(pokemonName).toBeInTheDocument();

    fireEvent.click(nextButton);
    const newPokemonName = screen.getByTestId(POKEMON_NAME);
    expect(newPokemonName).toBeInTheDocument();

    fireEvent.click(nextButton);
    const nextPokemonName = screen.getByTestId(POKEMON_NAME);
    expect(nextPokemonName).toBeInTheDocument();
  });

  it('deve conter os botões de filtro da Pokédex', () => {
    const allButtons = screen.getAllByTestId(POKEMON_TYPE_BUTTON_DATA_TESTID);
    const uniqueButtons = new Set(allButtons);

    uniqueButtons.forEach((button) => {
      const buttonName = button.innerHTML;
      const filterButton = screen.getByRole('button', { name: buttonName });
      expect(filterButton).toBeInTheDocument();
      expect(filterButton.getAttribute('data-testid')).toBe(POKEMON_TYPE_BUTTON_DATA_TESTID);
    });
  });

  it('deve circular apenas pelos Pokémon do tipo selecionado ao clicar no botão de filtro', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_BUTTON_LABEL });
    const electricButton = screen.getByRole('button', { name: ELECTRIC_TYPE_LABEL });

    fireEvent.click(electricButton);

    const electricPokemons = ['Pikachu'];

    electricPokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();

      fireEvent.click(nextButton);
    });
  });

  it('os botões de filtragem por tipo têm o data-testid=pokemon-type-button, exceto o botão All', () => {
    const filterButtons = screen.getAllByTestId(POKEMON_TYPE_BUTTON_DATA_TESTID);

    filterButtons.forEach((button) => {
      if (button.textContent === 'All') {
        expect(button.getAttribute('data-testid')).not.toBe(POKEMON_TYPE_BUTTON_DATA_TESTID);
      } else {
        expect(button.getAttribute('data-testid')).toBe(POKEMON_TYPE_BUTTON_DATA_TESTID);
      }
    });
  });

  it('deve carregar a página com o filtro selecionado como All', () => {
    const allButton = screen.getByRole('button', { name: FILTER_ALL_BUTTON_LABEL });
    const filterButtons = screen.getAllByTestId(POKEMON_TYPE_BUTTON_DATA_TESTID);

    filterButtons.forEach((button) => {
      if (button === allButton) {
        expect(button).toHaveClass('active');
      } else {
        expect(button).not.toHaveClass('active');
      }
    });
  });

  it('deve conter o botão de filtragem All', () => {
    const allButton = screen.getByRole('button', { name: FILTER_ALL_BUTTON_LABEL });
    expect(allButton).toBeInTheDocument();
    expect(allButton.getAttribute('data-testid')).toBe('');
  });

  test('deve conter um botão para resetar o filtro', async () => {
    const allButton = screen.getByRole('button', { name: FILTER_ALL_BUTTON_LABEL });
    const fireButton = screen.getByRole('button', { name: FIRE_TYPE_LABEL });

    fireEvent.click(fireButton);

    const charmander = screen.getByRole('img', { name: CHARMANDER_ALT_TEXT });
    expect(charmander).toBeInTheDocument();

    fireEvent.click(allButton);

    const pikachu = screen.getByRole('img', { name: PIKACHU_ALT_TEXT });
    expect(pikachu).toBeInTheDocument();
  });
});
