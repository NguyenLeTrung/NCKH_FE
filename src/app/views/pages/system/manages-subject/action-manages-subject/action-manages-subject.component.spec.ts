import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionManagesSubjectComponent } from './action-manages-subject.component';

describe('ActionManagesSubjectComponent', () => {
  let component: ActionManagesSubjectComponent;
  let fixture: ComponentFixture<ActionManagesSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionManagesSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionManagesSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
