export class TaskModel {
    public id : number;
    constructor (public title: string, public completed: boolean) {};
}

export class TaskListModel {
 
    constructor(public items: TaskModel[]){
        
    }
 
    addItem(item: TaskModel) {
        item.id = this.items.length+1;
        this.items.push(item);
    }
 
    removeItem(item: TaskModel) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].id == item.id){
                this.items.splice(i, 1);
            }
        }
    }
}