import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeArticleComponent } from './change-article.component';

describe('ChangeArticleComponent', () => {
  let component: ChangeArticleComponent;
  let fixture: ComponentFixture<ChangeArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
