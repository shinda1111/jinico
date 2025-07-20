"use client";
import { SetStateAction, useEffect, useRef, useState } from 'react';
import {render_video} from './gl_module/gl_module';
import ReplayButton from './replay_button';
import TimeSlider from './time_slider';
import PlayCanvas from './play_canvas';
import {SdfPlayerProps} from './sdf_player_props';
import TimeDisplay from './time_display';

export default function VideoPlayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [pause, setPause] = useState<boolean>(false);
  const [upscaling, setUpscaling] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.0);
  const [startTime, setStartTime] = useState<number>(0.0);
  const [endTime, setEndTime] = useState<number>(duration);
  
  const handlePause=(pause:boolean)=>
  {
    if (videoRef.current) 
    {
      if(!pause)
      {
        videoRef.current.play();
      }
      else
      {
        videoRef.current.pause();
      }
      setPause(pause);
    }
  }

  const handleSeek = (currentTime:number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
      setCurrentTime(currentTime);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    updateTime();
    updateDuration();
    setCurrentTime(video.currentTime);
    setEndTime(video.duration);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);
  const childProps:SdfPlayerProps=
  {
    videoRef,
    currentTime,
    startTime: 0,
    endTime: duration,
    pause,
    handlePause,
    duration,
    setDuration,
    upscaling,
    setUpscaling,
    volume,
    setVolume,
    width: 960,
    height: 540,
    handleSeek,
  }
  return (
    <div className="relative w-[960px] h-[520px]">
      <video
        ref={videoRef}
        width={640}
        height={360}
        autoPlay
        loop
        muted
        playsInline
        src="/videos/output_640x360.webm"
        className="hidden"
      />
      {
        <PlayCanvas  {...childProps}></PlayCanvas>
      }
      
      {/* UI Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 pointer-events-auto">
        <TimeSlider  {...childProps}></TimeSlider>
        <div className="flex justify-start gap-4">
            <ReplayButton {...childProps}></ReplayButton>
            <TimeDisplay {...childProps}></TimeDisplay>
        </div>
      </div>
    </div>
  );
}