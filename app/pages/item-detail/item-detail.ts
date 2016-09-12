import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the ItemDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/item-detail/item-detail.html',
})
export class ItemDetailPage {

  public item; 
  public isNewTask = false;

  constructor(private navCtrl: NavController, 
              private params: NavParams, 
              private viewCtrl: ViewController, 
              public alertCtrl: AlertController) {

    this.item = params.get('item');
    if (this.item === undefined) {
      this.item = { title: 'New Task' };
      this.isNewTask = true;
    }
  }

  saveNewTaskButtonTapped($event) {
    this.viewCtrl.dismiss(this.item);
  }

  cancelButtonTapped($event) {
    this.viewCtrl.dismiss();
  }

  deleteButtonTapped($event) {
    let alert = this.alertCtrl.create({
      title: 'Delete Task',
      message: `Do you really want to delete ${this.item.title}?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Delete',
          handler: () => {
            let parent:HomePage = this.params.get("parent");
            parent.deleteItem(this.item);
            let navTransition = alert.dismiss();
            navTransition.then(() => this.viewCtrl.dismiss());
          }
        }]
    });
    alert.present();
  }
}
