import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Camera, ActionSheet } from 'ionic-native';

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

  constructor(public navCtrl: NavController, 
              public params: NavParams, 
              public viewCtrl: ViewController, 
              public alertCtrl: AlertController ) {

    this.item = params.get('item');
    if (this.item === undefined) {
      this.item = { title: 'New Task' };
      this.isNewTask = true;
    }
  }

  ionViewWillLeave() {
    let parent:HomePage = this.params.get("parent");
    parent.updateItem(this.item);
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
            let navTransition = alert.dismiss();
            navTransition.then(() => {
              this.viewCtrl.dismiss()
              let parent:HomePage = this.params.get("parent");
              parent.deleteItem(this.item);
            });
          }
        }]
    });
    alert.present();
  }

  addPictureButtonTapped($event) {
    let buttonLabels = ['Camera', 'Gallery'];
    ActionSheet.show({
      'title': 'Add a picture from...?',
      'buttonLabels': buttonLabels,
      'addCancelButtonWithLabel': 'Cancel'
    }).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
      switch (buttonIndex) {
        case 1:
          this.takePicture(false);
          break;
      case 2:
          this.takePicture(true);
          break;
        default:
          break;
      }
    });
  }

  takePicture(fromLibrary: boolean) {
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 800,
        targetHeight: 600,
        sourceType: (fromLibrary ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA),
        allowEdit: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.item.picture = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

}
