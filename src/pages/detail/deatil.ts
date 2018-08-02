import { IMovie } from './../../models/movie';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { EngineProvider } from '../../providers/engine/engine';
import { NotFound } from '../../errors/not-found-error';
import { Clipboard } from '../../../node_modules/@ionic-native/clipboard';
import { SuggestedPage } from '../suggested/suggested';
import { AlertProvider } from '../../providers/alert/alert';
//refactored
@Component({
  selector: 'page-detail',
  templateUrl: './detail.html'
})
export class DetailPage {
  id: any;
  movie: IMovie;
  pushPage = SuggestedPage;
  constructor(
    public navCtrl: NavController,
    private service: EngineProvider,
    private navParams: NavParams,
    private clip: Clipboard,
    private alert: AlertProvider
  ) {
    this.id = this.navParams.get('myid');
  }

  ionViewDidLoad() {
    console.log('this is the id', this.id);
    this.service.getDetails(this.id).subscribe(
      res => {
        this.movie = res.data.movie;
        console.log(this.movie);
      },
      err => {
        if (err instanceof NotFound) {
          this.alert.presentAlert('Could not find the movie', 'bottom', 'warn');
        } else throw err;
      }
    );
  }

  suggestedMovies() {
    this.service.getSuggestedMovies(this.movie.id).subscribe(
      res => {
        console.log(res.data.movies);
        const suggested = { movies: res.data.movies };
        this.navCtrl.push(this.pushPage, suggested);
      },
      err => {
        if (err instanceof NotFound) {
          this.alert.presentAlert(
            'Could not find suggested movies',
            'bottom',
            'warn'
          );
        } else {
          throw err;
        }
      }
    );
  }

  constructLink(e) {
    const encodedName = encodeURI(this.movie.title);
    let magnetLink;
    console.log(e);
    if (e.target.innerHTML === 'Download 1080') {
      magnetLink = `magnet:?xt=urn:btih:${this.movie.torrents[1].hash}&dn=${
        this.movie.torrents[1].url
      }+${encodedName}&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969`;
      console.info('1080 clicked', magnetLink);
    }
    if (e.target.innerHTML === 'Download 720') {
      magnetLink = `magnet:?xt=urn:btih:${this.movie.torrents[0].hash}&dn=${
        this.movie.torrents[0].url
      }+${encodedName}&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969`;
      console.info('720 clicked', magnetLink);
    }
    this.clip
      .copy(magnetLink)
      .then(res =>
        this.alert.presentAlert(
          'magnet link copied to clipboard',
          'top',
          'success'
        )
      )
      .catch(res =>
        this.alert.presentAlert('Could not copy the link', 'bottom', 'warn')
      );
  }
}
