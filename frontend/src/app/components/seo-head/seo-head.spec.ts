import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoHeadComponent } from './seo-head';

describe('SeoHeadComponent', () => {
  let component: SeoHeadComponent;
  let fixture: ComponentFixture<SeoHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeoHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
