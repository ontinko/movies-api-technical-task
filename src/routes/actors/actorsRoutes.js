const router = require('express').Router();
const { createValidations } = require('./actorsRoutesValidator');
const { index, show, create } = require('../../controllers/actorsController');

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
    show
);

module.exports = router;
