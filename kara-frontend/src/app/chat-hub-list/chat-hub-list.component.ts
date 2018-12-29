import { Component, OnInit, Input, Output } from "@angular/core";
import * as io from "socket.io-client";
import { User } from "../models/user";
import { EventEmitter } from "@angular/core";
import { ChatHub } from "../models/chat-hub";
import { Message } from "../models/message";

@Component({
  selector: "app-chat-hub-list",
  templateUrl: "./chat-hub-list.component.html",
  styleUrls: ["./chat-hub-list.component.css"]
})
export class ChatHubListComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() activeUser: User;
  @Output() chatHubChanged: EventEmitter<ChatHub>;

  constructor() {
    this.chatHubChanged = new EventEmitter();
  }

  ngOnInit() {
    this.getChatHubsAndMessages();
    this.listenToServerEvents();
  }

  getChatHubsAndMessages() {
    const userId = this.activeUser.id;

    // Emit the event to socket to fetch all the chat hubs of the current user
    this.socket.emit("fetch:users::client", { userId: userId });

    // Event Response to fetch:user:client from server
    this.socket.on("fetch:users::server", data => {
      //TODO: Map users or groups to 'ChatHub'
      let hubList = data.users;
      hubList.forEach(hub => {
        this.activeUser.hubList.push(ChatHub.from(hub));
      });

      // Emit the event to socket to fetch all the messages of the current user
      this.socket.emit("fetch:messages::client", { userId: userId });
    });

    // Event Response to fetch:messages:client from server
    this.socket.on("fetch:messages::server", data => {
      this.activeUser.hubList.forEach(hub => {
        data.messages.forEach(messsage => {
          this.updateHubsWithMessages(hub, Message.from(messsage));
        });
      });
    });
  }

  listenToServerEvents() {
    this.listenToConnectEvents();
    this.listenToTypingEvents();
  }

  listenToConnectEvents() {
    this.socket.on("update:user:socketId::server", data => {
      let userId = data.userId;
      let socketId = data.socketId;

      this.activeUser.hubList.forEach(hub => {
        if (hub.id === userId) {
          hub.socketId = socketId;
        }
      });
    });
  }

  listenToTypingEvents() {
    this.socket.on("message:typing:start::server", data => {
      // userId: id of user who is typing
      let userId = data.userId;
      this.activeUser.hubList.forEach(hub => {
        if (hub.id === userId) {
          hub.isTypingMessage = true;
        }
      });
    });

    this.socket.on("message:typing:stop::server", data => {
      // userId: id of user who is stopped typing
      let userId = data.userId;
      this.activeUser.hubList.forEach(hub => {
        if (hub.id === userId) {
          hub.isTypingMessage = false;
        }
      });
    });
  }

  updateHubsWithMessages(hub: ChatHub, message: Message) {
    const userId = this.activeUser.id;
    const hubId = hub.id;

    if (message.toUserId === userId && message.fromUserId === hubId) {
      //TODO: Add daterecieved to message
      if (!message.dateRecieved) {
        this.socket.emit('ack:message:recieved::client', { message: message, socketId: this.activeUser.socketId })
      }

      if (!message.dateReaded) {
        hub.unreadMessageCount++;
      }

      hub.messages.push(message);
    } else if (message.fromUserId === userId && message.toUserId == hubId) {
      hub.messages.push(message);
    }
  }

  onChatHubChanged($event: any, hub: ChatHub) {
    $(".list-messages")
      .children()
      .each(function () {
        $(this).removeClass("list-item-active");
      });

    $(event.currentTarget).addClass("list-item-active");

    this.chatHubChanged.emit(hub);
  }
}
