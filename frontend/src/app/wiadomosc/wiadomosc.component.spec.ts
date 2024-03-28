import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiadomoscComponent } from './wiadomosc.component';

describe('WiadomoscComponent', () => {
  let component: WiadomoscComponent;
  let fixture: ComponentFixture<WiadomoscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiadomoscComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WiadomoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
