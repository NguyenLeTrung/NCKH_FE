import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionManagesStudentComponent } from './action-manages-student.component';

describe('ActionManagesStudentComponent', () => {
  let component: ActionManagesStudentComponent;
  let fixture: ComponentFixture<ActionManagesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionManagesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionManagesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
