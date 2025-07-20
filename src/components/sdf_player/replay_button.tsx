import { SdfPlayerProps } from "./sdf_player_props";

export default function ReplayButton(props:SdfPlayerProps) {
  return (     
    <div className="flex justify-start">
        {
          props.pause && 
          <button onClick={()=>{props.handlePause(false)}} className="bg-white/70 text-black px-4 py-2 rounded-xl shadow-lg hover:bg-white">
          ▶ 再生
          </button>
        }
        {
          
          !props.pause && 
          <button onClick={()=>{props.handlePause(true)}} className="bg-white/70 text-black px-4 py-2 rounded-xl shadow-lg hover:bg-white">
          ||停止
          </button>
        }
    </div>
  );
}