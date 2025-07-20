"use client";
import { SetStateAction, useEffect, useRef, useState } from 'react';
import {render_video} from './gl_module/gl_module';
import ReplayButton from './replay_button';
import TimeSlider from './time_slider';
import { SdfPlayerProps } from './sdf_player_props';

export default function PlayCanvas(props:SdfPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const video = props.videoRef.current!;
    if (!canvas || !video) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false })!;
    if (!gl) return;

    canvas.width = 1280;
    canvas.height = 720;

    (async () => 
        {    
            await video.play();
            try {
                render_video(gl, video, canvas);
            } catch (e) {
                console.error("render_video error:", e);
            }
        }
    )();
  }, []);

  return (
      <canvas
        ref={canvasRef}
        width={960}
        height={520}
        className="absolute top-0 left-0 w-full h-full"
      />
  );
}