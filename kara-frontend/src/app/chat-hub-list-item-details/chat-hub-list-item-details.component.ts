import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Message } from "../models/message";
import { ChatHub } from "../models/chat-hub";
import { User } from "../models/user";

@Component({
  selector: "app-chat-hub-list-item-details",
  templateUrl: "./chat-hub-list-item-details.component.html",
  styleUrls: ["./chat-hub-list-item-details.component.css"]
})
export class ChatHubListItemDetailsComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Input() activeChatHub: ChatHub;

  constructor() {
  }

  ngOnInit() {
    this.listenToServerEvents();
  }

  listenToServerEvents() {
    this.socket.on("send:message::server", data => {
      this.activeUser.hubList.forEach(hub => {
        this.updateHubsWithMessages(hub, Message.from(data.message));
      });
    });
  }

  // Link messages to their respective hubs
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
