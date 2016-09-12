import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, Refresher, ModalController, ToastController } from 'ionic-angular';
import { MyData } from '../../providers/my-data/my-data';
//import { TaskListModel } from '../../models/task-list-model';
import { ItemDetailPage } from '../item-detail/item-detail';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [MyData]
})
export class HomePage {

  public taskList = [];
  private loading: Loading;

  constructor(public navCtrl: NavController, 
              public dataService: MyData, 
              public loadingCtrl: LoadingController, 
              public modalCtrl: ModalController,
              public toastCtrl: ToastController) {
    this.loading = this.loadingCtrl.create({
      content: "Loading...",
      dismissOnPageChange: true
    });
  }

  ionViewLoaded() {
    this.dataService.getData().then(data => {
      this.taskList = data as [];
      this.loading.dismiss();
    });
    console.log(this.taskList);
  }

  ionViewDidEnter() {
    this.loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.dataService.getData().then(data => {
      this.taskList = data as [];
      refresher.complete();
    });
  }

  itemTapped($event: MouseEvent, item) {
    console.log('itemTapped '+event);
    this.navCtrl.push(ItemDetailPage, {'item': item, 'parent':this});
  }

  checkboxTapped($event: MouseEvent, item) {
    $event.stopPropagation();
    console.log('checkboxTapped '+event);
    item.completed = !item.completed;
  }

  addItemButtonTapped($event) {
    console.log('addItemButtonTapped');
    let controller = this.modalCtrl.create(ItemDetailPage);
    controller.onDidDismiss(data => {
      console.log(data)
      // Add new item to our list
      if (data !== undefined)
      {
        this.addItem(data);
      }
      // Hack: Without this line the would remain stuck
      controller.destroy();
    });
    controller.present();
  }

  addItem(newItem) {
    let index = this.taskList.length -1 ;
    newItem.id = this.taskList[index].id + 1;
    this.taskList.push(newItem);
  }

  deleteItem(item) {
    let success = false;
    for(let i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i] == item){
          this.taskList.splice(i, 1);
          success = true;
          break;
      }
    }
    let message = (success ? `${item.title} successfully deleted.`: `Could not delete ${item.title}`);
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}

