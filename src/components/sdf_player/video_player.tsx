"use client";
import { useEffect, useRef, useState } from 'react';
import {render_video} from './gl_module/gl_module';
import ReplayButton from './replay_button';
import { SdfPlayerProps } from './sdf_player_props';
import UpscalingButton from './upscaling_button';
import TimeSlider from './time_slider';
import PlayCanvas from './play_canvas';

export default function VideoPlayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const notUpscaleVideoRef = useRef<HTMLVideoElement | null>(null);
  const [pause, setPause] = useState<boolean>(true);
  const [upscaling, setUpscaling] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(duration);

  const handleSeek=(currentTime:number)=>
  {
    console.log("mario handle seek");
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
    if (notUpscaleVideoRef.current) {
      notUpscaleVideoRef.current.currentTime = currentTime;
    }
    setCurrentTime(currentTime);
  };

  const handlePause=(pause:boolean)=>
  {
    if (videoRef.current) {
      if(pause==true)
      {
        console.log("pause");
        videoRef.current.pause();
      }
      else
      {
        console.log("play");
        videoRef.current.play();
      }
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
      setEndTime(videoRef.current.duration);
      videoRef.current.volume = 0.0;
    }
    if (notUpscaleVideoRef.current) {
      if(pause==true)
      {
        notUpscaleVideoRef.current.pause();
      }
      else
      {
        notUpscaleVideoRef.current.play();
      }
      setCurrentTime(notUpscaleVideoRef.current.currentTime);
      setDuration(notUpscaleVideoRef.current.duration);
      setEndTime(notUpscaleVideoRef.current.duration);
      notUpscaleVideoRef.current.volume = 0.0;
    }
    setPause(pause);
  };

  const handleUpscaling=(upscaling:boolean)=>
  {
    setUpscaling(upscaling);
    if (videoRef.current) {
      videoRef.current.currentTime = 0.0;
    }
    if (notUpscaleVideoRef.current) {
      notUpscaleVideoRef.current.currentTime = 0.0;
    }
    setPause(true);
    setCurrentTime(0.0);
  };

  const handleLoadedMetadata = () => 
  {
    const video = videoRef.current;
    console.log("handleLoadedMetadata");
    if (video)
    {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setEndTime(video.duration);
    }
  };
  const handleLoadedMetadataByNot = () => 
  {
    const notUpscaleVideo = notUpscaleVideoRef.current;
    if (notUpscaleVideo)
    {
      setCurrentTime(notUpscaleVideo.currentTime);
      setDuration(notUpscaleVideo.duration);
      setEndTime(notUpscaleVideo.duration);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const notUpscaleVideo = notUpscaleVideoRef.current;
    if (notUpscaleVideo)
    {
      const handleTimeUpdateByNot = () => setCurrentTime(notUpscaleVideo.currentTime);
      const handleLoadedMetadataByNot = () => {setDuration(notUpscaleVideo.duration);setEndTime(notUpscaleVideo.duration);}
      notUpscaleVideo.addEventListener('timeupdate', handleTimeUpdateByNot);
      notUpscaleVideo.addEventListener('loadedmetadata', handleLoadedMetadataByNot);
      return () => {
        notUpscaleVideo.removeEventListener('timeupdate', handleTimeUpdateByNot);
        notUpscaleVideo.removeEventListener('loadedmetadata', handleLoadedMetadataByNot);
      };
    }
    if (video)
    {
      const handleTimeUpdate = () => setCurrentTime(video.currentTime);
      const handleLoadedMetadata = () => {setDuration(video.duration);setEndTime(duration)}
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);  
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
    return;
  }, [upscaling]);

  const childProps:SdfPlayerProps=
  {
    pause,
    currentTime,
    duration,
    startTime,
    endTime,
    handlePause,
    handleSeek,
    videoRef,
    upscaling,
    handleUpscaling
  }
  return (
    <div>
      {
        /*
        !upscaling &&
        <video
          ref={notUpscaleVideoRef}
          width={960}
          height={540}
          autoPlay={false}
          loop
          muted={false}
          onLoadedMetadata={handleLoadedMetadataByNot}
          playsInline
          src="/videos/input_640x360.mp4"
        />
        */
      }
      {
        upscaling &&
        <div>
          <video
            ref={videoRef}
            width={640}
            height={360}
            autoPlay={true}
            loop
            muted={false}
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            src="/videos/output_640x360.webm"
            className="hidden"
          />
          <PlayCanvas {...childProps}></PlayCanvas>
        </div>
      }
      {/* UI Overlay */}
      {
        /*
        <video
          ref={notUpscaleVideoRef}
          width={1280}
          height={720}
          autoPlay={true}
          loop
          muted={false}
          onLoadedMetadata={handleLoadedMetadataByNot}
          playsInline
          src="/videos/sample_1280x720.mp4"
        />
        */
      }
      {
        
        <div className="flex justify-center">
            <TimeSlider  {...childProps}></TimeSlider>
        </div>
      }
      {
        <div className="flex justify-center">
          <ReplayButton {...childProps}></ReplayButton>
        </div>
      }
      {
          <div className="flex justify-center">
              {
                <div className="bg-white/70 text-black px-4 py-2 rounded-xl shadow-lg hover:bg-white">
                  左：1280x720のアップスケーリング<br/> 
                  右：640x360の元動画
                </div>
                //<UpscalingButton {...childProps}></UpscalingButton>
              }
          </div>
      }
      </div>
  );
}