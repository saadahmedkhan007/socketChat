import { AfterViewInit, Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { SiblingCommunicateService } from '../sibling-communicate.service';

const ip = '192.168.1.113'

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.scss']
})

export class HomeChatComponent implements OnInit, AfterViewInit {
  // name: any

  messages = [];
  buttons: [];
  username: any
  roomId = []
  socket: Socket;
  roomArea: any
  roomList = []
  groups = {}
  textarea: any
  messageArea
  constructor(private sibService:SiblingCommunicateService) { }

  ngOnInit(): void {
    this.socket = io(`http://${ip}:3000`);
    do {
      this.username = prompt('Please enter your name: ')
      // this.username = ["Dmk", "Saad", "bharat", "ankit", "angu", "abcd", "xyz"][Math.floor(Math.random() * 7)]

    } while (!this.username)

    this.socket.on('roomlist', (arrayRlist) => {
      this.roomList = arrayRlist
      console.log('from roomList' + this.roomList);

    })
  }

  ngAfterViewInit() {

    this.textarea = document.querySelector('#textarea')
    this.messageArea = document.querySelector('.message__area');
    this.socket.emit('iam', this.username)

    this.roomArea = document.querySelector('#roomName')
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

    this.socket.on("group-receive", (msg) => {

      this.appendMessage(msg, 'incoming')
      // scrollToBottom()
    })

    this.socket.on("peer-receive", (msg) => {

      this.appendMessage(msg, 'incoming')
      // scrollToBottom()
    })

    this.socket.on('user-removed', (msg) => {
      alert(msg + " " + 'has left')
    })

    this.socket.on('user-added', (msg) => {
      alert(msg.name + " " + 'has joined')
    })
  }

  appendMessage(msg, type) {
    console.log("appendMessage(): ", msg, type)
    this.messages.push({ name: msg.user, mes: msg.mes, type: type });
  }


  //Room Listener
  createRoom() {
    this.socket.emit('createRoom', this.roomArea.value);
    console.log('createroom hit');
  }

  //Group Message
  joinGroup(evt: any, list: any) {
      let id = evt.target.value;



    if (!this.groups[id]) {
      this.groups[id] = "1"
      this.socket.emit("joinRoom", id);
    }
    // console.log(msg)

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

}
