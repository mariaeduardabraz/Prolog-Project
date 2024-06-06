:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).

:- http_handler(root(recomendacao), handle_recomendacao(Method), [method(Method), methods([options, post])]).

server(Port) :-
    http_server(http_dispatch, [port(Port)]).

% Definição de filmes com base em atributos
filme('The Shawshank Redemption', [drama, crime], [classico]).
filme('The Godfather', [drama, crime], [classico]).
filme('The Dark Knight', [acao, crime], [superheroi]).
filme('Pulp Fiction', [drama, crime], [cult]).
filme('The Lord of the Rings: The Return of the King', [aventura, fantasia], [epico]).
filme('Forrest Gump', [drama, romance], [classico]).
filme('Inception', [acao, sci-fi], [thriller]).
filme('Fight Club', [drama, thriller], [cult]).
filme('The Matrix', [acao, sci-fi], [cult]).
filme('Goodfellas', [drama, crime], [classico]).
filme('The Silence of the Lambs', [drama, thriller], [suspense]).
filme('Se7en', [drama, thriller], [suspense]).
filme('Interstellar', [aventura, drama, sci-fi], [epico]).
filme('Parasite', [drama, thriller], [moderno]).
filme('Gladiator', [acao, aventura, drama], [epico]).

% Regras para recomendar filmes com base nas preferências
recomendar(Genero, Estilo, Filme) :-
    filme(Filme, Generos, Estilos), % verifica se existe um filme na base de dados de filmes com o nome Filme e se esse filme possui os gêneros Generos e os estilos Estilos
    member(Genero, Generos), % verifica se o gênero Genero está presente na lista de gêneros Generos do filme.
    member(Estilo, Estilos). % verifica se o estilo Estilo está presente na lista de estilos Estilos do filme

% Adicionar cabeçalhos CORS manualmente
add_cors_headers(_Request) :-
    format('Access-Control-Allow-Origin: *~n'),
    format('Access-Control-Allow-Methods: POST, GET, OPTIONS~n'),
    format('Access-Control-Allow-Headers: Content-Type~n').

% % Realiza as requisições e processa a recomendação
handle_recomendacao(options, Request) :-
    add_cors_headers(Request),
    format('Content-type: text/plain~n~n'),
    format('Preflight response').

handle_recomendacao(post, Request) :-
    add_cors_headers(Request),
    catch(
        (
            http_read_json_dict(Request, JSONIn),
            _{genero:Genero, estilo:Estilo} :< JSONIn,
            findall(Filme, recomendar(Genero, Estilo, Filme), Filmes),
            reply_json_dict(_{recomendacoes:Filmes})
        ),
        Error,
        (
            format(user_error, 'Error: ~w~n', [Error]),
            reply_json_dict(_{error: 'Internal Server Error'}, [status(500)])
        )
    ).

:- initialization(server(8000)).
