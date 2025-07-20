import { SdfPlayerProps } from "./sdf_player_props";

export default function TimeSlider(props:SdfPlayerProps) {
    console.log(props.endTime,props.startTime,props.currentTime);
  return (     
    <div>
        <input
            value={props.currentTime}
            type="range"
            min={props.startTime}
            max={props.endTime}
            step="0.01"
            className="w-full accent-blue-500"
            onChange={(e)=>props.handleSeek(parseFloat(e.target.value))}
        />
    </div>
  );
}