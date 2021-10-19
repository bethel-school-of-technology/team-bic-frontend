import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.page.html',
  styleUrls: ['./create-routine.page.scss'],
})
export class CreateRoutinePage implements OnInit {
  modalDataResponse: any;

  constructor(public modalCtrl: ModalController) { }
  

  ngOnInit() {
  }

  async initModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        'name': 'The Winter Soldier'
      },
      cssClass: 'routine-settings'
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
      }
    });

    return await modal.present();
  }
}
