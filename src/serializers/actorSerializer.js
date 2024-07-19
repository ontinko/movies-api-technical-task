const { actorItemSerializer, movieItemSerializer } = require("./itemsSerializer");

const actorShowSerializer = (actor) => {
    const result = {};

    result.data = {
        actor: actorItemSerializer(actor),
    };

    if (actor.movies?.length) {
        result.included = {};
        result.included.movies = actor.movies.map(m => movieItemSerializer(m.Movie));
    }

    return result;
}

const actorIndexSerializer = (actors) => {
    const result = {};

    result.data = {
        actors: actors.map(a => actorItemSerializer(a)),
    };

    return result;
}


module.exports = {
    actorShowSerializer,
    actorIndexSerializer,
};
