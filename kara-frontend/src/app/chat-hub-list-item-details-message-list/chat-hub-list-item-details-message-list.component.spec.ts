import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListItemDetailsMessageListComponent } from './chat-hub-list-item-details-message-list.component';

describe('ChatHubListItemDetailsMessageListComponent', () => {
  let component: ChatHubListItemDetailsMessageListComponent;
  let fixture: ComponentFixture<ChatHubListItemDetailsMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListItemDetailsMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListItemDetailsMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
