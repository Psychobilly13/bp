const express = require('express');
const gameRoute = require('./routes/game.route');
const GameService = require('./services/game.service');
require('dotenv').config();

async function app() {
    /** init */
    const app = express()
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost'

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /** inject services */
    app.use((req, _res, next) => {
        req.gameService = new GameService();
        next();
      });

    /** routes */
    await gameRoute(app);

    app.listen(port, host, () => {
        console.log(`[+] app.listening.${host}:${port}`);
      });
}

app();