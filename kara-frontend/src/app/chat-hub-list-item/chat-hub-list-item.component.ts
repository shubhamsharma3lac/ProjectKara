import { Component, OnInit, Input } from '@angular/core';
import { ChatHub } from '../models/chat-hub';

@Component({
  selector: 'app-chat-hub-list-item',
  templateUrl: './chat-hub-list-item.component.html',
  styleUrls: ['./chat-hub-list-item.component.css']
})
export class ChatHubListItemComponent implements OnInit {
  @Input() hub: ChatHub;

  constructor() { }

  ngOnInit() {
  }

}
