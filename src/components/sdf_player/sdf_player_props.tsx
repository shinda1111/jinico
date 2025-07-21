import { RefObject } from "react";

export type SdfPlayerProps = {
  duration:number;
  currentTime:number;
  pause: boolean;
  handlePause:(pause:boolean)=>void;
  upscaling: boolean;
  handleUpscaling:(upscaling:boolean)=>void;
  startTime: number;
  endTime:number;
  handleSeek:(currentTime:number)=>void;
  videoRef:RefObject<HTMLVideoElement | null>;
};