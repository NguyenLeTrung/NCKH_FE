import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesStudentComponent } from './manages-student.component';

describe('ManagesStudentComponent', () => {
  let component: ManagesStudentComponent;
  let fixture: ComponentFixture<ManagesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
