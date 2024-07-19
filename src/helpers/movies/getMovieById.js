const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getMovieById = async (id) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: {
                id
            },
            include: {
                actors: {
                    include: {
                        Actor: true,
                    }
                },
            }
        });
        return movie;

    } catch (err) {
        return null;
    }
};

module.exports = getMovieById;
