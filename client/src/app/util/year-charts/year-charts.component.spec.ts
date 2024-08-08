import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearChartsComponent } from './year-charts.component';

describe('YearChartsComponent', () => {
  let component: YearChartsComponent;
  let fixture: ComponentFixture<YearChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
