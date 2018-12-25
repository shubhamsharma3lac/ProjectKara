import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import * as io from 'socket.io-client';
import { ChatHub } from '../models/chat-hub';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public socket: SocketIOClient.Socket;
  public activeUser: User;
  public activeChatHub: ChatHub;

  constructor() { 
    this.activeUser = User.from(JSON.parse(localStorage.getItem('user')));
  }

  ngOnInit() {
    this.initializeSocket();
  }

  initializeSocket(){
    var userId = this.activeUser.id;

    this.socket = io('http://localhost:3000/');
    this.socket.on('connect', () => {
      //TODO: update user with socket id
      this.activeUser.socketId = this.socket.id;
      this.socket.emit('update:user:socketId:client', { userId: userId });
      console.log(this.socket.id);
    });

    this.socket.on('reconnect', () => {
      //TODO: update user with socket id
      this.activeUser.socketId = this.socket.id;
      this.socket.emit('update:user:socketId:client', { userId: userId });
      console.log(this.socket.id);
    })

    this.socket.on('disconnect', () => {
      console.log(this.socket.id);
    })
  }

  chatHubChanged(hub: ChatHub){
    this.activeChatHub = hub;
  }
}
