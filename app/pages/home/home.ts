import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyData } from '../../providers/my-data/my-data';
//import { TaskListModel } from '../../models/task-list-model';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [MyData]
})
export class HomePage {

  public taskList;

  constructor(public navCtrl: NavController, private dataService: MyData) {
    dataService.getData().then(data => this.taskList = data);
    console.log(this.taskList);
  }
}
