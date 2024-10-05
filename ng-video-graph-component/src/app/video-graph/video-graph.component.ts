import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';

if (typeof self === 'undefined') {
  (global as any).self = global;
}
import * as Plotly from 'plotly.js-dist-min';
PlotlyModule.plotlyjs = Plotly;

@Component({
  selector: 'app-video-graph',
  templateUrl: './video-graph.component.html',
  styleUrls: ['./video-graph.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class VideoGraphComponent implements AfterViewInit {
  @ViewChild('video1') video1!: ElementRef<HTMLVideoElement>;
  @ViewChild('video2') video2!: ElementRef<HTMLVideoElement>;

  video1Time: number = 0;
  video2Time: number = 0;
  plotDiv: any;

  ngAfterViewInit() {
    this.plotDiv = document.getElementById('plot');
    this.initializePlot();
    requestAnimationFrame(this.updateVideoTimes.bind(this));
  }

  startVideo() {
    this.video1.nativeElement.play();
    this.video2.nativeElement.play();
  }

  stopVideo() {
    this.video1.nativeElement.pause();
    this.video2.nativeElement.pause();
  }

  toggleVideo() {
    if (this.video1.nativeElement.paused) {
      this.video1.nativeElement.play();
    } else {
      this.video1.nativeElement.pause();
    }

    if (this.video2.nativeElement.paused) {
      this.video2.nativeElement.play();
    } else {
      this.video2.nativeElement.pause();
    }
  }

  updateVideoTimes() {
    this.video1Time = this.video1.nativeElement.currentTime;
    this.video2Time = this.video2.nativeElement.currentTime;
    this.updateVerticalLine(this.video1.nativeElement.currentTime);
    requestAnimationFrame(this.updateVideoTimes.bind(this));
  }

  updateVerticalLine(currentTime: number) {
    const update = {
      'shapes[0].x0': currentTime,
      'shapes[0].x1': currentTime
    } as unknown as Plotly.Layout;
    Plotly.relayout(this.plotDiv, update);
  }

  initializePlot() {
    const trace = {
      x: Array.from({ length: 301 }, (_, i) => i / 30),
      y: Array.from({ length: 301 }, (_, i) => Math.sin(i / 30 * 2 * Math.PI)),
      mode: 'lines',
      name: 'Head Position'
    };
    const data = [trace];
    const layout = {
      title: 'Head Position Over Time',
      xaxis: { title: 'Time (s)' },
      yaxis: { title: 'Position' },
      shapes: [{
        type: 'line',
        x0: 0,
        x1: 0,
        y0: -1,
        y1: 1,
        line: {
          color: 'red',
          width: 2
        }
      }] as Plotly.Shape[],
    } as Plotly.Layout;
    Plotly.newPlot(this.plotDiv, data, layout);
  }
}