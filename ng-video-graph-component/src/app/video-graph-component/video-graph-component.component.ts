import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;


@Component({
  selector: 'app-video-graph',
  templateUrl: './video-graph-component.component.html',
  styleUrls: ['./video-graph-component.component.scss'],
  imports: [CommonModule, PlotlyModule],
  standalone: true
})
export class VideoGraphComponent implements AfterViewInit, OnInit{

  video1Time: number = 0;
  video2Time: number = 0;
  plotDiv: any;
  private video1: any;
  private video2: any;

  async ngOnInit() {

      this.plotDiv = document.getElementById('plot');
      this.video1 = document.getElementById('video1') as HTMLVideoElement;
      this.video2 = document.getElementById('video2') as HTMLVideoElement;
      this.initializePlot();
      requestAnimationFrame(this.updateVideoTimes.bind(this));
      
  }

  async ngAfterViewInit() {
    // this.initializePlot();
    // requestAnimationFrame(this.updateVideoTimes.bind(this));
  }

  startVideo() {
    this.video1.play();
    this.video2.play();
  }

  stopVideo() {
    this.video1.pause();
    this.video2.pause();
  }

  toggleVideo() {
    if (this.video1.paused) {
      this.video1.play();
    } else {
      this.video1.pause();
    }

    if (this.video2.paused) {
      this.video2.play();
    } else {
      this.video2.pause();
    }
  }

  updateVideoTimes() {
    this.video1Time = this.video1.currentTime;
    this.video2Time = this.video2.currentTime;
    this.updateVerticalLine(this.video1.currentTime);
    requestAnimationFrame(this.updateVideoTimes.bind(this));
  }

  updateVerticalLine(currentTime: number) {
    const update = {
      'shapes[0].x0': currentTime,
      'shapes[0].x1': currentTime
    } as unknown as Plotly.Layout;
    PlotlyModule.plotlyjs.relayout(this.plotDiv, update);
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
      }] as Plotly.Layout['shapes'],
    } ;
    PlotlyJS.newPlot(this.plotDiv, data, layout);
  }
}