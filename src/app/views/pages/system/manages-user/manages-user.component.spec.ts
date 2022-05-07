import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesUserComponent } from './manages-user.component';

describe('ManagesUserComponent', () => {
  let component: ManagesUserComponent;
  let fixture: ComponentFixture<ManagesUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
