import { DetailPage } from './../detail/deatil';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { EngineProvider } from '../../providers/engine/engine';
import { IMovie } from '../../models/movie';
import { NotFound } from '../../errors/not-found-error';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: IMovie[];
  pushPage = DetailPage;
  id: { myid: 0 };
  constructor(
    public navCtrl: NavController,
    private service: EngineProvider,
    private alert: AlertProvider
  ) {}

  ionViewDidLoad() {
    this.service.upcomingMovies().subscribe(
      res => {
        this.movies = res.data.movies;
        console.log(res);
      },
      err => {
        if (err instanceof NotFound) {
          console.log('not found');
          this.alert.presentAlert('Could not find the movie', 'bottom', 'warn');
        } else throw err;
      }
    );
  }

  navigateToMovie(movieId) {
    console.log(movieId);
    this.id = { myid: movieId };
    this.navCtrl.push(this.pushPage, this.id);
  }
}
