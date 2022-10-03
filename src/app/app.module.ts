import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeChatComponent } from './home-chat/home-chat.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [AppComponent, HomeChatComponent, ChatComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
