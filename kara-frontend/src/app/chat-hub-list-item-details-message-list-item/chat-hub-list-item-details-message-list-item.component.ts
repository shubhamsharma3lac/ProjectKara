import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { Message } from '../models/message';
import { ChatHub } from '../models/chat-hub';
import { User } from '../models/user';

@Component({
  selector: "app-chat-hub-list-item-details-message-list-item",
  templateUrl: "./chat-hub-list-item-details-message-list-item.component.html",
  styleUrls: ["./chat-hub-list-item-details-message-list-item.component.css"]
})
export class ChatHubListItemDetailsMessageListItemComponent implements OnInit {
  @Input() socket: SocketIOClient.Socket;
  @Input() message: Message;
  @Input() activeUser: User;
  @Input() activeChatHub: ChatHub;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.messagesScroll();
  }

  messagesScroll() {
    let container = $(this.element.nativeElement)
      .parent()
      .parent()
      .parent();

      container.scroll(() => {
        if(this.checkInView(this.element.nativeElement)){
          if(!this.message.dateReaded && this.activeChatHub.unreadMessageCount > 0){
            //TODO: mark messages as readed
            this.message.dateReaded = new Date();
            this.activeChatHub.unreadMessageCount--;

            this.socket.emit('ack:message:readed::client', { message: this.message });
          }
        }
      })
  }

  //Copyright Shubham Sharma
  checkInView(elem: ElementRef) {
    let container = $(elem)
      .parent()
      .parent()
      .parent();
    let contHeight = container.height();
    let contOffsetTop = container.offset().top;
    let contOffsetBottom = contHeight + container.offset().top;

    let elemHeight = $(elem).height();
    let elementOffsetTop = $(elem).offset().top;
    let elementOffsetBottom = elemHeight + elementOffsetTop;

    if (
      elementOffsetBottom <= contOffsetTop ||
      elementOffsetTop >= contOffsetBottom
    ) {
      return false;
    }

    return true;
  }
}
