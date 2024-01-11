import {Component} from '@angular/core';
import {Game} from "../../common/game";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent {
  favorites = false;
  gamesList: Game[] = [];
  games: Game[] = [];
  toast = {
    header: '',
    body: '',
    duration: 2000
  }
  toastShow = false;

  constructor(private gameService: GameService) {
    this.loadGames();
  }

  loadGames() {
    this.gameService.getGames().subscribe(
      {
        next: value => {
          this.games = value;
          this.gamesList = value;
        },
        error: err => {
          this.toast.body = err.message;
          this.toastShow = true;
          setTimeout(() => {
            this.toastShow = false;
          }, 2000);
        },
        complete: () => {
          console.log('Load complete');
        }
      });
  }

  changeFavorite(game: Game) {
    game.favorite = !game.favorite;
    this.gameService.updateGame(game).subscribe(
      {
        next: value => {
          if (game.favorite) {
            this.toast.body = 'Juego añadido a favoritos';
            this.toastShow = true;
            setTimeout(() => {
              this.toastShow = false;
            }, 2000);
          } else {
            this.toast.body = 'Juego eliminado de favoritos';
            this.toastShow = true;
            setTimeout(() => {
              this.toastShow = false;
            }, 2000);
          }
          this.loadFavorites();
        }
      }
    );
  }

  private loadFavorites() {
    if (this.favorites) {
      this.gamesList = this.games.filter(game => game.favorite);
    } else {
      this.gamesList = this.games;
    }
  }

  favoriteList() {
    this.favorites = !this.favorites;
    this.loadFavorites();
  }

  search(event: any) {
    this.gamesList = this.games.filter(
      game =>
        game.title.toLowerCase().indexOf(event) > 0 ||
        game.subtitle.toLowerCase().indexOf(event) > 0 ||
        game.description.toLowerCase().indexOf(event) > 0
    );

    this.gameService.getOneGameByName(event).subscribe(
      {
        next: value => {
          this.gamesList = value;
        },
        error: err => {
          this.toast.body = err.message;
          this.toastShow = true;
          setTimeout(() => {
            this.toastShow = false;
          }, 2000);
        },
        complete: () => {
          console.log('Load complete');
        }
      }
    )
  }

  deleteGame(game: Game) {
    if (game.id) this.gameService.deleteGame(game.id).subscribe(
      {
        next: value => {
          this.toast.body = value.status;
          this.toastShow = true;
          setTimeout(() => {
            this.toastShow = false;
          }, 2000);
        },
        error: err => {
          this.toast.body = err.message;
          this.toastShow = true;
          setTimeout(() => {
            this.toastShow = false;
          }, 2000);
        },
        complete: () => {
          console.log('Load complete');
        }
      }
    );
  }
}
