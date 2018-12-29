import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { ChatHub } from '../models/chat-hub';

@Component({
  selector: 'app-chat-hub-list-item-details-header-bar',
  templateUrl: './chat-hub-list-item-details-header-bar.component.html',
  styleUrls: ['./chat-hub-list-item-details-header-bar.component.css']
})
export class ChatHubListItemDetailsHeaderBarComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Input() activeChatHub: ChatHub;
  
  constructor() { }

  ngOnInit() {
  }

}
