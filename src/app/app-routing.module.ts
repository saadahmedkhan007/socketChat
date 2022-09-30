import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { HomeChatComponent } from './home-chat/home-chat.component';

const routes: Routes = [{
  path: '', component: HomeChatComponent,

}, {
  path : 'chat',component:ChatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
