import React, { useEffect, forwardRef } from 'react';
import Plotly from 'plotly.js-dist-min';

const PlotComponent = forwardRef (({},ref) => {
        useEffect(() => {
            const plotDiv = document.getElementById('plot');
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
                }]
            };
            Plotly.newPlot(plotDiv, data, layout);
            }, 
        []);

        return <div ref={ref} id="plot"></div>;
    }
);
export default PlotComponent;