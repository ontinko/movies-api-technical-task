const { movieItemSerializer, actorItemSerializer } = require("./itemsSerializer");

const movieShowSerializer = (movie) => {
    const result = {};

    result.data = {
        movie: movieItemSerializer(movie),
    };

    if (movie.actors?.length) {
        result.included = {};
        result.included.actors = movie.actors.map(a => actorItemSerializer(a.Actor));
    }

    return result;
}

const movieIndexSerializer = (movies) => {
    const result = {};

    result.data = {
        movies: movies.map(m => movieItemSerializer(m)),
    };

    return result;
}


module.exports = {
    movieShowSerializer,
    movieIndexSerializer,
};
