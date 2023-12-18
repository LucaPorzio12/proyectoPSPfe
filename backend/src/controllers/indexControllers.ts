import {Request, Response} from "express";

class IndexController{
    public async index(req: Request, res: Response){
        res.send('De verdad que la API está en /api/games así que no marees').status(200);
    }
}

export const indexController = new IndexController();