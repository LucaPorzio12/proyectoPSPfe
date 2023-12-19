"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = require("../controllers/gamesController");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', gamesController_1.gamesController.addGame);
        this.router.get('/', gamesController_1.gamesController.listGames);
        this.router.get('/game/:id', gamesController_1.gamesController.getOneGame);
        this.router.get('/byName/:name', gamesController_1.gamesController.getGameByName);
        this.router.patch('/:id', gamesController_1.gamesController.updateGame);
        this.router.delete('/:id', gamesController_1.gamesController.deleteGame);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
