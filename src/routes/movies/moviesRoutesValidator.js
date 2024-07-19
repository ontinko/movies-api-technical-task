const { body } = require('express-validator');

module.exports = {
    createValidations: [
        body('data.movie').exists().withMessage('Movie attributes must be specified'),
        body('data.movie.title').not().isEmpty().withMessage('Title must be specified'),
        body('data.movie.year').not().isEmpty().withMessage('Year must be specified'),
        body('data.movie.year').isInt().withMessage('Year must be a number'),
        body('data.movie.actorIds').if(body('data.movie.actorIds').exists()).isArray().withMessage('ActorIds must be an array'),
    ],
};
