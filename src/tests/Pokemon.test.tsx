import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon />', () => {
  const pokemon = {
    id: 1,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://example.com/pikachu.png',
  };

  it('O card do Pokémon deve conter um link de navegação para exibir detalhes', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink
      isFavorite={ false }
    />);
    const linkElement = screen.getByRole('link', { name: /More details/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/pokemon/1');
  });

  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const nameElement = screen.getByTestId('pokemon-name');
    expect(nameElement).toHaveTextContent('Pikachu');
  });

  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const typeElement = screen.getByTestId('pokemon-type');
    expect(typeElement).toHaveTextContent('Electric');
  });

  it('O peso médio do Pokémon deve ser exibido no formato correto', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const weightElement = screen.getByTestId('pokemon-weight');
    expect(weightElement).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida com os atributos corretos', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const imageElement = screen.getByAltText('Pikachu sprite');
    expect(imageElement).toHaveAttribute('src', 'https://example.com/pikachu.png');
    expect(imageElement).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('O ícone de estrela deve ser exibido para Pokémon favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite
    />);
    const favoriteIconElement = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIconElement).toHaveAttribute('src', '/star-icon.svg');
  });
});
