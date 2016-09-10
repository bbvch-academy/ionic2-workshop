import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyData } from '../../providers/my-data/my-data';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [MyData]
})
export class HomePage {

  private taskList;

  constructor(public navCtrl: NavController, private dataService: MyData) {
    dataService.getData().then(data => this.taskList = data);
  }
}
