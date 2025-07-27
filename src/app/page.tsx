import VideoPlayer from "@/components/sdf_player/video_player";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="space-y-4">
        <div className="flex justify-center text-xl">新型動画サイト基盤技術「Yosaki」</div>
        <br/>
        <div className="flex justify-center">
          このページは個人でも動画サイトを作れるようにした基盤技術の紹介ページです<br/>
          まずは以下のプレイヤーをご覧ください<br/>
          <br/>
        </div>
        <div className="flex justify-center">
          <VideoPlayer></VideoPlayer>
        </div>
        <div className="flex justify-center">
          如何でしたでしょうか？<br/>
          このように非常に軽量なアップスケーリング技術を用いることで約半分の解像度でありながらHDとほぼ同じ体験が可能です<br/>
          もし技術的な更なる詳細やサポート、応援を行いたい方は以下のNoteのコメント欄にて感想をお聞かせください<br/>
        </div>
        <a className="flex justify-center text-blue-500" href="https://note.com/murairo/n/nefeb8770a3ce">感想欄のリンク</a>
        <br/>
        <div className="flex justify-center text-xl">従来のアップスケーリングとの比較</div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3">
            <div className="border border-gray-500 flex justify-center">
              従来の動画
            </div>
            <div className="border border-gray-500 flex justify-center">
              他のアップスケーリング
            </div>
            <div className="border border-gray-500 flex justify-center">
              Yosaki
            </div>
            <div className="border border-gray-500 col-span-3 flex justify-center">
              解像度
            </div>
            <div className="border border-gray-500 flex justify-center">
              1280x720
            </div>
            <div className="border border-gray-500 flex justify-center">
              640x360以下
            </div>
            <div className="border border-gray-500 flex justify-center">
              640x360以下
            </div>
            <div className="border border-gray-500 col-span-3 flex justify-center">
              サーバーの負担と料金
            </div>
            <div className="border border-gray-500 flex justify-center">
              非常に高く、通常の企業や個人の資金では不可能
            </div>
            <div className="border border-gray-500 flex justify-center">
              軽く、通常の企業や個人の資金でも可能              
            </div>
            <div className="border border-gray-500 flex justify-center">
              軽く、通常の企業や個人の資金でも可能    
            </div>
            <div className="border border-gray-500 col-span-3 flex justify-center">
              PCやスマホへの負荷
            </div>
            <div className="border border-gray-500 flex justify-center">
              軽い
            </div >
            <div className="border border-gray-500 flex justify-center">
              重い(ハイエンドPCが必要)
            </div>
            <div className="border border-gray-500 flex justify-center">
              軽い(通常のスマホで3Dゲームを動かす程度の負担)
            </div>
            <div className="border border-gray-500 col-span-3 flex justify-center">
              AI(ディープラーニング)の使用
            </div>
            <div className="border border-gray-500 flex justify-center">
              しない
            </div >
            <div className="border border-gray-500 flex justify-center">
              している
            </div>
            <div className="border border-gray-500 flex justify-center">
              しない
            </div>
          </div>
        </div>
      </main>
      <br/>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        使用している映像はCCライセンスによるフリー素材である「Big Buck Bunny」を使用しています<br/>
        https://peach.blender.org/
      </footer>
    </div>
  );
}
