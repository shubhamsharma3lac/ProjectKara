import { Component, OnInit, Input, Output } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser;
  @Output() chatHubChanged: EventEmitter<any>;

  constructor() {
    this.chatHubChanged = new EventEmitter();
  }

  ngOnInit() {
    this.getUsersAndMessages();
  }

  getUsersAndMessages() {
    // Get all the users from server
    this.socket.emit('fetch:users:client', { id: this.activeUser._id });

    this.socket.on('fetch:users:server', (data) => {
      this.activeUser.hubList = data.users;

      // Get all the messages
      this.socket.emit('fetch:messages:client', { id: this.activeUser._id });
    })

    this.socket.on('fetch:messages:server', (data) => {
      this.activeUser.hubList.forEach(hub => {
        data.messages.forEach(msg => {
          this.updateMessages(hub, msg);
        });
      });
    })
  }

  onHubChanged($event: any, user: any) {
    $('.list-messages').children().each(function () {
      $(this).removeClass('list-item-active');
    })

    $($event.currentTarget).addClass('list-item-active');

    this.chatHubChanged.emit(user);
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
