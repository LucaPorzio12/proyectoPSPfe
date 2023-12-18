import cors from "cors";
import express, {Application, Request, Response} from "express";
import morgan from "morgan";
import indexRoutes from "./routes/indexRoutes";
import gamesRoutes from "./routes/gamesRoutes";

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    private routes() {
        this.app.use('/api/games', gamesRoutes);
        this.app.use('/', indexRoutes);
        this.app.use('/', (req: Request, res: Response) => res.send('API is in /api/games'));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('API Listening on port: ', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();