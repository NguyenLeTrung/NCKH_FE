import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagentUserComponent } from './managent-user.component';

describe('ManagentUserComponent', () => {
  let component: ManagentUserComponent;
  let fixture: ComponentFixture<ManagentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
