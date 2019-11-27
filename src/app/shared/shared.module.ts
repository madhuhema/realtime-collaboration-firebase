import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbService } from './services/db.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DbService
  ]
})
export class SharedModule { }
