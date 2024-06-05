export interface Movie {
  nome: string;
  generos: string[];
  estilos: string[];
}

const filmes: Movie[] = [
  { nome: 'The Shawshank Redemption', generos: ['drama', 'crime'], estilos: ['classico'] },
  { nome: 'The Godfather', generos: ['drama', 'crime'], estilos: ['classico'] },
  { nome: 'The Dark Knight', generos: ['acao', 'crime'], estilos: ['superheroi'] },
  { nome: 'Pulp Fiction', generos: ['drama', 'crime'], estilos: ['cult'] },
  { nome: 'The Lord of the Rings: The Return of the King', generos: ['aventura', 'fantasia'], estilos: ['epico'] },
  { nome: 'Forrest Gump', generos: ['drama', 'romance'], estilos: ['classico'] },
  { nome: 'Inception', generos: ['acao', 'sci-fi'], estilos: ['thriller'] },
  { nome: 'Fight Club', generos: ['drama', 'thriller'], estilos: ['cult'] },
  { nome: 'The Matrix', generos: ['acao', 'sci-fi'], estilos: ['cult'] },
  { nome: 'Goodfellas', generos: ['drama', 'crime'], estilos: ['classico'] },
  { nome: 'The Silence of the Lambs', generos: ['drama', 'thriller'], estilos: ['suspense'] },
  { nome: 'Se7en', generos: ['drama', 'thriller'], estilos: ['suspense'] },
  { nome: 'Interstellar', generos: ['aventura', 'drama', 'sci-fi'], estilos: ['epico'] },
  { nome: 'Parasite', generos: ['drama', 'thriller'], estilos: ['moderno'] },
  { nome: 'Gladiator', generos: ['acao', 'aventura', 'drama'], estilos: ['epico'] },
];

export function MoviesRecomender(genero: string, estilo: string): Movie[] | null {
  const filterMovies = filmes.filter(filme => filme.generos.includes(genero) && filme.estilos.includes(estilo));

  if (filterMovies.length > 0) {
      return filterMovies;
  } else {
      return null;
  }
}
