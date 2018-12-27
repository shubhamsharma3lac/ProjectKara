import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import * as $ from 'jquery';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { ChatHubListItemComponent } from './chat-hub-list-item/chat-hub-list-item.component';
import { ChatHubListComponent } from './chat-hub-list/chat-hub-list.component';

const routes: Route[] = 
[
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'register',
    component: SignupPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupPageComponent,
    LoginPageComponent,
    MessageListComponent,
    MessageDetailsComponent,
    MessageItemComponent,
    ChatHubListItemComponent,
    ChatHubListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
