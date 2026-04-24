import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoContato } from './novo-contato';

describe('NovoContato', () => {
  let component: NovoContato;
  let fixture: ComponentFixture<NovoContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
