import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostionComponent } from './add-postion.component';

describe('AddPostionComponent', () => {
  let component: AddPostionComponent;
  let fixture: ComponentFixture<AddPostionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
