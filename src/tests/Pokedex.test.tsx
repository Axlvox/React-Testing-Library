import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const NEXT_BUTTON_LABEL = /Próximo Pokémon/i;
const ENCOUNTERED_POKEMON_HEADING = /Encountered Pokémon/i;
const POKEMON_TYPE_BUTTON_DATA_TESTID = 'pokemon-type-button';
const FILTER_ALL_BUTTON_LABEL = /All/i;

const POKEMON_ALT_TEXT = {
  INITIAL: 'Pikachu sprite',
  SECOND: 'Charmander sprite',
  THIRD: 'Caterpie sprite',
};

const POKEMON_NAME = 'pokemon-name';
const data = 'data-testid';

describe('Teste o componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('deve exibir um heading h2 com o texto "Encountered Pokémon"', () => {
    const heading = screen.getByRole('heading', { name: ENCOUNTERED_POKEMON_HEADING });
    expect(heading).toBeInTheDocument();
  });

  it('deve exibir apenas um Pokémon por vez', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_BUTTON_LABEL });

    const initialPokemon = screen.getByAltText(POKEMON_ALT_TEXT.INITIAL);
    expect(initialPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const newInitialPokemon = screen.queryByAltText(POKEMON_ALT_TEXT.INITIAL);
    expect(newInitialPokemon).not.toBeInTheDocument();

    const newSecondPokemon = screen.getByAltText(POKEMON_ALT_TEXT.SECOND);
    expect(newSecondPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const secondPokemon = screen.queryByAltText(POKEMON_ALT_TEXT.SECOND);
    expect(secondPokemon).not.toBeInTheDocument();

    const thirdPokemon = screen.getByAltText(POKEMON_ALT_TEXT.THIRD);
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
      expect(filterButton.getAttribute(data)).toBe(POKEMON_TYPE_BUTTON_DATA_TESTID);
    });
  });

  it('deve circular apenas pelos Pokémon do tipo selecionado ao clicar no botão de filtro', () => {
    const nextButton = screen.getByRole('button', { name: NEXT_BUTTON_LABEL });
    const electricButton = screen.getByRole('button', { name: /Electric/i });

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
        expect(button.getAttribute(data)).not.toBe(POKEMON_TYPE_BUTTON_DATA_TESTID);
      } else {
        expect(button.getAttribute(data)).toBe(POKEMON_TYPE_BUTTON_DATA_TESTID);
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
    expect(allButton.getAttribute(data)).toBe('');
  });

  test('deve conter um botão para resetar o filtro', async () => {
    const allButton = screen.getByRole('button', { name: FILTER_ALL_BUTTON_LABEL });
    const fireButton = screen.getByRole('button', { name: /Fire/i });

    fireEvent.click(fireButton);

    const charmander = screen.getByRole('img', { name: /Charmander sprite/i });
    expect(charmander).toBeInTheDocument();

    fireEvent.click(allButton);

    const pikachu = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
  });
});
