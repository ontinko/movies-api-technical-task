const moment = require('moment');

const actorItemSerializer = (actor) => {
    return {
        id: actor.id,
        name: actor.name,
        birthDate: moment(actor.birth_date).format('YYYY-MM-DD'),
    };
};

const movieItemSerializer = (movie) => {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
    };
};

module.exports = {
    actorItemSerializer,
    movieItemSerializer,
}
