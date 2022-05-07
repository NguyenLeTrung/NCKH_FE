import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailListExamPointComponent } from './detail-list-exam-point.component';

describe('DetailListExamPointComponent', () => {
  let component: DetailListExamPointComponent;
  let fixture: ComponentFixture<DetailListExamPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailListExamPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailListExamPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
