const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMovies = async () => {
    try {
        const movies = await prisma.movie.findMany();
        return movies;

    } catch (err) {
        return [];
    }
};

module.exports = getAllMovies;
