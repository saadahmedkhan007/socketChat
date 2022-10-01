import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SiblingCommunicateService } from '../sibling-communicate.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  id: string;
  userList: any;
  name: any;
  username: any;
  textarea: any;
  socket: Socket;
  emitter: any;
  messageArea: any;
  event = false;
  messages = [];
  constructor(private sibService: SiblingCommunicateService) {}

  ngOnInit(): void {
    this.sibService.currentData.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.name = data.name;
      this.socket = data.socket;
      this.emitter = data.emitter;
      this.username = data.username;

      if (!this.event) {
        this.socket.on('group-receive', (msg) => {
          this.appendMessage(msg, this.name);
          // scrollToBottom()
        });

        this.socket.on('peer-receive', (msg) => {
          this.appendMessage(msg, this.name);
          // scrollToBottom()
        });

        this.event = true;
      }
    });
  }

  ngAfterViewInit() {
    this.textarea = document.querySelector('#textarea');
    this.messageArea = document.querySelector('.message__area');
  }

  send() {
    let msg = this.textarea.value;
    // console.log('from send message:'+msg);
    // this.messages = msg
    if (msg) {
      let msgObj = {
        id: this.id,
        user: this.name,
        mes: msg,
      };

      console.log(msgObj);

      // Append
      this.appendMessage(msgObj, this.username);
      this.textarea.value = '';
      // scrollToBottom()

      // Send to server

      this.socket.emit(this.emitter, msgObj);
    }
  }

  appendMessage(msg, type) {
    this.messages.push({ name: msg.user, mes: msg.mes, type: type });

    console.log('from appendMessage:', this.messages);
  }
}
