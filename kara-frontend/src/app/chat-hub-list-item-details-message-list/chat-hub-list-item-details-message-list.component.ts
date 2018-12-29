import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { ChatHub } from '../models/chat-hub';

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
  }

}
