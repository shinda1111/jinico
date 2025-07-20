import { RefObject } from "react";

export type SdfPlayerProps = {
  videoRef:  RefObject<HTMLVideoElement | null>;
  pause: boolean;
  startTime: number;
  endTime: number;
  duration: number;
  currentTime: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  upscaling:boolean;
  setUpscaling: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  width:number;
  height:number;
  handleSeek:(currentTime:number) =>void;
  handlePause:(pause:boolean)=>void;
};