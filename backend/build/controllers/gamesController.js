"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
class GamesController {
    addGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO games set ?', [req.body]));
                res.json({ status: 'Juego guardado' }).status(200);
            }
            catch (e) {
                res.status(400).send(e.sqlMessage);
            }
        });
    }
    listGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield database_1.default.then((r) => r.query('SELECT * FROM games'));
                res.status(200).json(games);
            }
            catch (e) {
                res.status(400).send(e.sqlMessage);
            }
        });
    }
    getOneGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const game = yield database_1.default.then((r) => r.query('SELECT * FROM games where id = ?', [id]));
                if (game.length > 0)
                    return res.status(200).json(game[0]);
                res.status(404).json({ status: 'Juego no encontrado' });
            }
            catch (e) {
                res.status(400).send(e.sqlMessage);
            }
        });
    }
    getGameByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.params.name;
                const games = yield database_1.default.then((r) => r.query('SELECT * FROM games where title like "%"?"%"', [name]));
                if (games.length > 0)
                    return res.status(200).json(games);
                res.status(404).json({ status: 'No aparecen juegos con ese nombre' });
            }
            catch (e) {
                res.status(400).send(e.sqlMessage);
            }
        });
    }
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield database_1.default.then((r) => r.query('UPDATE games set ? where id = ?', [req.body, id])).then((data) => {
                    if (data.changedRows > 0) {
                        res.status(200).json({ status: 'Juego actualizado' });
                    }
                    else {
                        res.status(404).json({ status: 'No existe un juego con ese id.' });
                    }
                });
            }
            catch (e) {
                res.status(400).send(e.sqlMessage);
            }
        });
    }
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield database_1.default.then((r) => r.query('DELETE from games where id = ?', [id])).then((data) => {
                    if (data.affectedRows > 0) {
                        res.status(200).json({ status: 'Juego borrado' });
                    }
                    else {
                        res.status(404).json({ status: 'No existe un juego con ese id.' });
                    }
                });
            }
            catch (e) {
                res.status(400).send(e.sqlMessage);
            }
        });
    }
}
exports.gamesController = new GamesController();
