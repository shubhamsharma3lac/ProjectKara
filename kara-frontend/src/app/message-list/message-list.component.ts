import { Component, OnInit, Input, Output } from '@angular/core';
import * as io from 'socket.io-client';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';
import { ChatHub } from '../models/chat-hub';
import { Message } from '../models/message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Output() chatHubChanged: EventEmitter<ChatHub>;

  constructor() {
    this.chatHubChanged = new EventEmitter();
  }

  ngOnInit() {
    this.getChatHubs();
  }

  getChatHubs() {
    const userId = this.activeUser.id;

    // Emit the event to socket to fetch all the chat hubs of the current user
    this.socket.emit('fetch:users:client', { id: userId });

    // Event Response to fetch:user:client from server
    this.socket.on('fetch:users:server', (data) => {
      //TODO: Map users or groups to 'ChatHub'
      data.users.forEach(user => {
        this.activeUser.hubList.push(ChatHub.from(user));
      });

      this.listenToChatHubUpdates();

      // Emit the event to socket to fetch all the messages of the current user
      this.socket.emit('fetch:messages:client', { id: userId });
    })

    // Event Response to fetch:messages:client from server
    this.socket.on('fetch:messages:server', (data) => {
      this.activeUser.hubList.forEach(hub => {
        data.messages.forEach(msg => {
          this.updateHubsWithMessages(hub, msg);
        });
      });
    })
  }

  updateHubsWithMessages(hub: ChatHub, message: Message) {
    const userId = this.activeUser.id;
    const hubId = hub.id;

    if (message.toUserId === userId && message.fromUserId === hubId) {
      hub.messages.push(message);
    }
    else if (message.fromUserId === userId && message.toUserId == hubId) {
      hub.messages.push(message);
    }
  }

  listenToChatHubUpdates() {
    this.socket.on('update:user:socketId:server', (data) => {
      let userId = data.id;
      let socketId = data.socketId;

      this.activeUser.hubList.forEach(hub => {
        if (hub.id === userId) {
          hub.socketId = socketId;
        }
      });
    })
  }

  onChatHubChanged($event: any, hub: ChatHub) {
    $('.list-messages').children().each(function () {
      $(this).removeClass('list-item-active');
    })

    $(event.currentTarget).addClass('list-item-active');

    this.chatHubChanged.emit(hub);
  }
}
