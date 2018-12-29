import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { ChatHub } from '../models/chat-hub';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat-hub-list-item-details-message-list',
  templateUrl: './chat-hub-list-item-details-message-list.component.html',
  styleUrls: ['./chat-hub-list-item-details-message-list.component.css']
})
export class ChatHubListItemDetailsMessageListComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Input() activeChatHub: ChatHub;

  constructor() { }

  ngOnInit() {
    this.listenToServerEvents();
  }

  listenToServerEvents() {
    this.socket.on('ack:message:recieved::server', data => {
      let messageId = data._id;
      let dateRecieved = data.dateRecieved;

      this.activeUser.hubList.forEach(hub => {
        hub.messages.forEach(message => {
          if (message.id === messageId) {
            message.dateRecieved = message.dateRecieved;
          }
        })
      })
    })
  }
}
