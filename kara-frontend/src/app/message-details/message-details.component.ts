import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../models/message';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser;
  @Input() activeChatHub;

  public msgFormGroup: FormGroup;

  constructor() {
    let formControls = {};
    formControls['msgField'] = new FormControl('');
    this.msgFormGroup = new FormGroup(formControls);
  }

  ngOnInit() {
    this.socket.on('send:message:server', (data) => {
      this.activeUser.hubList.forEach(hub => {
        this.updateMessages(hub, data.message);
      });
    })
  }

  sendMessage() {
    var msgText = this.msgFormGroup.value['msgField'];

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
