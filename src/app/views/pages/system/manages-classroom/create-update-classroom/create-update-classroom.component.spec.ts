import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClassroomComponent } from './create-update-classroom.component';

describe('CreateUpdateClassroomComponent', () => {
  let component: CreateUpdateClassroomComponent;
  let fixture: ComponentFixture<CreateUpdateClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
