import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionManagesClassroomComponent } from './action-manages-classroom.component';

describe('ActionManagesClassroomComponent', () => {
  let component: ActionManagesClassroomComponent;
  let fixture: ComponentFixture<ActionManagesClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionManagesClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionManagesClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
