"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesControllers_1 = require("../controllers/gamesControllers");
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', gamesControllers_1.gamesController.addGame);
        this.router.get('/', gamesControllers_1.gamesController.listGames);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
