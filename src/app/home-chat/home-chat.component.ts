import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { SiblingCommunicateService } from '../sibling-communicate.service';

const ip = '192.168.1.113';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.scss'],
})
export class HomeChatComponent implements OnInit, AfterViewInit {
  // name: any
  data: any;
  messages = [];
  buttons: [];
  username: any;
  roomId = [];
  socket: Socket;
  roomArea: any;
  roomList = [];
  groups = {};
  textarea: any;
  // messageArea
  constructor(private sibService: SiblingCommunicateService) {}

  ngOnInit(): void {
    this.socket = io(`http://${ip}:3000`);
    do {
      this.username = prompt('Please enter your name: ');
      // this.username = ['Dmk', 'Saad', 'bharat', 'ankit', 'angu', 'abcd', 'xyz'][
      //   Math.floor(Math.random() * 7)
      // ];
    } while (!this.username);

    this.socket.on('roomlist', (arrayRlist) => {
      this.roomList = arrayRlist;
      console.log('This is from roomList:' + this.roomList);
    });
  }

  ngAfterViewInit() {
    this.socket.emit('iam', this.username);

    this.roomArea = document.querySelector('#roomName');

    // Recieve messages

    this.socket.on('userActiveList', (msg) => {
      this.buttons = msg;
      // console.log(msg);
    });

    this.socket.on('user-removed', (msg) => {
      // alert(msg + " " + 'has left')
      console.log(msg + ' ' + 'has left');
    });

    this.socket.on('user-added', (msg) => {
      // alert(msg.name + " " + 'has joined')
      console.log(msg.name + ' ' + 'has joined');
    });
  }

  appendMessage(msg, type) {
    // console.log("appendMessage(): ", msg, type)
    this.messages.push({ name: msg.user, mes: msg.mes, type: type });
  }

  //Room Listener
  createRoom() {
    this.socket.emit('createRoom', this.roomArea.value);
    console.log('createroom hit');
  }

  openChat(evt: any, emitter) {
    // let msg = this.textarea.value
    let id = evt.target.value;
    this.sendDataToService({
      id,
      username: this.username,
      name: evt.target.innerText,
      socket: this.socket,
      roomL: this.roomList,
      emitter,
    });

    if (emitter == 'messageGroup') {
      if (!this.groups[id]) {
        this.groups[id] = '1';
        this.socket.emit('joinRoom', id);
      }
    }

    if (emitter == 'message') {
      this.socket.emit('message', id);
    }
  }

  sendDataToService(data: any) {
    this.sibService.setData(data);
  }
}
