import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesListComponent} from "./components/games-list/games-list.component";
import {GamesEditComponent} from "./components/games-edit/games-edit.component";
import {BookListComponent} from "./components/book-list/book-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  }, {
    path: 'games',
    component: GamesListComponent
  }, {
    path: 'games/edit/:id',
    component: GamesEditComponent
  }, {
    path: 'games/add',
    component: GamesEditComponent
  },
  {
    path: 'books',
    component: BookListComponent
  },
  {
    path: 'books/add',
    component: BookListComponent
  },
  {
    path: '**',
    redirectTo: '/games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
