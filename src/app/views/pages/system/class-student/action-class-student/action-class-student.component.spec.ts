import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionClassStudentComponent } from './action-class-student.component';

describe('ActionClassStudentComponent', () => {
  let component: ActionClassStudentComponent;
  let fixture: ComponentFixture<ActionClassStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionClassStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionClassStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
