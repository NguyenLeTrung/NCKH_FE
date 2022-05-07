import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesTeacherComponent } from './manages-teacher.component';

describe('ManagesTeacherComponent', () => {
  let component: ManagesTeacherComponent;
  let fixture: ComponentFixture<ManagesTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
