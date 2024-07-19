const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllActors = async () => {
    try {
        const actors = await prisma.actor.findMany();
        return actors;

    } catch (err) {
        return [];
    }
};

module.exports = getAllActors;
