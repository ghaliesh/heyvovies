import { IMovie } from './../../models/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/deatil';
//refactored

@Component({
  selector: 'page-suggested',
  templateUrl: 'suggested.html'
})
export class SuggestedPage {
  pushPage = DetailPage;
  movies: IMovie[];
  id: { myid: 0 };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.movies = this.navParams.get('movies');
  }

  ionViewDidLoad() {
    console.log(this.movies);
  }

  navigateToMovie(movieId) {
    console.log(movieId);
    this.id = { myid: movieId };
    this.navCtrl.push(this.pushPage, this.id);
  }
}
