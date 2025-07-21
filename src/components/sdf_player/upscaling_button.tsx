import { SdfPlayerProps } from "./sdf_player_props";

export default function UpscalingButton(props:SdfPlayerProps) {
  return (     
    <div className="flex justify-start">
        {
          props.upscaling &&
          <button onClick={()=>{props.handleUpscaling(false)}} className="bg-white/70 text-black px-4 py-2 rounded-xl shadow-lg hover:bg-white">
            アップスケーリング有り
          </button>
        }
        {
          !props.upscaling &&
          <button onClick={()=>{props.handleUpscaling(true)}} className="bg-white/70 text-black px-4 py-2 rounded-xl shadow-lg hover:bg-white">
            アップスケーリング無し
          </button>
        }
    </div>
  );
}