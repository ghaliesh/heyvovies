import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AlertProvider {
  constructor(private toastCtrl: ToastController) {}

  presentAlert(subTitle, position, cssClass) {
    let toast = this.toastCtrl.create({
      message: subTitle,
      duration: 2500,
      position: position,
      showCloseButton: true,
      cssClass: cssClass
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
