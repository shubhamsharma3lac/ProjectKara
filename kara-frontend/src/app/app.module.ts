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
import { ChatHubListItemComponent } from './chat-hub-list-item/chat-hub-list-item.component';
import { ChatHubListComponent } from './chat-hub-list/chat-hub-list.component';
import { ChatHubListItemDetailsComponent } from './chat-hub-list-item-details/chat-hub-list-item-details.component';
import { ChatHubListItemDetailsMessageListComponent } from './chat-hub-list-item-details-message-list/chat-hub-list-item-details-message-list.component';
import { ChatHubListItemDetailsMessageListItemComponent } from './chat-hub-list-item-details-message-list-item/chat-hub-list-item-details-message-list-item.component';
import { ChatHubListItemDetailsHeaderBarComponent } from './chat-hub-list-item-details-header-bar/chat-hub-list-item-details-header-bar.component';
import { ChatHubListItemDetailsInteractionBarComponent } from './chat-hub-list-item-details-interaction-bar/chat-hub-list-item-details-interaction-bar.component';

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
    ChatHubListItemComponent,
    ChatHubListComponent,
    ChatHubListItemDetailsComponent,
    ChatHubListItemDetailsMessageListComponent,
    ChatHubListItemDetailsMessageListItemComponent,
    ChatHubListItemDetailsHeaderBarComponent,
    ChatHubListItemDetailsInteractionBarComponent
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
