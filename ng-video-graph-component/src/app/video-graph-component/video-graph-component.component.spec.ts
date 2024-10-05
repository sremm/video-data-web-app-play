import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGraphComponentComponent } from './video-graph-component.component';

describe('VideoGraphComponentComponent', () => {
  let component: VideoGraphComponentComponent;
  let fixture: ComponentFixture<VideoGraphComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGraphComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGraphComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
