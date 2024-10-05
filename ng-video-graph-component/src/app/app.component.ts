import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoGraphComponent } from './video-graph-component/video-graph-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VideoGraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'no-ssr';
}
