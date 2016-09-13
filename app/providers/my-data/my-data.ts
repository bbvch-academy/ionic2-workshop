import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { Storage, SqlStorage } from 'ionic-angular';

//import { TaskListModel} from '../../models/task-list-model';
/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const _dbName = 'todoDB';
const _key = 'todos';

@Injectable()
export class MyData {

  private storage: Storage;
  

  constructor() {
    this.storage = new Storage(SqlStorage, {name: _dbName} );
  }
  
  getData() {
    return new Promise(resolve => {
      this.storage.get(_key).then(value => {
        let data = JSON.parse(value);
        resolve(data);
      });
    });
    
  }

  saveData(data: any[]) {
    let newData = JSON.stringify(data);
    return this.storage.set(_key, newData);
  }
}

