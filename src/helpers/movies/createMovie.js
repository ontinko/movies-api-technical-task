const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const RECORD_NOT_FOUND_ERROR = 'P2018';

const createMovie = async (title, year, actorIds = []) => {
    try {
        const movie = await prisma.movie.create({
            data: {
                title,
                year,
                actors: actorIds ? {
                    create: actorIds.map(actorId => ({
                        Actor: {
                            connect: {
                                id: actorId
                            }
                        }
                    })),
                } : {}
            }
        });
        return movie;

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === RECORD_NOT_FOUND_ERROR) {
            console.error('Error creating movie:', err.message);
            throw new Error('One or more actors do not exist.');
        } else {
            console.error('Error creating movie:', err);
            throw new Error('Could not create a movie');
        }
    }
};

module.exports = createMovie;
