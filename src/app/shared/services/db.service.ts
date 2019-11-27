import { Injectable } from '@angular/core';
import { pipe, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


export interface Draw {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  $store = new Subject<[Draw, Draw]>();
  $storeRef = this.db.list('/draw');
  constructor(public db: AngularFireDatabase) {
    this.initialize();
  }

  initialize() {
    this.$storeRef.remove();
  }

  get() {
    this.$storeRef.snapshotChanges(['child_added']).subscribe((snap) => {
      snap.forEach(action => {
        const val = action.payload.val() as [Draw, Draw];
        this.$store.next(val);
      })
    });
    return this.$store;
  }

  add(obj: [Draw, Draw]) {
    this.$storeRef.push(obj);
  }
}
