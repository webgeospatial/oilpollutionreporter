import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedlocationComponent } from './selectedlocation.component';

describe('SelectedlocationComponent', () => {
  let component: SelectedlocationComponent;
  let fixture: ComponentFixture<SelectedlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
