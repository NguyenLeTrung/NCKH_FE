import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportClassroomStudentComponent } from './import-classroom-student.component';

describe('ImportClassroomStudentComponent', () => {
  let component: ImportClassroomStudentComponent;
  let fixture: ComponentFixture<ImportClassroomStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportClassroomStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportClassroomStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
