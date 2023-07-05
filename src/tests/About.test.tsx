import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste o componente <About.tsx />', () => {
  renderWithRouter(<App />, { route: '/about' });

  expect(screen.getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();

  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
