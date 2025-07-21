"use client";
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {render_video} from './gl_module/gl_module';
import ReplayButton from './replay_button';
import { SdfPlayerProps } from './sdf_player_props';

export default function TimeSlider(props:SdfPlayerProps) {
  return (
    <input
        type="range"
        value={props.currentTime}
        min={props.startTime}
        max={props.endTime}
        step={"0.1"}
        onChange={(event: ChangeEvent<HTMLInputElement>)=>{props.handleSeek(parseFloat(event.target.value))}}
        className="w-full accent-blue-500"
    />
  );
}