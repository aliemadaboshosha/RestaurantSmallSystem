import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeMenuComponent } from './edite-menu.component';

describe('EditeMenuComponent', () => {
  let component: EditeMenuComponent;
  let fixture: ComponentFixture<EditeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
