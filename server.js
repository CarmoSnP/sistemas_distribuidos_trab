const express = require("express");
const axios = require("axios");
const fs = require("fs");
const readline = require("readline-sync");

require("dotenv").config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const TMDB_API_TOKEN = process.env.TMDB_API_KEY;
const RESPONSE_FILE = "respostas.json";

// função para formatar as reviews
function formatReview(reviewText) {
    // Remove quebras de linha desnecessárias
    let formattedReview = reviewText.replace(/(\r\n|\n|\r)/gm, ' ').trim();

    // Limitar o tamanho da review para 500 caracteres
    if (formattedReview.length > 500) {
        formattedReview = formattedReview.substring(0, 500) + '...';
    }

    return formattedReview;
}

// função que vai pegar os dados das APIS
async function moviesData(title, year) {
    try {
        // aqui estou pegando dados da OMDb
        console.log("\nBuscando dados da API..");

        // Incluindo type=movie na URL da OMDb, necessária para a versão gratuita
        const omdbUrl = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${OMDB_API_KEY}&type=movie`;

        // Incluindo o Bearer no cabeçalho da requisição
        const omdbResponse = await axios.get(omdbUrl, {
            headers: {
                'Authorization': `Bearer ${OMDB_API_KEY}`,
            }
        });

        if (omdbResponse.data.Response === "False") {
            throw new Error("Filme não encontrado no OMDb");
        }

        // Aqui estamos utilizando o Bearer Token para autenticação
        const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&year=${year}`;
        const tmdbResponse = await axios.get(tmdbUrl, {
            headers: {
                'Authorization': `Bearer ${TMDB_API_TOKEN}`,
            }
        });

        if (!tmdbResponse.data.results || tmdbResponse.data.results.length === 0) {
            throw new Error("Filme não encontrado no TMDb");
        }

        const movieId = tmdbResponse.data.results[0].id;
        const tmdbReviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
        const tmdbReviewsResponse = await axios.get(tmdbReviewsUrl, {
            headers: {
                'Authorization': `Bearer ${TMDB_API_TOKEN}`,
            }
        });

        // Formatando as reviews
        const reviews = tmdbReviewsResponse.data.results.slice(0, 3).map(review => formatReview(review.content));

        // trata a resposta das APIs
        const responseData = {
            titulo: omdbResponse.data.Title,
            ano: parseInt(omdbResponse.data.Year),
            sinopse: omdbResponse.data.Plot,
            reviews: reviews.length > 0 ? reviews : ["Nenhuma review"]
        };

        // salva no JSON
        saveResponseToFile(responseData);

        return responseData;
    } catch (error) {
        throw new Error(`Erro na busca de dados: ${error.message}`);
    }
}

function saveResponseToFile(responseData) {
    let savedToResponses = [];

    // ler o arquivo se já existir
    if (fs.existsSync(RESPONSE_FILE)) {
        const fileData = fs.readFileSync(RESPONSE_FILE, "utf-8");
        if (fileData) {
            savedToResponses = JSON.parse(fileData);
        }
    }

    // Numerar as reviews de forma formatada
    const formattedReviews = responseData.reviews.map((review, index) => `${index + 1}. ${review}`);

    // adicionar a nova consulta ao arquivo com as reviews numeradas
    const formattedResponseData = {
        ...responseData,
        reviews: formattedReviews // Aqui as reviews são formatadas
    };

    savedToResponses.push(formattedResponseData);
    fs.writeFileSync(RESPONSE_FILE, JSON.stringify(savedToResponses, null, 2), "utf-8");

    console.log("Resposta salva no arquivo");
}


// função que vai exibir os filmes salvos
function showSavedMovies() {
    if (!fs.existsSync(RESPONSE_FILE)) {
        console.log("\nAinda não tem filmes salvos");
        return;
    }

    const fileData = fs.readFileSync(RESPONSE_FILE, "utf-8");
    const savedToResponses = JSON.parse(fileData);

    if (savedToResponses.length == 0) {
        console.log("\nAinda não tem filmes salvos");
        return;
    }

    console.log("\nFilmes já buscados: ");
    savedToResponses.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.titulo} (${movie.ano})`);
        console.log(`Sinopse: ${movie.sinopse}`);
        console.log("Reviews: ");

        if (movie.reviews.length > 0) {
            movie.reviews.forEach((review) => {
                console.log(`   ${review}`);
            });
        } else {
            console.log("   Nenhuma review disponível");
        }
        console.log("\n--------------------------------------------------\n");
    });

    console.log("\nPara mais detalhes, acessar o arquivo");
}

// função principal para interagir com as APIs
async function main() {
    console.log("\nBem-vindo a api de Dados de Filmes\n");

    while (true) {
        console.log("\nMenu:");
        console.log("1 Buscar um filme");
        console.log("2 Exibir filmes já buscados");
        console.log("3 Sair");

        const option = readline.question("Escolha uma opcaoo: ");

        if (option === "1") {
            const title = readline.question("Digite o titulo do filme: ");
            const year = readline.question("Digite o ano do filme: ");

            if (!title || !year) {
                console.log("\nTitulo e ano sao obrigatorios! Tente novamente.\n");
                continue;
            }

            try {
                const movieData = await moviesData(title, year);
                console.log("\nResultado da busca:\n", JSON.stringify(movieData, null, 2));
            } catch (error) {
                console.error("\nErro:", error.message);
            }
        } else if (option === "2") {
            showSavedMovies();
        } else if (option === "3") {
            console.log("\nSaindo do programa. Code By Igor Carmo\n");
            break;
        } else {
            console.log("\nOpcao invalida. Tente novamente.\n");
        }
    }
}

// Executa o programa
main();
