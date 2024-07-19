const router = require('express').Router();
const { createValidations } = require('./moviesRoutesValidator');
const { index, show, create, quote } = require('../../controllers/moviesController');

router.get(
    '/',
    index
);

router.post(
    '/',
    createValidations,
    create,
);

router.get(
    '/:id',
    show,
);

router.get(
    '/:id/quote',
    quote,
);

module.exports = router;
