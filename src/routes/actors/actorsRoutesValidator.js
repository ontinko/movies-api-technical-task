const { body } = require('express-validator');
const moment = require('moment');

const validDate = (date) => {
    if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
        throw new Error('Birthdate must be a valid YYYY-MM-DD date');
    }
    return true;
}

module.exports = {
    createValidations: [
        body('data.actor').exists().withMessage('Actor attributes must be specified'),
        body('data.actor.name').not().isEmpty().withMessage('Name must be specified'),
        body('data.actor.birthDate').not().isEmpty().withMessage('Birthdate must be specified')
            .bail().custom(validDate).withMessage('Birthdate must be a valid YYYY-MM-DD date'),
        body('data.actor.movieIds').if(body('data.actor.movieIds').exists()).isArray()
    ],
};
