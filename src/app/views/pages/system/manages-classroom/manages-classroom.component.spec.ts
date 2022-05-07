import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesClassroomComponent } from './manages-classroom.component';

describe('ManagesClassroomComponent', () => {
  let component: ManagesClassroomComponent;
  let fixture: ComponentFixture<ManagesClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
