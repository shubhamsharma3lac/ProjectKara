import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as io from 'socket.io-client';
import { Message } from '../models/message';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  @Input() activeUser;
  @Input() activeChatHub;
  public msgForm: FormGroup;
  public formControls = {};
  public socket: SocketIOClient.Socket;
  
  constructor() { 
    this.formControls['msgField'] = new FormControl('');
    this.msgForm = new FormGroup(this.formControls);
  }

  ngOnInit() {    
    this.socket = io('http://localhost:3000/');
    this.socket.on('send:message:server', (data) => {
      this.updateMessages(data.message);
    })
  }

  sendMessage(){
    var msgText = this.msgForm.value['msgField'];

    let fromUserId = this.activeUser._id;
    let toUserId = this.activeChatHub._id;
    let content = msgText;
    let dateSent = new Date();
    let dateRecieved = new Date();
    let dateReaded = new Date();

    var message = new Message(fromUserId, toUserId, content, dateSent, dateRecieved, dateReaded);
    this.socket.emit('send:message:client', message);

    this.updateMessages(message);
  }

  updateMessages(message: any){
    if(!this.activeChatHub.messages){
      this.activeChatHub.messages = [];
    }

    if(message.toUserId === this.activeUser._id && message.fromUserId === this.activeChatHub._id){
      message.isSent = false;
      this.activeChatHub.messages.push(message);
    }
    else if(message.fromUserId === this.activeUser._id)
    {
      message.isSent = true;
      this.activeChatHub.messages.push(message);
    }
  }
}
