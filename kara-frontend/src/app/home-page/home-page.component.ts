import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public socket: SocketIOClient.Socket;
  public activeUser: any;
  public activeChatHub: any;

  constructor() { 
    this.activeUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.initializeSocket();
  }

  initializeSocket(){
    this.socket = io('http://localhost:3000/');
    this.socket.on('connect', () => {
      //TODO: update user with socket id
      this.activeUser.socketId = this.socket.id;
      this.socket.emit('update:user:socketId:client', { userId: this.activeUser._id });
      console.log(this.socket.id);
    });

    this.socket.on('reconnect', () => {
      //TODO: update user with socket id
      this.activeUser.socketId = this.socket.id;
      this.socket.emit('update:user:socketId:client', { userId: this.activeUser._id });
      console.log(this.socket.id);
    })

    this.socket.on('disconnect', () => {
      console.log(this.socket.id);
    })

    this.socket.on('update:user:socketId:server', (data) => {
      let userId = data.id;
      let socketId = data.socketId;

      if(!this.activeUser.hubList){
        this.activeUser.hubList = [];
      }

      this.activeUser.hubList.forEach(hub => {
        if(hub._id === userId){
          hub.socketId = socketId;
        }
      });
    })
  }

  chatHubChanged(hub: any){
    this.activeChatHub = hub;
  }
}
