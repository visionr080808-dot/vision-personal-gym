# VISION Personal Gym 公式サイト 引き継ぎ書

最終更新: 2026-07-24

岡山県苫田郡鏡野町の完全マンツーマン・パーソナルジム「VISION Personal Gym」の
公式サイト（1ページ完結LP）。正式な受注制作物。
※店名は 2026-07 に「VISION」で正式決定（旧仮名: STUDIO YU。ローカルのディレクトリ名は旧名のまま）。

---

## 1. 基本情報・URL

| 項目 | 内容 |
|------|------|
| **本番URL（独自ドメイン・正式）** | **https://pt-vision.com** |
| Cloudflare Pages既定URL（サブURL・引き続き有効） | https://vision-personal-gym.pages.dev |
| **GitHub** | **https://github.com/visionr080808-dot/vision-personal-gym** |
| Cloudflareアカウント | vision.r080808@gmail.com（Account ID: ffa3bed80e0d8ec8e317b0ab311ec0fd） |
| Cloudflare Pagesプロジェクト名 | vision-personal-gym |
| GitHubアカウント | visionr080808-dot（vision.r080808@gmail.com 系） |
| ローカル | `/Users/hiroshikento/Documents/portfolio-studio-yu`（SHIMA CRAFT の隣・別リポジトリ、フォルダ名・git remote名は旧名のまま） |
| 独自ドメイン | `pt-vision.com`（2026-07-24 お名前.comで取得完了。ネームサーバーをCloudflareに変更し
  Custom domainsへ追加済み。DNS反映待ち〜完了） |
| 連絡先メール | `info@pt-vision.com`（Google Workspace設定中。詳細は「12. ドメイン接続・Google Workspace」参照） |

**旧ホスティング（Vercel）は2026-07-24付けで運用終了・Cloudflare Pagesへ完全移行済み。**
理由: Vercelの無料"Hobby"プランは商用利用不可の規約のため、Proプラン（$20/月）が必要になる想定だったが、
このサイトはAPI Route等のサーバー機能を一切使わない完全静的サイトのため、**静的ホスティングとして
商用利用可・無料枠が寛大なCloudflare Pagesへ切り替え**、コストをゼロに抑えた。
旧Vercel環境（vision888スコープ、`vision-personal-gym.vercel.app`）は履歴として残存するが今後更新しない。
GitHub: shimacraft8/portfolio-studio-yu（さらに旧）も履歴として残存、今後の対象ではない。

### 移行の経緯（重要）
2026-07-23、以下の手順で shimacraft8 → Vision（新アカウント）への完全移行を実施：

1. **Vercel**: ローカルCLIの再認証時、Macブラウザに残っていた vision.r080808@gmail.com の
   既存ログインセッションが自動的にdevice-flow認証を通過し、Vercelアカウント "vision888" に
   接続された（プロジェクト0件の新規アカウント）。ユーザー確認の上でこのアカウントに正式移行し、
   `vercel --prod --yes --scope vision888` でデプロイ。
2. **GitHub**: GitHubのdevice-flow認証は自動承認されない仕様のため、ユーザー自身に
   ワンタイムコードをブラウザで入力・承認していただき、`visionr080808-dot` アカウントでCLIログイン。
   その後 `gh repo create visionr080808-dot/vision-personal-gym` で新規リポジトリを作成し、
   ローカルの `origin` をそちらに向けて全コミット履歴ごと push。

**いずれの手順でもパスワードの直接入力は一切行っていない**（Vercelはブラウザの既存セッション、
GitHubはユーザー自身によるワンタイムコード承認）。

### Cloudflare Pagesへの移行の経緯（2026-07-24）
Vercelの無料"Hobby"プランは商用利用不可の規約のため、本来はProプラン（$20/月）が必要と
なる想定だった。しかしこのサイトはAPI Route・サーバーアクション等を一切使わない完全静的サイト
のため、`next.config.mjs` に `output: "export"` を追加してNext.jsの**静的書き出し**に変更し、
Cloudflare Pages（無料・商用利用可・帯域無制限）へ移行した。これにより追加コストなしで
商用利用の規約リスクを解消。

Cloudflareアカウントへのログインも、GitHubと同様に一度ブラウザでの手動承認が必要だった
（`wrangler login` のOAuthフロー。1回目はCSRFエラーで失敗したため再試行）。
**パスワードの直接入力は行っていない。**

現状はCLI手動デプロイのみで運用（`wrangler pages deploy`）。GitHub⇄Cloudflare Pagesの
自動デプロイ連携（pushで自動反映）はまだ設定していない（Cloudflareダッシュボードでの
手動接続が必要。「10. 未対応・申し送り事項」参照）。

**旧Vercel環境は運用終了**（vision888スコープ、`vision-personal-gym.vercel.app`）。
削除はしていないが今後更新しない。

---

## 2. 技術スタック

- Next.js 14（App Router）+ TypeScript、**`output: "export"` による完全静的書き出し**
  （API Route・サーバーアクションなし。`next/image` は `unoptimized: true`）
- Tailwind CSS 3 + Framer Motion 11
- next/font/google: Outfit（見出し英字）/ Noto Sans JP（本文・和文）
- ホスティング: **Cloudflare Pages**（`wrangler` CLIで手動デプロイ。GitHub自動連携は未設定）

---

## 3. ディレクトリ構成

```
portfolio-studio-yu/
├── app/
│   ├── layout.tsx        # Metadata/OGP・フォント・StructuredData/Analytics読込
│   ├── page.tsx          # 全セクションを組み立てるメインページ（LP）
│   ├── results/page.tsx  # 実績ページ（お客様のBefore/After。microCMSから取得）
│   ├── trainer/page.tsx  # トレーナー詳細ページ（経歴・資格・競技歴。microCMSから取得、新設）
│   ├── globals.css       # 配色・流体タイポ・reduced-motion対応
│   ├── sitemap.ts        # 自動生成
│   └── robots.ts         # 自動生成
├── src/
│   ├── data/site.ts      # ★全文言の一元管理（差し替えはここ）
│   ├── lib/microcms.ts   # results/achievements 用データ取得（microCMS REST APIをクライアント側fetch）
│   └── components/
│       ├── Header.tsx          # グラスモーフィズム・スクロールで文字色切替
│       ├── MobileCTA.tsx       # スマホ下部固定CTA（電話/Instagram）
│       ├── Reveal.tsx          # whileInView fadeInUp ラッパー
│       ├── Stats.tsx           # 実績カウントアップ
│       ├── VoiceCarousel.tsx   # お客様の声 5秒自動カルーセル
│       ├── Faq.tsx             # FAQアコーディオン
│       ├── StructuredData.tsx  # 構造化データ（HealthClub）
│       ├── Analytics.tsx       # GA4（環境変数未設定なら読み込まない）
│       ├── HeroBackground.tsx  # ヒーロー背景の自動スライド切替（左方向・6秒間隔）
│       ├── SectionHead.tsx     # セクション見出し共通部品（page.tsx/results/page.tsxで共用）
│       └── Buttons.tsx         # BtnFill/BtnLine 共通ボタン部品（同上）
├── app/icon.png           # favicon（ロゴから生成）
└── public/images/
    ├── gym-interior.jpg   # OGP/構造化データ用画像（ヒーローには不使用）
    ├── logo.jpg           # ロゴ原本（黒・白背景1280px）
    ├── logo-black.png     # 透過・黒ロゴ（ヘッダー/フッター用）
    ├── logo-white.png     # 透過・白ロゴ（ヒーロー/ヘッダー最上部用）
    ├── trainer-pose.jpg   # トレーナー紹介（大会・全身ポーズ）
    ├── trainer-smile.jpg  # トレーナー紹介サブ写真（2枚重ねの小さい方）
    └── hero-1〜5.jpg       # ヒーロー背景（2026-07-23差し替え、表示順は5→1でクロスフェード）
```

---

## 4. ページ構成

**トップページ（`/`）**: Hero → Concept（特徴3つ）→ Stats（実績カウントアップ）→
Trainer（トレーナー紹介の抜粋＋「経歴・実績をもっと見る」で`/trainer`へ）→
Menu（5項目の簡易リスト）→ Price（キャンペーンバナー＋回数券/月額/セミパーソナルの3グループ）→
Voice（お客様の声）→ Access/FAQ → Contact → Footer

**独立ページ**:
- `/results` — お客様の実績（Before/After）。microCMS「results」APIから取得
- `/trainer` — トレーナー詳細（プロフィール＋競技歴・資格・学歴一覧）。
  microCMS「achievements」APIから取得し、カテゴリごとにグルーピング表示

---

## 5. 配色・デザイン（LYFT系エディトリアル・モノトーン／第4版）

参考: https://www.lyft-gym.com/ 。「白×黒の高コントラスト・シャープ（角丸なし）・
細めで広トラッキングの英字見出し・写真主役・余白たっぷり」を踏襲。
第3版までの暖色/ゴールドや太字・角丸ピル・多重シャドウ（＝AIテンプレ感）は撤去済み。

| トークン | 値 | 用途 |
|---------|-----|------|
| bg | #ffffff | 背景（純白） |
| accent | #111214 | ほぼ黒（黒帯セクション・CTA・強調ブロック） |
| text | #111214 | 文字 |
| card | #ffffff | カード背景 |
| card2 | #f4f4f5 | 交互パネル（Menu/Voice の淡グレー帯） |
| line | #e4e4e7 | 罫線（区切りの主役。ボックスより線で構成） |

タイポ（globals.css）: body=Noto Sans JP 400・line-height1.9・letter-spacing。
`.display-en`=Outfit500・大文字・トラッキング0.08em、`.heading-ja`=和文見出し500・
トラッキング0.06em。見出しは細め＋広トラッキング（extrabod廃止）。
- 角丸は全廃（rounded-none）。ボタンはシャープな矩形＋矢印、hoverで反転。
- セクション見出し=細いルール＋広トラッキングEN小ラベル＋和文見出し（ゴースト巨大文字は廃止）。
- 料金の「おすすめ」= ゴールドではなく黒反転ブロック＋隅の白RECOMMENDタグ。
- Stats/Contact は黒セクション、Menu/Voice は淡グレー帯でページに白黒のリズム。
- カード/シャドウを廃し、罫線・余白・写真で構成（LYFT的）。


## 6. 主要コンテンツ（※仮の項目に注意）

- 店名: **VISION**（フル表記 VISION Personal Gym）— 2026-07 正式決定
- ヒーロー見出し（h1）: **「あなたが思い描く理想の自分を実現する場所」**（`site.tagline`。
  2026-07-24にメイン見出しへ変更。PC/スマホとも同じ3行改行 `あなたが思い描く／理想の自分を／実現する場所`
  で明示的に固定。旧キャッチ「鍛える、整える、続けられる。」は撤去）
- ヒーロー背景: 新写真5枚（hero-1〜5.jpg）を**左方向スライドで自動切替**（`HeroBackground.tsx`、6秒間隔）
- 住所: **岡山県苫田郡鏡野町上森原353-3**（2026-07-23正式住所決定・公開。Access に実際のGoogleマップ埋め込み追加）
- 公式LINE: https://lin.ee/VB6XkDR（2026-07-23追加。Contact/ヘッダーCTA/モバイル固定CTAの主導線に採用）
- 体験トレーニング: 20分1,000円 → **30分2,000円に変更**（2026-07-23）
- メニュー: 旧4項目(タイトル+説明文)を**5項目のシンプルな箇条書きリストに変更**（ボディメイク/ダイエット/筋力トレーニング/姿勢改善/ピラティス・栄養サポート）
- ロゴ: `public/images/` に配置（logo.jpg=原本 / logo-black.png・logo-white.png=透過版、
  元ファイルは `~/Documents/戸田くん/ジムロゴ.jpg`）。favicon は `app/icon.png`
- トレーナー: 戸田 有哉（TODA YUYA）/ パーソナルトレーナー・ピラティスインストラクター
  - 資格タグ: パーソナルトレーナー / ピラティスインストラクター(FRP) / メンズフィジーク出場
  - ※「ナチュラル（無投薬）」表記・「Natural Athlete」タグは削除済み
- 実績（※仮）: 指導歴10年+ / 指導実績100名+ / 満足度4.9（画面に「※実績数値は仮です」注記）
- キャンペーン（2026-07 戸田さん指定）: 入会金11,000円→無料 / カウンセリング無料 /
  カウンセリング時の体験30分2,000円（ヒーローのピル＋Price先頭の黒バナーに表示）
- 料金（税込・2026-07 戸田さん指定の正式料金）:
  - 回数券: 4回25,000 / 8回48,000 / 16回90,000 / 24回132,000
  - 月額（毎月自動引落）: 月4回22,000 / 月8回40,000
  - セミパーソナル: 4回18,000 / 8回35,000（※8回の「1回あたり4,350円」は原文ママ。
    35,000÷8=4,375のため戸田さんに要確認）
  - 表示形式: 各グループに対象者チェックリスト（コピーは制作側で作成した汎用文言・要すれば調整）
  - おすすめバッジ: 月額「月4回コース」に設置（理由: 週1回の習慣化が最も続けやすく、
    同回数の回数券6,250円/回より750円割安。ユーザー目線の推奨として制作側で判断 — 戸田さん意向あれば変更可）
- お客様の声: 仮テキスト3件（「※掲載は仮テキストです」注記）
- アクセス: 岡山県苫田郡鏡野町上森原353-3・完全予約制。Google マップ埋め込みあり
  （`https://www.google.com/maps?q=<住所>&output=embed`、APIキー不要の簡易埋め込み）
  ※「2025年夏プレオープン予定」の行は情報が古いため削除済み（正式オープン日は要確認）
- 問い合わせ: フォームなし。公式LINE(主導線) / Instagram DM(@yu_fitness_jp) / 電話(080-2889-8819)
- メール: yu.fit.jp@gmail.com ※仮

---

## 7. 環境変数

`.env.production`（リポジトリにコミット済み。シークレットなしの公開URLのみのため問題なし）：

| 変数 | 用途 | 現状 |
|------|------|------|
| NEXT_PUBLIC_SITE_URL | 本番URL（OGP/sitemap/構造化データ、ビルド時に静的ページへ埋め込み） | `https://vision-personal-gym.pages.dev`（**独自ドメイン接続後に要更新・再ビルド・再デプロイ**） |
| NEXT_PUBLIC_GA_ID | GA4測定ID | 未設定（設定すると自動で計測開始） |
| NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN | microCMSのサービスID | 設定済み（`ah4kq0x0c7`） |
| NEXT_PUBLIC_MICROCMS_API_KEY | 同APIキー（読み取り専用） | 設定済み |

※静的書き出し（`output: "export"`）のため、`NEXT_PUBLIC_*` はビルド時にHTMLへ焼き込まれる。
値を変える際は必ず `npm run build` → 再デプロイが必要（実行時に切り替わるものではない）。
※ただしmicroCMSのAPI取得だけは例外で、実績ページはブラウザ側で毎回APIを呼びに行く実装のため、
**microCMS側で公開ボタンを押すだけで再デプロイ不要・即座にサイトへ反映される**（詳細は11.）。

---

## 8. 開発・デプロイ手順

```bash
# ローカル開発（3000はSHIMA CRAFTが使用中のため別ポート）
npm install
npm run dev -- -p 3210      # http://localhost:3210

# ビルド（out/ に静的ファイルが生成される）
npm run build

# コード管理: visionr080808-dot の GitHub に push
git add -A && git commit -m "..." && git push origin main

# デプロイ（本番・Cloudflare Pages。GitHub自動連携が未設定のため毎回手動）
npx wrangler pages deploy out --project-name=vision-personal-gym --branch=main
```

wranglerが未ログインの場合は先に `npx wrangler login`（vision.r080808@gmail.comでブラウザ認可）。

---

## 9. よくある差し替え作業

- 文言・料金・声・FAQ・実績の変更 → `src/data/site.ts` のみ編集
- 配色の変更 → `tailwind.config.ts` の colors
- 写真の差し替え → `public/images/` に同名で上書き（ヒーローは hero-1〜5.jpg、5枚まで対応）
- どの変更も、編集後は必ず「8. 開発・デプロイ手順」のビルド→デプロイが必要
  （GitHubで編集しただけでは反映されない。詳しくは `更新手順書.md` 参照）
- 独自ドメイン接続 → Cloudflareダッシュボード（Workers & Pages → vision-personal-gym →
  Custom domains）から。接続後は `.env.production` の NEXT_PUBLIC_SITE_URL も更新し再デプロイ

---

## 10. 未対応・申し送り事項

- **ホスティングは2026-07-24にVercelからCloudflare Pagesへ完全移行済み**
  （静的書き出し化 + 無料・商用利用可のため）。
- **独自ドメイン `pt-vision.com` は2026-07-24に取得完了・Cloudflareに接続済み**
  （ネームサーバーをCloudflareに変更、Custom domainsに追加、コード側のURL/メールも更新・
  再デプロイ済み）。DNS反映のタイムラグで実際に見えるようになるまで数分〜数時間かかる場合がある。
  詳細な作業ログは「12. ドメイン接続・Google Workspace」参照。
- **Google Workspace（メール）は契約手続き中**（`info@pt-vision.com`）。ユーザー名作成まで進行。
  契約完了後、CloudflareのDNSにMX/SPF/DKIMレコードを追加する必要がある（未実施）。
  それまでは `info@pt-vision.com` 宛のメールは届かない点に注意（サイト上の表記自体は変更済み）。
- **GitHub⇄Cloudflare Pagesの自動デプロイ連携は未設定**。現状は
  `npx wrangler pages deploy out ...` の手動デプロイのみ。自動化したい場合は、
  Cloudflareダッシュボード（vision.r080808@gmail.comでログイン）→ Workers & Pages →
  vision-personal-gym → Settings → Builds & deployments から
  `visionr080808-dot/vision-personal-gym` のGitHub連携を設定する（ブラウザでの手動承認が必要）。
- **microCMSサービス作成・環境変数の設定は完了済み**（サービスID `ah4kq0x0c7`）。
  ただし **microCMS側の「results」「achievements」APIの作成（フィールド設定）はまだ**
  （2026-07-24時点）。API作成前は各ページで「準備中です」と表示される（壊れてはいない）。
  作成手順は「11. 実績ページ・トレーナー経歴ページ（microCMS連携）」を参照。
- 旧Vercel環境（vision888スコープ、`vision-personal-gym.vercel.app`）・
  旧shimacraft8側のGitHub/Vercelは履歴として残存。不要であれば後日削除してよい。
- 正式オープン日・セミパーソナル8回の単価表記（4,350 vs 4,375）は戸田さんに要確認。

---

## 11. 実績ページ・トレーナー経歴ページ（microCMS連携）

2026-07-24追加。以下の2つを、**戸田さんがコードやGitHubを一切触らずに自分で更新できる**
ようにするため、ヘッドレスCMS「microCMS」と連携する専用ページを新設した。

| ページ | 内容 | microCMS API名 |
|---|---|---|
| `/results` | お客様の実績（Before/After写真＋コメント） | `results` |
| `/trainer` | トレーナーの競技歴・資格・学歴・スポーツ経歴一覧 | `achievements` |
  （2026-07-24、戸田さんのLINEでの提案「野球選手名図鑑チックにトレーナーとして載せて、
  その下に競技歴とか」を反映して追加）

### 仕組み
- サイト本体は今も完全な静的サイト（Cloudflare Pages）のまま
- 上記2ページだけは**ブラウザ側で直接microCMSのAPIを呼び出して**内容を表示する
  （`src/lib/microcms.ts` の `fetchResults()` / `fetchAchievements()`）
- そのため、**戸田さんがmicroCMSの管理画面で「公開」ボタンを押した瞬間に、
  サイトの再ビルド・再デプロイなしでそのまま反映される**
- API未作成の間は「準備中です」と表示されるだけで、ビルドエラーにはならない安全設計

### セキュリティ上の注意（要認識）
`NEXT_PUBLIC_MICROCMS_API_KEY` はブラウザ側で使う都合上、**サイトのソースコードに
公開される**（読み取り専用キーであっても、誰でも閲覧はできる状態になる）。
掲載データは元々公開情報なので実害は小さいが、他人がこのキーで大量にAPIを叩くと
microCMSの無料枠の呼び出し上限を消費される可能性はゼロではない。
より厳密に隠したい場合は、GitHub⇄Cloudflare Pagesの自動デプロイ連携を設定した上で、
microCMSの「Webhook」→ Cloudflare Pagesの「Deploy Hook」経由でビルド時取得に変更する
方式に切り替えることもできる（この場合、更新反映に数分のビルド時間がかかるようになる）。

### 現在の設定状況（2026-07-24時点）
- microCMSサービス作成済み：サービスID **`ah4kq0x0c7`**（サービス名 vision-gym）
- `.env.production` に `NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN` / `NEXT_PUBLIC_MICROCMS_API_KEY`
  を設定済み・本番デプロイ済み
- **`results` / `achievements` の2つのAPI自体（フィールド定義）はまだ未作成**
  （`curl`で確認したところ404。サービスは作られたがAPIがまだ、という状態）
  → 以下の手順で戸田さんに作成していただく必要がある

### 戸田さんによるAPI作成手順

#### ① 実績ページ用「results」API
1. microCMS管理画面 → 「API作成」→ 種類は **リスト形式** → API名（エンドポイント）を **`results`**
2. フィールドを追加：

   | フィールドID | 表示名 | 種類 |
   |---|---|---|
   | title | お名前・タイトル | テキストフィールド |
   | category | カテゴリ | テキストフィールド（例: ボディメイク） |
   | period | 期間 | テキストフィールド（例: 3ヶ月） |
   | beforeImage | Before画像 | 画像 |
   | afterImage | After画像 | 画像 |
   | comment | お客様の声 | テキストエリア |

#### ② トレーナー経歴ページ用「achievements」API
1. 同様に「API作成」→ リスト形式 → API名を **`achievements`**
2. フィールドを追加：

   | フィールドID | 表示名 | 種類 |
   |---|---|---|
   | title | 内容（例: 第10回〇〇コンテスト メンズフィジーク優勝） | テキストフィールド |
   | category | カテゴリ | セレクトフィールド（選択肢: 大会実績 / スポーツ経歴 / 資格 / 学歴） |
   | year | 年 | テキストフィールド（例: 2024） |
   | description | 補足説明 | テキストエリア（任意） |

APIキー自体は共通（サービス単位）なので、既にいただいたキーがそのまま両方のAPIで使える。
何か変更があれば教えてください。

### 戸田さんの日常運用（API作成後）
1. microCMSにログイン → 「results」または「achievements」→「コンテンツを追加」
2. 必要項目を入力
3. 「公開」ボタンを押す → その場でサイトに反映（再デプロイ不要）

---

## 12. ドメイン接続・Google Workspace

### ドメイン接続（2026-07-24実施・完了）
1. お名前.comで `pt-vision.com` を取得（登録者: Yuya Toda / vision.r080808@gmail.com、
   Whois情報公開代行あり、登録期限2027-07-24）
2. Cloudflareダッシュボード → Domains → Add a domain → 「Connect a domain」
   （※「Transfer a domain」ではない。レジストラはお名前.comのまま、DNS管理だけCloudflareに）
3. DNSスキャンで見つかった不要な `A / www / 150.95.255.38`（お名前.comの仮ページ）を削除
4. 発行されたネームサーバー **`alaric.ns.cloudflare.com` / `sneh.ns.cloudflare.com`** を
   お名前.comの「ネームサーバーの変更」に設定（`dns1/dns2.onamae.com` から切り替え）
5. `dig NS pt-vision.com` でCloudflareへの向き先切り替わりを確認
6. Cloudflare Pages（vision-personal-gym）→ Custom domains → `pt-vision.com` を追加
   （追加直後は「Initializing」、反映まで数分〜最大48時間）
7. コード側を更新・再デプロイ：
   - `.env.production` の `NEXT_PUBLIC_SITE_URL` → `https://pt-vision.com`
   - `app/layout.tsx` / `app/sitemap.ts` / `app/robots.ts` / `StructuredData.tsx` の
     フォールバックURLも `https://pt-vision.com` に統一
   - `src/data/site.ts` の `email` → `info@pt-vision.com`

### Google Workspace（2026-07-24時点・設定途中）
Business Starterプランでユーザー名作成まで進行（ユーザー名は `info` を推奨・採用、
`info@pt-vision.com` が管理者ログイン兼公開連絡先を兼ねる想定）。
**残タスク**: Workspace契約完了後、CloudflareのDNSにMX/SPF/DKIMレコードを追加する必要がある
（まだ未実施。追加するまで `info@pt-vision.com` 宛のメールは受信できない）。

---

## 13. コミット履歴

- `02fb03e` feat: STUDIO YU パーソナルジム公式サイト（Next.js 14 LP）初版
- `f52b23d` feat: 暖色系テーマへ全面リデザイン・カーソル/地図/無投薬表記を削除
