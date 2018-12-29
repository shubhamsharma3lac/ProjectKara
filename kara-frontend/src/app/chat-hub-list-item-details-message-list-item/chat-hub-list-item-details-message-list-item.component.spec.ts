import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListItemDetailsMessageListItemComponent } from './chat-hub-list-item-details-message-list-item.component';

describe('ChatHubListItemDetailsMessageListItemComponent', () => {
  let component: ChatHubListItemDetailsMessageListItemComponent;
  let fixture: ComponentFixture<ChatHubListItemDetailsMessageListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListItemDetailsMessageListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListItemDetailsMessageListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
