import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsBrowseComponent } from './menu-items-browse.component';

describe('MenuItemsBrowseComponent', () => {
  let component: MenuItemsBrowseComponent;
  let fixture: ComponentFixture<MenuItemsBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemsBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
