const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const RECORD_NOT_FOUND_ERROR = 'P2018';

const createActor = async (name, birthDate, movieIds) => {
    try {
        const actor = await prisma.actor.create({
            data: {
                name,
                birth_date: birthDate,
                movies: movieIds ? {
                    create: movieIds.map(movieId => ({
                        Movie: {
                            connect: {
                                id: movieId
                            }
                        }
                    })),
                } : {}
            }
        });
        return actor;

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === RECORD_NOT_FOUND_ERROR) {
            console.error('Error creating actor:', err.message);
            throw new Error('One or more movies do not exist');
        } else {
            console.error('Error creating actor:', err);
            throw new Error('Could not create an actor');
        }
    }
};

module.exports = createActor;
