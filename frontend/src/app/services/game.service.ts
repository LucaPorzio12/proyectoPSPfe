import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../common/game";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  API_URI = 'http://localhost:3000/api/games/';

  constructor(private http: HttpClient) {
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_URI);
  }

  getOneGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.API_URI + 'game/' + id);
  }

  getOneGameByName(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_URI + 'byName/' + name);
  }

  addGame(game: Game): Observable<ApiResult> {
    return this.http.post<ApiResult>(this.API_URI, game);
  }

  updateGame(game: Game): Observable<ApiResult> {
    return this.http.patch<ApiResult>(this.API_URI + game.id, game);
  }

  deleteGame(id: number): Observable<ApiResult> {
    return this.http.delete<ApiResult>(this.API_URI + id);
  }

}

interface ApiResult {
  status: string;
}
