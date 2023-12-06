import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPizzaFormComponent } from './new-pizza-form.component';
import { IPizzaRequest } from '../../../model/pizza-interface';
import { PizzaService } from '../../../services/pizza.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewPizzaFormComponent', () => {
  let component: NewPizzaFormComponent;
  let fixture: ComponentFixture<NewPizzaFormComponent>;
  let pizzaService: jasmine.SpyObj<PizzaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PizzaService', ['createPizzas']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NewPizzaFormComponent,
      ],
      providers: [{ provide: PizzaService, useValue: spy }],
    }).compileComponents();

    pizzaService = TestBed.inject(PizzaService) as jasmine.SpyObj<PizzaService>;
    fixture = TestBed.createComponent(NewPizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new pizza on addPizza()', () => {
    const initialPizzaCount = component.formPizzas.length;

    component.addPizza();

    expect(component.formPizzas.length).toBe(initialPizzaCount + 1);
  });

  it('should call createPizzas and emit loadPizzas on savePizzas()', () => {
    const pizzas: IPizzaRequest[] = [
      {
        name: 'Pizza 1',
        price: 10.99,
        description: 'Delicious pizza',
        imageUrl: 'http://example.com/pizza.jpg',
      },
    ];
    component.formPizzas.setValue(pizzas);
    pizzaService.createPizzas.and.returnValue(of([]));
    spyOn(component.loadPizzas, 'emit');

    component.savePizzas();

    expect(pizzaService.createPizzas).toHaveBeenCalledWith(pizzas);
    expect(component.loadPizzas.emit).toHaveBeenCalled();
  });
});
