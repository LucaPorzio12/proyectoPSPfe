import {Request, Response} from "express";
import pool from "../database";

class GamesController {
    public async addGame(req: Request, res: Response) {
        try {
            await pool.then((r: any) => r.query(
                'INSERT INTO games set ?', [req.body]
            ));
            res.json({status: 'Juego guardado'}).status(200);
        } catch (e: any) {
            res.send(e.sqlMessage)
        }
    }
    public async listGames(req: Request, res: Response) {
        try {
            const games = await pool.then((r: any) => r.query(
                'SELECT * FROM games'
            ));
            res.json(games);
        } catch (e: any) {
            res.send(e.sqlMessage)
        }
    }
}

export const gamesController = new GamesController();