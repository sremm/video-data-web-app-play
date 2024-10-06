import logo from './logo.svg';
import './App.css';
import React, {useRef} from 'react';
import VideoComponent from './components/video';
import PlotComponent from './components/graph';
import Plotly from 'plotly.js-dist-min';


function App() {

  const [curVideoTimes, setCurVideoTimes] = React.useState([0, 0]);


  const videoRefs = [useRef(null), useRef(null)];
  const plotRef = useRef(null);

  const startVideo = () => {
    videoRefs.forEach(ref => ref.current.play());
  };

  const stopVideo = () => {
    videoRefs.forEach(ref => ref.current.pause());
  };

  const toggleVideo = () => {
    videoRefs.forEach(ref => {
      if (ref.current.paused) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    });
  };

  const updateVideoTimesAndPlot = () => {
    const times = videoRefs.map(ref => ref.current.currentTime);
    const firstVideoTime = times[0];
    setCurVideoTimes(times);
    updateVerticalLine(firstVideoTime);

  };

  function updateVerticalLine(currentTime) {
    const plotDiv = plotRef.current;
    Plotly.relayout(plotDiv, {
        'shapes[0].x0': currentTime,
        'shapes[0].x1': currentTime
    });
}

  React.useEffect(() => {
    let animationFrameId;

    const update = () => {
      updateVideoTimesAndPlot();
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <VideoComponent ref={videoRefs[0]} src="https://www.w3schools.com/html/mov_bbb.mp4" width="400" height="220" />
        <VideoComponent ref={videoRefs[1]} src="https://www.w3schools.com/html/mov_bbb.mp4" width="400" height="220" />
        <div className="controls">
          <button onClick={startVideo}>Start</button>
          <button onClick={stopVideo}>Stop</button>
          <button onClick={toggleVideo}>Toggle</button>
        </div>
        <div>
          <p>Current Time of Video 1: {curVideoTimes[0].toFixed(2)}</p>
          <p>Current Time of Video 2: {curVideoTimes[1].toFixed(2)}</p>
        </div>
        <PlotComponent ref={plotRef} />
      </header>
    </div>
  );
}

export default App;
