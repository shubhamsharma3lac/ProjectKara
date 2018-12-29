import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHubListItemDetailsHeaderBarComponent } from './chat-hub-list-item-details-header-bar.component';

describe('ChatHubListItemDetailsHeaderBarComponent', () => {
  let component: ChatHubListItemDetailsHeaderBarComponent;
  let fixture: ComponentFixture<ChatHubListItemDetailsHeaderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHubListItemDetailsHeaderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHubListItemDetailsHeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
