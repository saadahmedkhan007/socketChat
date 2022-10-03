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
  roomname: any;
  messages = [];
  isNotSame = false;
  i = -1;
  id2 = 2;
  // constructor() {
  //
  //   }
  // }

  constructor(private sibService: SiblingCommunicateService) {}

  ngOnInit(): void {
    this.sibService.currentData.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      this.name = data.name;
      this.socket = data.socket;
      this.emitter = data.emitter;
      this.username = data.username;
      this.roomname = data.roomL.toString().split(',');
      // this.i = this.i + 2;
      console.log('this is socket:' + this.socket['id']);

      if (!this.event) {
        this.socket.on('group-receive', (msg) => {
          this.appendMessage(msg, this.name);
          // scrollToBottom()
        });

        this.socket.on('peer-receive', (msg) => {
          this.appendMessage(msg, this.name);
          // scrollToBottom()
        });

        this.socket.on('rmes', (msg) => {
          // console.log(msg);

          this.appendMessage(msg, 'incoming');
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
    if (this.messages[0].name !== this.messages[1].name) {
      this.isNotSame = true;
    }
  }
}
