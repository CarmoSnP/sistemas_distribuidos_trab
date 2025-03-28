//api key do OMDb: 1e72af49
//api key do TMDB: bc3fc08ae883070cd11b8538f3cadf28

const express = require("express");
const axios = require("axios");
const fs = require("fs");

const OMDB_API_KEY = "1e72af49";
const TMDB_API_KEY = "bc3fc08ae883070cd11b8538f3cadf28";
const RESPONSE_FILE = "respostas.json";

//funcao que vai pegar os dados das APIS

async function moviesData(title, year) {
    try {
        //aqui estou pegando dados da OMDb

        console.log("\nBuscando dados da API..");

        const omdbUrl = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${OMDB_API_KEY}`;
        const omdbResponse = await axios.get(omdbUrl);

        if (omdbResponse.data.Response === "False") {
            throw new Error("filme nao encontrado no OMDb")
        }

        const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&year=${year}&api_key=${TMDB_API_KEY}`;
        const tmdbResponse = await axios.get(tmdbSearchUrl);

        if (tmdbResponse.data.Response === 0) {
            throw new Error("filme nao encontrado no TMDb");
        }

        const movieId = tmdbResponse.data.results[0].id;
        const tmdbReviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`;
        const tmdbReviewsResponse = await axios.get(tmdbReviewsUrl);

        const reviews = tmdbReviewsResponse.data.results.slice(0, 3).map(review => review.content);

        //trata a resposta das apis 
        const reponseData = {
            titulo: omdbResponse.data.title,
            ano: parseInt(omdbResponse.data.Year),
            sinopse: omdbResponse.data.Plot,
            reviews: reviews.length > 0 ? reviews : ["Nenhuma review"]
        };

        //salva no json
        saveResponseToFile(reponseData);

        return reponseData;
    } catch (error) {
        throw new Error(`Erro na busca de dados : ${error.message}`);
    }
}

function saveResponseToFile(respostaData) {
    let savedToResponses = [];


}