"use client";
import { useEffect, useRef, useState } from 'react';
import { SdfPlayerProps } from './sdf_player_props';
import { render_video } from './gl_module/gl_module';

export default function PlayCanvas(props:SdfPlayerProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const video = props.videoRef.current!;
        if (!canvas || !video)    
        {
            return;
        }
        const gl = canvas.getContext('webgl2', { premultipliedAlpha: false })!;
        if (!gl) return;

        canvas.width = 1280;
        canvas.height = 360;

        (async () => 
            {    
                try {
                    render_video(gl, video, canvas);
                    console.log("luige");
                } catch (e) {
                    console.error("render_video error:", e);
                }
            }
        )();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={1280}
            height={360}
            className=""
        />
  );
}