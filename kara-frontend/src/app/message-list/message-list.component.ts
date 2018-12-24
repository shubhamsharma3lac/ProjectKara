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

  @Input() activeUser;
  @Output() messageChanged = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
    var socket = io('http://localhost:3000/');
    socket.emit('fetch:users:client');

    socket.on('fetch:users:server', (data) => {
      this.activeUser.friendList = data.users;
    })
  }

  onMessageListItemChanged($event: any, user: any){
    $('.list-messages').children().each(function(){
      $(this).removeClass('list-item-active');
    })

    $($event.currentTarget).addClass('list-item-active');

    this.messageChanged.emit(user);
  }

}
