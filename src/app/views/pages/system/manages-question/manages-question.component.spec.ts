import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesQuestionComponent } from './manages-question.component';

describe('ManagesQuestionComponent', () => {
  let component: ManagesQuestionComponent;
  let fixture: ComponentFixture<ManagesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
