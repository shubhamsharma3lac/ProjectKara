import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-hub-list-item-details-message-list-item',
  templateUrl: './chat-hub-list-item-details-message-list-item.component.html',
  styleUrls: ['./chat-hub-list-item-details-message-list-item.component.css']
})
export class ChatHubListItemDetailsMessageListItemComponent implements OnInit {
  @Input() message;

  constructor() { }

  ngOnInit() {
  }

}
