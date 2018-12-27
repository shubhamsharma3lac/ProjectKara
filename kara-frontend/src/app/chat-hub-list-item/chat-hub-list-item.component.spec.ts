import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListItemComponent } from './chat-hub-list-item.component';

describe('ChatHubListItemComponent', () => {
  let component: ChatHubListItemComponent;
  let fixture: ComponentFixture<ChatHubListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
