import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoGraphComponent } from './video-graph/video-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoGraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-video-graph-component';
}
