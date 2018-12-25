import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../models/message';
import { ChatHub } from '../models/chat-hub';
import { User } from '../models/user';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Input() activeChatHub: ChatHub;

  public msgFormGroup: FormGroup;

  constructor() {
    let formControls = {};
    formControls['msgField'] = new FormControl('');
    this.msgFormGroup = new FormGroup(formControls);
  }

  ngOnInit() {
    this.socket.on('send:message:server', (data) => {
      this.activeUser.hubList.forEach(hub => {
        this.updateHubsWithMessages(hub, Message.from(data.message));
      });
    })
  }

  sendMessage() {
    let content = this.msgFormGroup.value['msgField'];

    let message = new Message();
    message.fromUserId = this.activeUser.id;
    message.toUserId = this.activeChatHub.id;
    message.content = content;
    message.dateSent = new Date();

    this.socket.emit('send:message:client', { message: message, socketId: this.activeChatHub.socketId });

    this.updateHubsWithMessages(this.activeChatHub, message);
  }

  updateHubsWithMessages(hub: ChatHub, message: Message) {
    const userId = this.activeUser.id;
    const hubId = hub.id;

    if (message.toUserId === userId && message.fromUserId === hubId) {
      //TODO: Add daterecieved to message
      message.dateRecieved = new Date();
      //TODO: update dateRecieved in database
      hub.messages.push(message);

      if (!message.dateReaded) {
        hub.unreadMessageCount++;
      }
    }
    else if (message.fromUserId === userId && message.toUserId == hubId) {
      hub.messages.push(message);
    }
  }
}
