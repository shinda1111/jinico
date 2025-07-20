import { SdfPlayerProps } from "./sdf_player_props";

export default function TimeDisplay(props:SdfPlayerProps) {
    const formatTime = (secs: number): string => {
        const totalSeconds = Math.floor(secs);
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secsLeft = totalSeconds % 60;

        const pad = (n: number) => n.toString().padStart(2, '0');

        if (hrs > 0) {
            return `${pad(hrs)}:${pad(mins)}:${pad(secsLeft)}`;
        } else {
            return `${pad(mins)}:${pad(secsLeft)}`;
        }
    };

    return  <button className="bg-white/70 text-black px-4 py-2 rounded-xl shadow-lg hover:bg-white">
              {formatTime(props.currentTime)}&nbsp;/&nbsp;{formatTime(props.duration)}
    </button>;
}