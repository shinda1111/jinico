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
          この技術を用いることで個人や小さな企業でもサーバーの代金を節約しながら動画サイトの構築が可能となります<br/>
          もし技術的な更なる詳細やサポート、応援を行いたい方は以下のNoteのコメント欄にて感想をお聞かせください<br/>
        </div>
        <a className="flex justify-center text-blue-500" href="https://note.com/murairo/n/nefeb8770a3ce">感想欄のリンク</a>
        <br/>
        <div className="flex justify-center text-xl">何故アップスケーリングが節約になるのか？</div>
         <div className="flex justify-center text-xl">
          <Image
            src="/image/presentation_one.jpg"  // 画像のパス
            alt=""  // 代替テキスト（必須）
            width={1280}  // 幅（必須）
            height={720}  // 高さ（必須）
          />
        </div>
         <div className="flex justify-center text-xl">
          <Image
            src="/image/presentation_two.jpg"  // 画像のパス
            alt=""  // 代替テキスト（必須）
            width={1280}  // 幅（必須）
            height={720}  // 高さ（必須）
          />
         </div>
        <div className="flex justify-center text-xl">具体的には従来の1/3の費用が動画サイトが運営できる！</div>
        <div className="flex justify-center">AWSの場合</div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 border border-gray-300 text-sm">
            <div className="bg-gray-100 font-bold border px-4 py-2">項目</div>
            <div className="bg-gray-100 font-bold border px-4 py-2">通常</div>
            <div className="bg-gray-100 font-bold border px-4 py-2">Yosakiを用いた場合</div>
            <div className="border px-4 py-2">一つの動画の容量(約10分のHD動画)</div>
            <div className="border px-4 py-2">130MB</div>
            <div className="border px-4 py-2">40MB</div>
            <div className="border px-4 py-2">ファイル数</div>
            <div className="border px-4 py-2">1000ファイル</div>
            <div className="border px-4 py-2">1000ファイル</div>
            <div className="border px-4 py-2">動画再生数(全合計)</div>
            <div className="border px-4 py-2">100万再生</div>
            <div className="border px-4 py-2">100万再生</div>
            <div className="border px-4 py-2">Cloud Frontの転送量(全て日本の回線で見られたと仮定）</div>
            <div className="border px-4 py-2">130TiB</div>
            <div className="border px-4 py-2">40TiB</div>
            <div className="border px-4 py-2">HTTPリクエスト</div>
            <div className="border px-4 py-2">100万回</div>
            <div className="border px-4 py-2">100万回</div>
            <div className="border px-4 py-2">AWS CloudFrontの料金(一月)</div>
            <div className="border px-4 py-2">18086.04ドル</div>
            <div className="border px-4 py-2">3905.04ドル</div>
            <div className="border px-4 py-2">AWS S3の種類</div>
            <div className="border px-4 py-2">1S3 Standard</div>
            <div className="border px-4 py-2">S3 Standard</div>
            <div className="border px-4 py-2">AWS S3の容量</div>
            <div className="border px-4 py-2">130GiB</div>
            <div className="border px-4 py-2">40GiB</div>
            <div className="border px-4 py-2">AWS S3のInbound Data Transfer</div>
            <div className="border px-4 py-2">130GiB</div>
            <div className="border px-4 py-2">40GiB</div>
            <div className="border px-4 py-2">AWS S3のOutbound Data Transfer</div>
            <div className="border px-4 py-2">130GiB</div>
            <div className="border px-4 py-2">40GiB</div>
            <div className="border px-4 py-2">AWS S3の料金(一月)</div>
            <div className="border px-4 py-2">10410.59ドル</div>
            <div className="border px-4 py-2">3533.72ドル</div>
            <div className="border px-4 py-2">AWS全体の合計</div>
            <div className="border px-4 py-2">28,496.63ドル</div>
            <div className="border px-4 py-2">9893.96ドル</div>
            <div className="border px-4 py-2">日本円における運営費<br/>(1ドル140円として試算)</div>
            <div className="border px-4 py-2">398万9523円</div>
            <div className="border px-4 py-2">138万5154円</div>
            <div className="border px-4 py-2">※計算日は2025年7月28日</div>
            <div className="border px-4 py-2"></div>
            <div className="border px-4 py-2"></div>
          </div>
        </div>
        <div className="flex justify-center">GCPの場合</div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 border border-gray-300 text-sm">
            <div className="bg-gray-100 font-bold border px-4 py-2">項目</div>
            <div className="bg-gray-100 font-bold border px-4 py-2">通常</div>
            <div className="bg-gray-100 font-bold border px-4 py-2">Yosakiを用いた場合</div>
            <div className="border px-4 py-2">一つの動画の容量(約10分のHD動画)</div>
            <div className="border px-4 py-2">130MB</div>
            <div className="border px-4 py-2">40MB</div>
            <div className="border px-4 py-2">ファイル数</div>
            <div className="border px-4 py-2">1000ファイル</div>
            <div className="border px-4 py-2">1000ファイル</div>
            <div className="border px-4 py-2">動画再生数(全合計)</div>
            <div className="border px-4 py-2">100万再生</div>
            <div className="border px-4 py-2">100万再生</div>
            <div className="border px-4 py-2">Cloud Frontの転送量(全て日本の回線で見られたと仮定）</div>
            <div className="border px-4 py-2">130TiB</div>
            <div className="border px-4 py-2">40TiB</div>
            <div className="border px-4 py-2">Cloud CDNのHTTPリクエスト</div>
            <div className="border px-4 py-2">100万回</div>
            <div className="border px-4 py-2">100万回</div>
            <div className="border px-4 py-2">Cloud CDNの値段</div>
            <div className="border px-4 py-2">8295.15ドル</div>
            <div className="border px-4 py-2">2767.05ドル</div>
            <div className="border px-4 py-2">Cloud Storageの容量</div>
            <div className="border px-4 py-2">130GiB</div>
            <div className="border px-4 py-2">40GiB</div>
            <div className="border px-4 py-2">Google Cloudへの転送量</div>
            <div className="border px-4 py-2">130GiB</div>
            <div className="border px-4 py-2">40GiB</div>
            <div className="border px-4 py-2">Cloud Storageの値段</div>
            <div className="border px-4 py-2">2662.90ドル</div>
            <div className="border px-4 py-2">817.90ドル</div>
            <div className="border px-4 py-2">GCP全体の値段の合計</div>
            <div className="border px-4 py-2">10958.05ドル</div>
            <div className="border px-4 py-2">3585.65ドル</div>
            <div className="border px-4 py-2">日本円における運営費<br/>(1ドル140円として試算)</div>
            <div className="border px-4 py-2">153万4127円</div>
            <div className="border px-4 py-2">50万1991円</div>
            <div className="border px-4 py-2">※計算日は2025年7月28日</div>
            <div className="border px-4 py-2"></div>
            <div className="border px-4 py-2"></div>
          </div>
        </div>
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
