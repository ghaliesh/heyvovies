import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//refactored

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}
}
