import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateExamsComponent } from './create-update-exams.component';

describe('CreateUpdateExamsComponent', () => {
  let component: CreateUpdateExamsComponent;
  let fixture: ComponentFixture<CreateUpdateExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
