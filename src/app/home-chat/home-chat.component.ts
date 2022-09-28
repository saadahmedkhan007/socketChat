import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";

const ip = '192.168.1.113'

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.scss']
})

export class HomeChatComponent implements OnInit, AfterViewInit {
  // name: any
  textarea: any
  messageArea: any
  userList: any
  username: any
  buttons: [];
  messages = [];

  socket: Socket;

  constructor() { }

  ngOnInit(): void {
    this.socket = io(`http://${ip}:3000`);
  }

  ngAfterViewInit() {
    do {
      this.username = prompt('Please enter your name: ')
      // this.username = ["Dmk", "Saad", "bharat", "ankit", "angu", "abcd", "xyz"][Math.floor(Math.random() * 7)]

    } while (!this.username)
    this.socket.emit('iam', this.username)
    this.textarea = document.querySelector('#textarea')
    this.messageArea = document.querySelector('.message__area')
    // console.log(this.messageArea);

    // Recieve messages 
    this.socket.on('rmes', (msg) => {
      console.log(msg);

      this.appendMessage(msg, 'incoming')
      // scrollToBottom()
    })

    this.socket.on('userActiveList', (msg) => {
      this.buttons = msg;
      console.log(msg);

    })

    this.socket.on("peer-receive", (msg) => {

      this.appendMessage(msg, 'incoming')
      // scrollToBottom()
    })

    this.socket.on('user-removed', (msg) => {
      alert(msg + " " + 'has left')
    })

  }

  sendMessage(evt: any, toWhom = "all") {
    let msg = this.textarea.value
    let id = evt.target.value;
    console.log(msg);

    if (msg) {

      let msgObj = {
        id: id,
        user: this.username,
        mes: msg
      }
      // Append 
      this.appendMessage(msgObj, 'outgoing')
      this.textarea.value = ''
      // scrollToBottom()

      // Send to server 
      if (toWhom == "single") {
        this.socket.emit('messageOne', msgObj)
      } else
        this.socket.emit('message', msgObj)
    }

  }

  appendMessage(msg, type) {
    console.log("appendMessage(): ", msg, type)
    this.messages.push({ name: msg.user, mes: msg.mes, type: type });
  }
} 
