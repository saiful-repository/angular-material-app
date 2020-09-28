import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratiionComponent } from './registratiion.component';

describe('RegistratiionComponent', () => {
  let component: RegistratiionComponent;
  let fixture: ComponentFixture<RegistratiionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistratiionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratiionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
