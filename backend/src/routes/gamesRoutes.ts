import {Router} from "express";
import {gamesController} from "../controllers/gamesControllers";


class GamesRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config() {
        this.router.post('/', gamesController.addGame)
        this.router.get('/', gamesController.listGames)
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;