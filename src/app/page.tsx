import VideoPlayer from "@/components/sdf_player/video_player";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <VideoPlayer></VideoPlayer>
      </main>
    </div>
  );
}
