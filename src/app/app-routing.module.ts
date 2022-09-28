import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeChatComponent } from './home-chat/home-chat.component';

const routes: Routes = [{
  path: '', component: HomeChatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
