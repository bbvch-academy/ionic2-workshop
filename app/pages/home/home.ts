import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, Refresher } from 'ionic-angular';
import { MyData } from '../../providers/my-data/my-data';
//import { TaskListModel } from '../../models/task-list-model';
import { ItemDetailPage } from '../item-detail/item-detail';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [MyData]
})
export class HomePage {

  public taskList;
  private loading: Loading;

  constructor(public navCtrl: NavController, private dataService: MyData, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: "Loading...",
      dismissOnPageChange: true
    });
  }

  ionViewLoaded() {
    this.dataService.getData().then(data => {
      this.taskList = data;
      this.loading.dismiss();
    });
    console.log(this.taskList);
  }

  ionViewDidEnter() {
    this.loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.dataService.getData().then(data => {
      this.taskList = data;
      refresher.complete();
    });
  }

  itemTapped($event: MouseEvent, item) {
    console.log('itemTapped '+event);
    this.navCtrl.push(ItemDetailPage, {'item': item});
  }

  checkboxTapped($event: MouseEvent, item) {
    $event.stopPropagation();
    console.log('checkboxTapped '+event);
    item.completed = !item.completed;
  }
}
