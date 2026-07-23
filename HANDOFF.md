# VISION Personal Gym 公式サイト 引き継ぎ書

最終更新: 2026-07-23

岡山県苫田郡鏡野町の完全マンツーマン・パーソナルジム「VISION Personal Gym」の
公式サイト（1ページ完結LP）。正式な受注制作物。
※店名は 2026-07 に「VISION」で正式決定（旧仮名: STUDIO YU。ローカルのディレクトリ名は旧名のまま）。

---

## 1. 基本情報・URL

| 項目 | 内容 |
|------|------|
| **本番URL** | **https://vision-personal-gym.vercel.app** |
| **GitHub（現行）** | **https://github.com/visionr080808-dot/vision-personal-gym** |
| Vercel scope | **vision888**（アカウント: visionr080808-1799 / vision.r080808@gmail.com） |
| Vercelプロジェクト名 | vision-personal-gym |
| GitHubアカウント | visionr080808-dot（vision.r080808@gmail.com 系） |
| ローカル | `/Users/hiroshikento/Documents/portfolio-studio-yu`（SHIMA CRAFT の隣・別リポジトリ、フォルダ名・git remote名は旧名のまま） |

※2026-07-23、GitHub・VercelともにVision側の新アカウントへ完全移行済み。
旧shimacraft8側（GitHub: shimacraft8/portfolio-studio-yu、Vercel: shimacraft8-6355s-projects /
portfolio-studio-yu-pied.vercel.app）は履歴として残存するが、**今後の開発・デプロイ対象ではない**。
※独自ドメインは取得後に接続予定。現状は vercel.app のまま。

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

### 残タスク: Vercel⇄GitHubの自動デプロイ連携（未完了）
`vercel git connect` を試みたが、"Failed to connect... make sure you have access" のエラーで
失敗した。原因はおそらく **Vercelの GitHub App が visionr080808-dot アカウント側でまだ
インストール/認可されていない**ため。現状はCLI手動デプロイのみで運用しており、
push しても自動デプロイはされない。自動化したい場合は、Vercelダッシュボード
（Project Settings → Git → Connect Git Repository）からご自身で認可を通していただく必要がある。

---

## 2. 技術スタック

- Next.js 14（App Router）+ TypeScript
- Tailwind CSS 3 + Framer Motion 11
- next/font/google: Outfit（見出し英字）/ Noto Sans JP（本文・和文）
- ホスティング: Vercel（CLI手動デプロイ）

---

## 3. ディレクトリ構成

```
portfolio-studio-yu/
├── app/
│   ├── layout.tsx        # Metadata/OGP・フォント・StructuredData/Analytics読込
│   ├── page.tsx          # 全セクションを組み立てるメインページ
│   ├── globals.css       # 配色・流体タイポ・reduced-motion対応
│   ├── sitemap.ts        # 自動生成
│   └── robots.ts         # 自動生成
├── src/
│   ├── data/site.ts      # ★全文言の一元管理（差し替えはここ）
│   └── components/
│       ├── Header.tsx          # グラスモーフィズム・スクロールで文字色切替
│       ├── MobileCTA.tsx       # スマホ下部固定CTA（電話/Instagram）
│       ├── Reveal.tsx          # whileInView fadeInUp ラッパー
│       ├── Stats.tsx           # 実績カウントアップ
│       ├── VoiceCarousel.tsx   # お客様の声 5秒自動カルーセル
│       ├── Faq.tsx             # FAQアコーディオン
│       ├── StructuredData.tsx  # 構造化データ（HealthClub）
│       ├── Analytics.tsx       # GA4（環境変数未設定なら読み込まない）
│       └── HeroBackground.tsx  # ヒーロー背景の自動クロスフェードカルーセル（6秒間隔）
├── app/icon.png           # favicon（ロゴから生成）
└── public/images/
    ├── gym-interior.jpg   # ヒーロー背景（ジム内装・モノクロ）
    ├── logo.jpg           # ロゴ原本（黒・白背景1280px）
    ├── logo-black.png     # 透過・黒ロゴ（ヘッダー/フッター用）
    ├── logo-white.png     # 透過・白ロゴ（ヒーロー/ヘッダー最上部用）
    ├── trainer-pose.jpg   # トレーナー紹介（大会・全身ポーズ）
    ├── trainer-smile.jpg  # トレーナー紹介サブ写真（2枚重ねの小さい方）
    └── hero-1〜5.jpg       # ヒーロー背景（2026-07-23差し替え、表示順は5→1でクロスフェード）
```

---

## 4. ページ構成

Hero → Concept（特徴3つ）→ Stats（実績カウントアップ）→ Trainer（トレーナー紹介）
→ Menu（4メニュー）→ Price（キャンペーンバナー＋回数券/月額/セミパーソナルの3グループ）→ Voice（お客様の声）
→ Access/FAQ → Contact → Footer

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
- タグライン: 「あなたが思い描く理想の自分を実現する場所」（2026-07-23追加、ヒーローに表示）
- 住所: **岡山県苫田郡鏡野町上森原353-3**（2026-07-23正式住所決定・公開。Access に実際のGoogleマップ埋め込み追加）
- 公式LINE: https://lin.ee/VB6XkDR（2026-07-23追加。Contact/ヘッダーCTA/モバイル固定CTAの主導線に採用）
- 体験トレーニング: 20分1,000円 → **30分2,000円に変更**（2026-07-23）
- メニュー: 旧4項目(タイトル+説明文)を**5項目のシンプルな箇条書きリストに変更**（ボディメイク/ダイエット/筋力トレーニング/姿勢改善/ピラティス・栄養サポート）
- ロゴ: `public/images/` に配置（logo.jpg=原本 / logo-black.png・logo-white.png=透過版、
  元ファイルは `~/Documents/戸田くん/ジムロゴ.jpg`）。favicon は `app/icon.png`
- キャッチ: 鍛える、整える、続けられる。
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

## 7. 環境変数（Vercel / .env.example）

| 変数 | 用途 | 現状 |
|------|------|------|
| NEXT_PUBLIC_SITE_URL | 本番URL（OGP/sitemap/構造化データ） | production登録済み（https://vision-personal-gym.vercel.app、vision888スコープ側） |
| NEXT_PUBLIC_GA_ID | GA4測定ID | 未設定（設定すると自動で計測開始） |

---

## 8. 開発・デプロイ手順

```bash
# ローカル開発（3000はSHIMA CRAFTが使用中のため別ポート）
npm install
npm run dev -- -p 3210      # http://localhost:3210

# ビルド確認
npm run build

# コード管理: visionr080808-dot の GitHub に push
git add -A && git commit -m "..." && git push origin main

# デプロイ（本番・vision888アカウント、GitHub自動連携は未設定のため手動）
vercel --prod --yes --scope vision888
```

---

## 9. よくある差し替え作業

- 文言・料金・声・FAQ・実績の変更 → `src/data/site.ts` のみ編集
- 配色の変更 → `tailwind.config.ts` の colors
- 写真の差し替え → `public/images/` に同名で上書き（ヒーローは hero-1〜5.jpg、5枚まで対応）
- 独自ドメイン接続 → Vercelダッシュボードから（店名はVISIONで確定済み）

---

## 10. 未対応・申し送り事項

- **GitHub・Vercelともにvisionアカウントへ移行完了**（GitHub: visionr080808-dot、
  Vercel: vision888）。旧shimacraft8側のリポジトリ・Vercelプロジェクトは履歴として残存のみ。
- **Vercel⇄GitHubの自動デプロイ連携は未完了**（`vercel git connect` が権限エラーで失敗。
  おそらくVercel GitHub Appがvisionr080808-dotアカウントに未インストール）。
  現状はpushしても自動デプロイされないため、**変更を公開する際は毎回
  `vercel --prod --yes --scope vision888` の手動デプロイが必要**。
  自動化するには、Vercelダッシュボード（vision888でログイン）→ Project Settings → Git →
  Connect Git Repository から visionr080808-dot/vision-personal-gym を選び、
  GitHub App の認可を通していただく必要がある（ブラウザでの手動承認が必要なため未実施）。
- 旧shimacraft8側のデプロイ（`portfolio-studio-yu-pied.vercel.app`）・リポジトリは
  不要であれば後日削除してよい。
- 独自ドメインは未接続（現状 vercel.app のまま）。取得後にVercelで接続。
- 正式オープン日・セミパーソナル8回の単価表記（4,350 vs 4,375）は戸田さんに要確認。

---

## 11. コミット履歴

- `02fb03e` feat: STUDIO YU パーソナルジム公式サイト（Next.js 14 LP）初版
- `f52b23d` feat: 暖色系テーマへ全面リデザイン・カーソル/地図/無投薬表記を削除
