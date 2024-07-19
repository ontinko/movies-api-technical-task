const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getActorById = async (id) => {
    try {
        const actor = await prisma.actor.findUnique({
            where: {
                id
            },
            include: {
                movies: {
                    include: {
                        Movie: true,
                    }
                },
            }
        });
        return actor;

    } catch (err) {
        return null;
    }
};

module.exports = getActorById;
