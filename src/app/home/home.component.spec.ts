import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home.component';
import { ProjectService } from '../project.service';

import { provideRouter } from '@angular/router';

describe('HomeComponent', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [ProjectService, provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate years of experience', () => {
    const years = component.yearsOfExperience();
    expect(years).toBeGreaterThanOrEqual(1); // Assuming 2022-06-01 is long enough
  });

  it('should display the correct name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-name')?.textContent).toContain('PABLO ZURITA');
  });

  it('should have dynamic project count', () => {
    expect(component.projectCount()).toBeGreaterThan(0);
  });
});
