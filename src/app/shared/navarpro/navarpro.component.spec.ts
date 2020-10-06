import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavarproComponent } from './navarpro.component';

describe('NavarproComponent', () => {
  let component: NavarproComponent;
  let fixture: ComponentFixture<NavarproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavarproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavarproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
