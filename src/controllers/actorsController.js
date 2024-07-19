const { validationResult } = require('express-validator');
const createActor = require('../helpers/actors/createActor');
const getActorById = require('../helpers/actors/getActorById');
const getAllActors = require('../helpers/actors/getAllActors');
const moment = require('moment');
const { actorIndexSerializer, actorShowSerializer } = require('../serializers/actorSerializer');

exports.index = async (_, res) => {
    const actors = await getAllActors();
    return res.status(200).json(actorIndexSerializer(actors));
};

exports.show = async (req, res) => {
    const actorId = req.params.id;

    const actor = await getActorById(actorId);
    if (!actor) {
        return res.status(404).json({
            message: 'Actor not found',
        });
    }

    return res.status(200).json(actorShowSerializer(actor));
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
    const actorData = req.body.data.actor;
    const name = actorData.name;
    const birthDate = new Date(actorData.birthDate);
    const movieIds = actorData.movieIds || null;

    try {
        await createActor(name, birthDate, movieIds)
        return res.status(201).json({
            message: `Created an actor`,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
}
