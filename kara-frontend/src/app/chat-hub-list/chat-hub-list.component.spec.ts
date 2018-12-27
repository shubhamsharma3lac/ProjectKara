import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListComponent } from './chat-hub-list.component';

describe('ChatHubListComponent', () => {
  let component: ChatHubListComponent;
  let fixture: ComponentFixture<ChatHubListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
