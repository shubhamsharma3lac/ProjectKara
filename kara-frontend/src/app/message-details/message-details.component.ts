import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as io from 'socket.io-client';
import { Message } from '../models/message';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  @Input() activeUser;
  @Input() activeChatHub;
  public msgForm: FormGroup;
  public formControls = {};
  public socket: SocketIOClient.Socket;

  constructor() {
    this.formControls['msgField'] = new FormControl('');
    this.msgForm = new FormGroup(this.formControls);
  }

  ngOnInit() {
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

    this.socket.on('send:message:server', (data) => {
      this.activeUser.hubList.forEach(hub => {
        this.updateMessages(hub, data.message);
      });
    })
  }

  sendMessage() {
    var msgText = this.msgForm.value['msgField'];

    let fromUserId = this.activeUser._id;
    let toUserId = this.activeChatHub._id;
    let content = msgText;
    let dateSent = new Date();
    let dateRecieved = new Date();
    let dateReaded = new Date();

    var message = new Message(fromUserId, toUserId, content, dateSent, dateRecieved, dateReaded);
    this.socket.emit('send:message:client', { message: message, socketId: this.activeChatHub.socketId });

    this.updateMessages(this.activeChatHub, message);
  }

  updateMessages(hub: any, message: any) {
    if (!hub.messages) {
      hub.messages = [];
    }

    if (message.toUserId === this.activeUser._id && message.fromUserId === hub._id) {
      message.isSent = false;
      hub.messages.push(message);
    }
    else if (message.fromUserId === this.activeUser._id) {
      message.isSent = true;
      hub.messages.push(message);
    }
  }
}
