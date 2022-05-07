import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportClassroomComponent } from './import-classroom.component';

describe('ImportClassroomComponent', () => {
  let component: ImportClassroomComponent;
  let fixture: ComponentFixture<ImportClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
