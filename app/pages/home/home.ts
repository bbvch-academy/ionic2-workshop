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
    this.loading.present();
    this.dataService.getData().then(data => {
      this.taskList = data as [];
      this.loading.dismiss();
    });
    console.log(this.taskList);
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
    // Save to db
    this.dataService.saveData(this.taskList);
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
    });
    controller.present();
  }

  addItem(newItem) {
    let index = this.taskList.length - 1 ;
    if(index > 0) {
      newItem.id = this.taskList[index].id + 1;
    } else {
      newItem.id = 1;
    }
    this.taskList.push(newItem);
    // Save to db
    this.dataService.saveData(this.taskList);
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
    // Show toast
    let message = (success ? `${item.title} successfully deleted.`: `Could not delete ${item.title}`);
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
    // Save to db
    this.dataService.saveData(this.taskList);
  }
  
  updateItem(item) {
    // Save to db
    this.dataService.saveData(this.taskList);
  }

}

