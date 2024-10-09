<template>
    <div class="video-graph">
        <h1>Video Graph</h1>
        <!-- Add your template code here -->
        <video width="320" height="240" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <video width="320" height="240" controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>

        <div class="controls">
            <button @click="playVideos">Play</button>
            <button @click="pauseVideos">Pause</button>
            <button @click="toggleVideos">Play/pause</button>
        </div>

        <div class="video-time">
            <p>Video 1 Time: {{ videoTimes[0] }}</p>
            <p>Video 2 Time: {{ videoTimes[1] }}</p>
        </div>

        <div class="graph" ref="graph">
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Plotly from 'plotly.js';


// Define your reactive state
const videos = ref([]);
const videoTimes = ref([]);
const graphDiv = ref(null); // TODO fix reference to graph div


// Function to play all videos
const playVideos = () => {
    videos.value.forEach(video => video.play());
};

// Function to stop all videos
const pauseVideos = () => {
    videos.value.forEach(video => {
        video.pause();
    });
};

// Function to toggle play/pause for all videos
const toggleVideos = () => {
    videos.value.forEach(video => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
};

const initiateChart = () => {
    const data = [
        {
            x: Array.from({ length: 300 }, (_, i) => i / 30), // 10 seconds at 30 fps
            y: Array.from({ length: 300 }, (_, i) => Math.sin(i / 30)), // Example data
            type: 'scatter',
        },
    ];

    const layout = {
        title: 'Simple Graph',
    };

    const verticalLine = {
        type: 'line',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 1,
        yref: 'paper',
        line: {
            color: 'red',
            width: 2,
            dash: 'dashdot',
        },
    };

    layout.shapes = [verticalLine];

    Plotly.newPlot(graphDiv.value, data, layout);
};

const updateVerticalLine = (time) => {
    Plotly.relayout(graphDiv.value, {
        'shapes[0].x0': time,
        'shapes[0].x1': time,
    });
};

const updateVideoTimes = () => {
    videos.value.forEach((video, idx) => {
        if (video) {
            videoTimes.value[idx] = video.currentTime.toFixed(2); // Trigger reactivity
        }
    });
    const firstVideoTime = videoTimes.value[0];
    updateVerticalLine(firstVideoTime);
    requestAnimationFrame(updateVideoTimes);
};


// On component mount, get all video elements and start updating times
onMounted(() => {
    videos.value = Array.from(document.querySelectorAll('video'));
    videoTimes.value = videos.value.map(() => 0);
    graphDiv.value = document.querySelector('.graph');
    initiateChart();
    requestAnimationFrame(updateVideoTimes);
});

onUnmounted(() => {
    cancelAnimationFrame(updateVideoTimes);
});

</script>

<style scoped>
.video-graph {
    /* Add your styles here */
}
</style>