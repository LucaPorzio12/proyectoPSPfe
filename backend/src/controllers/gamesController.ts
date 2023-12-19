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
            res.status(400).send(e.sqlMessage)
        }
    }

    public async listGames(req: Request, res: Response) {
        try {
            const games = await pool.then((r: any) => r.query(
                'SELECT * FROM games'
            ));
            res.status(200).json(games);
        } catch (e: any) {
            res.status(400).send(e.sqlMessage)
        }
    }

    public async getOneGame(req: Request, res: Response) {
        try {
            const id = req.params.id as unknown as number;
            const game = await pool.then((r: any) => r.query(
                'SELECT * FROM games where id = ?', [id]
            ));
            if (game.length > 0) return res.status(200).json(game[0])
            res.status(404).json({status: 'Juego no encontrado'});
        } catch (e: any) {
            res.status(400).send(e.sqlMessage)
        }
    }

    public async getGameByName(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const games = await pool.then((r: any) => r.query(
                'SELECT * FROM games where title like "%"?"%"', [name]
            ));
            if (games.length > 0) return res.status(200).json(games)
            res.status(404).json({status: 'No aparecen juegos con ese nombre'});
        } catch (e: any) {
            res.status(400).send(e.sqlMessage)
        }
    }

    public async updateGame(req: Request, res: Response) {
        try {
            const id = req.params.id as unknown as number;
            await pool.then((r: any) => r.query(
                'UPDATE games set ? where id = ?', [req.body, id]
            )).then((data: any) => {
                if (data.changedRows > 0) {
                    res.status(200).json({status: 'Juego actualizado'});
                }else{
                    res.status(404).json({status: 'No existe un juego con ese id.'});
                }
            });
        } catch (e: any) {
            res.status(400).send(e.sqlMessage)
        }
    }
    public async deleteGame(req: Request, res: Response) {
        try {
            const id = req.params.id as unknown as number;
            await pool.then((r: any) => r.query(
                'DELETE from games where id = ?', [id]
            )).then((data: any) => {
                if (data.affectedRows > 0) {
                    res.status(200).json({status: 'Juego borrado'});
                }else{
                    res.status(404).json({status: 'No existe un juego con ese id.'});
                }
            });
        } catch (e: any) {
            res.status(400).send(e.sqlMessage)
        }
    }
}

export const gamesController = new GamesController();