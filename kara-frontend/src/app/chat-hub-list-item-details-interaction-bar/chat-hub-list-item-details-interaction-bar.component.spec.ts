import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListItemDetailsInteractionBarComponent } from './chat-hub-list-item-details-interaction-bar.component';

describe('ChatHubListItemDetailsInteractionBarComponent', () => {
  let component: ChatHubListItemDetailsInteractionBarComponent;
  let fixture: ComponentFixture<ChatHubListItemDetailsInteractionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListItemDetailsInteractionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListItemDetailsInteractionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
