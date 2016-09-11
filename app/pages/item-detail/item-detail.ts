import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(private navCtrl: NavController, private params: NavParams, private viewCtrl: ViewController) {
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

}
