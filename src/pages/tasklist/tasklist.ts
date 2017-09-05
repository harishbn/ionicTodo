import { Component } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { Task } from './task';
import { AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-home',
  templateUrl: 'tasklist.html'
})

export class TaskListPage {
  tasks: FirebaseListObservable<any[]> ;

  subscribtion:any;

  constructor(public navCtrl: NavController, public afa: AngularFireDatabase,public authService: AuthServiceProvider) {
    if(authService.hasLoggedIn()) {
      this.loadTasks()
    }

    //TODO: Change to be something lke auth changed..
    this.subscribtion = authService.stateChange$.subscribe( loggedInFlag => {
      if(loggedInFlag) this.loadTasks();
      else this.tasks = null;
    })
  }

  loadTasks() {
    console.log("Loading tasks.... from DB")
    this.tasks = this.afa.list('/tasks');
  }

  login() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }

  addItem() {
    let theNewTask: string = prompt("New Task");
    if(theNewTask != '' ) {
      this.tasks.push({title:theNewTask, status:'open'});
    }
  }

  markAsDone(slidingItem: ItemSliding, task:Task) {
    //task.status = 'done';
    this.tasks.update(task.$key, {status:'done'});
    slidingItem.close();
  }

  removeTask(slidingItem: ItemSliding, task:Task) {
    this.tasks.remove(task.$key);
    /*task.status = "removed";
    let index = this.tasks.indexOf(task);
    if(index > -1) {
      this.tasks.splice(index, 1);
    }*/
    slidingItem.close();
  }

}
