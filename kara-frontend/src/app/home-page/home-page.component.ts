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
  public activeChatUser: any;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  switchMessage(user: any){
    this.activeChatUser = user;
  }

}
