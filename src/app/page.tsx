import VideoPlayer from "@/components/sdf_player/video_player";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="items-center">
        <VideoPlayer></VideoPlayer>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        使用している映像はCCライセンスによるフリー素材である「Big Buck Bunny」を使用しています
        ttps://peach.blender.org/
      </footer>
    </div>
  );
}
