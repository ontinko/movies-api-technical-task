const { validationResult } = require('express-validator');
const createMovie = require('../helpers/movies/createMovie');
const getMovieById = require('../helpers/movies/getMovieById');
const getAllMovies = require('../helpers/movies/getAllMovies');
const OpenAI = require('openai');
const { movieShowSerializer, movieIndexSerializer } = require('../serializers/movieSerializer');
const openaiKey = process.env.OPENAI_KEY;

exports.index = async (_, res) => {
    const movies = await getAllMovies();
    return res.status(200).json(movieIndexSerializer(movies));
};

exports.show = async (req, res) => {
    const movieId = req.params.id;

    const movie = await getMovieById(movieId);
    if (!movie) {
        return res.status(404).json({
            message: 'Movie not found',
        });
    }

    return res.status(200).json(movieShowSerializer(movie));
};

exports.create = async (req, res) => {
    const validationErrors = validationResult(req).array();
    if (validationErrors.length) {
        return res.status(400).json({
            errors: validationErrors.map(e => {
                return {
                    message: e.msg,
                }
            })
        });
    }

    const movieData = req.body.data.movie;
    const title = movieData.title;
    const year = movieData.year;
    const actorIds = movieData.actorIds || null;

    try {
        await createMovie(title, year, actorIds)
        return res.status(201).json({
            message: `Created a movie`,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};

exports.quote = async (req, res) => {
    const movieId = req.params.id;

    const movie = await getMovieById(movieId);
    if (!movie) {
        return res.status(404).json({
            message: 'Movie not found',
        });
    }

    const openai = new OpenAI({
        apiKey: openaiKey,
    });
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: 'user',
                content: `Respond with a random quote from the movie "${movie.title}", ${movie.year}. Do not enclose it in quotes.`
            }],
        });
        const quote = response.choices[0].message.content;
        return res.status(200).json({
            data: {
                quote
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(503).json({
            message: 'Count not get a quote, try again later',
        });
    }
};
