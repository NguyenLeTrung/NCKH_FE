import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesExamComponent } from './manages-exam.component';

describe('ManagesExamComponent', () => {
  let component: ManagesExamComponent;
  let fixture: ComponentFixture<ManagesExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
