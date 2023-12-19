import {Router} from "express";
import {gamesController} from "../controllers/gamesController";


class GamesRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config() {
        this.router.post('/', gamesController.addGame)
        this.router.get('/', gamesController.listGames)
        this.router.get('/game/:id', gamesController.getOneGame)
        this.router.get('/byName/:name', gamesController.getGameByName)
        this.router.patch('/:id', gamesController.updateGame)
        this.router.delete('/:id', gamesController.deleteGame)
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;