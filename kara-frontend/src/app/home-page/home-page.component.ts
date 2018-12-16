import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { User } from '../models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public user: any;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user.friendList = [];
    // get chats
    for(let i = 0; i < 10; i++){
      var user = new User();
      user.name = "Chloe Sullivan";
      this.user.friendList.push(user);
    }
  }

  ngOnInit() {
  }

}
