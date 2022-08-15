import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPostComponent } from './author-post.component';

describe('AuthorPostComponent', () => {
  let component: AuthorPostComponent;
  let fixture: ComponentFixture<AuthorPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
