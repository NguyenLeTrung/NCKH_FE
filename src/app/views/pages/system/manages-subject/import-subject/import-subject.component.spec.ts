import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSubjectComponent } from './import-subject.component';

describe('ImportSubjectComponent', () => {
  let component: ImportSubjectComponent;
  let fixture: ComponentFixture<ImportSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
