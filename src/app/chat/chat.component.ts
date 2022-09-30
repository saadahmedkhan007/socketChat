import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";
const ip = '192.168.1.113'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit ,AfterViewInit{
  userList: any
  username: any
  textarea: any
  socket: Socket;
  messageArea: any
  messages = [];
  constructor() { }


  ngOnInit(): void {
    this.socket = io(`http://${ip}:3000`);
  }


  ngAfterViewInit() {

    this.textarea = document.querySelector('#textarea')
    this.messageArea = document.querySelector('.message__area')
  }

  sendInGroup(evt: any, toWhom = "all") {
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
