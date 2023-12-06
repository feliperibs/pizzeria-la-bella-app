import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewUserFormComponent } from './new-user-form.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewUserFormComponent', () => {
  let component: NewUserFormComponent;
  let fixture: ComponentFixture<NewUserFormComponent>;
  let pizzaService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['createUser']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NewUserFormComponent,
      ],
      providers: [{ provide: UserService, useValue: spy }],
    }).compileComponents();

    pizzaService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(NewUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
