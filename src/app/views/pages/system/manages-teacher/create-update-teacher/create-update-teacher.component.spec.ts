import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTeacherComponent } from './create-update-teacher.component';

describe('CreateUpdateTeacherComponent', () => {
  let component: CreateUpdateTeacherComponent;
  let fixture: ComponentFixture<CreateUpdateTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
