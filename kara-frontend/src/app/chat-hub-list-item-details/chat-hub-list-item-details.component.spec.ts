import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListItemDetailsComponent } from './chat-hub-list-item-details.component';

describe('ChatHubListItemDetailsComponent', () => {
  let component: ChatHubListItemDetailsComponent;
  let fixture: ComponentFixture<ChatHubListItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
