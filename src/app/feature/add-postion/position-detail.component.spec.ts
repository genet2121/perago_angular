import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostionDetailComponent } from './position-detail.component';

describe('AddPostionComponent', () => {
  let component: PostionDetailComponent;
  let fixture: ComponentFixture<PostionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
