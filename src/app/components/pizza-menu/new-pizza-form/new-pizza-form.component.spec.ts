import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPizzaFormComponent } from './new-pizza-form.component';

describe('NewPizzaFormComponent', () => {
  let component: NewPizzaFormComponent;
  let fixture: ComponentFixture<NewPizzaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPizzaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
