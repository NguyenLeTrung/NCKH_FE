import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesSubjectComponent } from './manages-subject.component';

describe('ManagesSubjectComponent', () => {
  let component: ManagesSubjectComponent;
  let fixture: ComponentFixture<ManagesSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
