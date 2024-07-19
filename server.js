require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moviesRoutes = require('./src/routes/movies/moviesRoutes');
const actorsRoutes = require('./src/routes/actors/actorsRoutes');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors());

server.use('/movies', moviesRoutes);
server.use('/actors', actorsRoutes);

server.get("/favicon.ico", (_, res) => res.status(204));

// handle invalid route
server.use(function(_, res, _) {
    res.status(404).json({ error: "Not found" });
});

// handle server error
server.use(function(_, _, res, _) {
    res.status(500).json({ error: "Internal server error" });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
})

module.exports = server;
