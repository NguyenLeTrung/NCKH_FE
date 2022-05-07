import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSubjectComponent } from './create-update-subject.component';

describe('CreateUpdateSubjectComponent', () => {
  let component: CreateUpdateSubjectComponent;
  let fixture: ComponentFixture<CreateUpdateSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
