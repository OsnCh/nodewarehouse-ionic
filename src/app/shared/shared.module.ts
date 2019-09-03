import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookFilterModalPage } from './modals/book-filter-modal/book-filter-modal.page';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [BookFilterModalPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ BookFilterModalPage ]
})
export class SharedModule { }
