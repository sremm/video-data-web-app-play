import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGraphComponent } from './video-graph.component';

describe('VideoGraphComponent', () => {
  let component: VideoGraphComponent;
  let fixture: ComponentFixture<VideoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
