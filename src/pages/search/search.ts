import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { EngineProvider } from '../../providers/engine/engine';
import { IMovie } from '../../models/movie';
import { DetailPage } from '../detail/deatil';
import { NotFound } from '../../errors/not-found-error';

//refactored
@Component({
  selector: 'page-sarch',
  templateUrl: 'search.html'
})
export class SearchPage {
  num;
  pushPage: any;
  result: IMovie[];
  constructor(
    public navCtrl: NavController,
    private alert: AlertProvider,
    private service: EngineProvider,
    private loading: LoadingController
  ) {
    this.pushPage = DetailPage;
  }

  compareFn(a, b) {
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;
    return 0;
  }

  test(e) {
    let spinner = this.loading.create({
      content: 'searching ..'
    });
    if (this.isEmpty(e.target.value)) {
      spinner.dismiss();
      return;
    }
    spinner.present();
    console.log(e.target.value);
    this.service.getMovie(e.target.value).subscribe(
      res => {
        console.log(res.data.movies);
        this.result = res.data.movies;
        spinner.dismiss();
        if (res.data.movies === undefined) {
          this.alert.presentAlert(
            'Did not found your request',
            'bottom',
            'warn'
          );
        }
      },
      err => {
        if (err instanceof NotFound) {
          console.log('not found');
        } else throw err;
      }
    );
  }

  getDetails() {
    this.navCtrl.push('detail');
    console.log('this is the details');
  }

  navigateToMovie(e) {
    this.num = { myid: e };
    this.navCtrl.push(this.pushPage, this.num);
    console.log(this.num);
  }

  isEmpty(str) {
    return str.replace(/^\s+|\s+$/gm, '').length == 0;
  }
}
