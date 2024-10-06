import React, { useRef, forwardRef } from "react";

const VideoComponent = forwardRef(({ src, width, height }, ref) => {
    return (
        <video ref={ref} width={width} height={height} controls>
            <source src={src} type="video/mp4" />
        </video>
    );
});

export default VideoComponent;
