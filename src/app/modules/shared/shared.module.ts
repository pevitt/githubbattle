import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UserCardComponent
  ],
  declarations: [UserCardComponent]
})
export class SharedModule { }
