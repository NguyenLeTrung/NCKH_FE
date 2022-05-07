import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionManagesQuestionComponent } from './action-manages-question.component';

describe('ActionManagesQuestionComponent', () => {
  let component: ActionManagesQuestionComponent;
  let fixture: ComponentFixture<ActionManagesQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionManagesQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionManagesQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
