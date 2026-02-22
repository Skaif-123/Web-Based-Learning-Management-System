import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

function VideoPlayer({
  width = "100%",
  height = "100%",
  url,
  onProgressUpdate,
  progressData,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0); // 0 → 1
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  /* ---------------- PLAY / PAUSE ---------------- */

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) video.play();
    else video.pause();
  }, [playing]);

  /* ---------------- TIME UPDATE ---------------- */

  const handleTimeUpdate = () => {
    if (!videoRef.current || seeking) return;

    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;

    setPlayed(dur ? current / dur : 0);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  /* ---------------- SEEK ---------------- */

  const handleSeekChange = (value) => {
    setSeeking(true);
    setPlayed(value[0] / 100);
  };

  const handleSeekCommit = () => {
    if (!videoRef.current) return;

    const newTime = played * duration;
    videoRef.current.currentTime = newTime;
    setSeeking(false);
  };

  /* ---------------- VOLUME ---------------- */

  const handleVolumeChange = (value) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  /* ---------------- REWIND / FORWARD ---------------- */

  const rewind = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 5;
  };

  const forward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 5;
  };

  /* ---------------- FULLSCREEN ---------------- */

  const toggleFullScreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  /* ---------------- AUTO HIDE CONTROLS ---------------- */

  const handleMouseMove = () => {
    setShowControls(true);

    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => clearTimeout(controlsTimeoutRef.current);
  }, []);

  /* ---------------- COMPLETE CALLBACK ---------------- */

  useEffect(() => {
    if (played >= 1 && onProgressUpdate) {
      onProgressUpdate({
        ...progressData,
        progressValue: 1,
      });
    }
  }, [played, onProgressUpdate, progressData]);

  /* ---------------- FORMAT TIME ---------------- */

  const pad = (num) => String(num).padStart(2, "0");

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) return `${hrs}:${pad(mins)}:${pad(secs)}`;
    return `${mins}:${pad(secs)}`;
  };

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl ${
        isFullScreen ? "w-screen h-screen" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={url}
        className="absolute top-0 left-0 w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
          <Slider
            value={[played * 100]}
            max={100}
            step={0.1}
            onValueChange={handleSeekChange}
            onValueCommit={handleSeekCommit}
            className="w-full mb-4"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={togglePlay}>
                {playing ? <Pause /> : <Play />}
              </Button>

              <Button variant="ghost" size="icon" onClick={rewind}>
                <RotateCcw />
              </Button>

              <Button variant="ghost" size="icon" onClick={forward}>
                <RotateCw />
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {muted ? <VolumeX /> : <Volume2 />}
              </Button>

              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>

            <div className="flex items-center space-x-2 text-white">
              {formatTime(played * duration)} / {formatTime(duration)}

              <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                {isFullScreen ? <Minimize /> : <Maximize />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;