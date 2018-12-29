import { Component, OnInit, Input } from "@angular/core";
import { Message } from "../models/message";
import { FormGroup, FormControl } from "@angular/forms";
import { User } from "../models/user";
import { ChatHub } from "../models/chat-hub";

@Component({
  selector: "app-chat-hub-list-item-details-interaction-bar",
  templateUrl: "./chat-hub-list-item-details-interaction-bar.component.html",
  styleUrls: ["./chat-hub-list-item-details-interaction-bar.component.css"]
})
export class ChatHubListItemDetailsInteractionBarComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Input() activeChatHub: ChatHub;

  public formGroup: FormGroup;
  constructor() {
    let messageControl = new FormControl("");
    this.formGroup = new FormGroup({ messageField: messageControl });
  }

  ngOnInit() {}

  messageTypingStart($event: any) {
    let userId = this.activeUser.id;
    let socketId = this.activeChatHub.socketId;

    setTimeout(() => {
      this.socket.emit("message:typing:start::client", {
        socketId: socketId,
        userId: userId
      });
    }, 500);
  }

  messageTypingStop($event: any) {
    let userId = this.activeUser.id;
    let socketId = this.activeChatHub.socketId;

    setTimeout(() => {
      this.socket.emit("message:typing:stop::client", {
        socketId: socketId,
        userId: userId
      });
    }, 4000);
  }

  sendMessage() {
    let content = this.formGroup.value["messageField"];

    let message = new Message();
    message.fromUserId = this.activeUser.id;
    message.toUserId = this.activeChatHub.id;
    message.content = content;
    message.dateSent = new Date();

    this.socket.emit("send:message::client", {
      message: message,
      socketId: this.activeChatHub.socketId
    });

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
    } else if (message.fromUserId === userId && message.toUserId == hubId) {
      hub.messages.push(message);
    }
  }
}
