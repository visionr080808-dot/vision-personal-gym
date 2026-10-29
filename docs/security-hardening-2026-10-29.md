# VISION セキュリティ強化（2026-10-29）

## 状態

現在のGitHub main（b514976）を基準にした独立した作業ブランチで修正。
本番へのデプロイは未実施。CloudflareのVISION用アカウント認証が完了してから公開する。
既存のローカル未コミット作業（アクセス解析管理画面等75ファイル）は含めていない。

## 変更内容

- Next.jsを14.2.35から16.4.3へ、React / React DOMを18.3.1から19.3.1へ更新。
- React 19と互換性のあるFramer Motion 11.18.2を使用。レイアウト・アニメーション設定は維持。
- DOMPurifyでブログ本文のスクリプト、イベント属性、不正なURL、フォーム、未許可の埋め込みを除去。
- JSON-LD中の「<」をエスケープし、将来の設定値によるscriptタグの終了を防止。
- Cloudflare Pages用ヘッダーを追加。フレームへの埋め込み、MIME誤認、不必要なブラウザ機能を制限。
- ビルド時に各HTMLのインラインスクリプトのSHA-256を計算し、CSPで一致するスクリプトだけを許可。
- CSPの許可先は既存のGoogle Maps / GA4 / microCMS等に限定。
- GA4初期化を同一サイトの外部JSへ移動し、任意のインラインJavaScriptを許可せず同じ計測IDを維持。
- Dependabotの週次更新チェック設定を追加（mainへマージ後に有効）。
- 間接依存も修正し、作業時のnpm audit検出を0件にした。

文章・写真・料金・予約リンク・スタイルシート・レスポンシブ設定は変更していない。
既存と新ビルドのフォント126個は全て内容が一致。
公開中の記事本文も、無害化前後でHTMLが一致することをブラウザで確認。

## 検証手順

Node.js 24 LTS（24.15以上。作業時は24.22.1）を使用する。

```sh
npm ci --ignore-scripts
npm run build
npm run test:security
npm run test:headers
npm run typecheck
npm run lint
npm audit
```

- test:security：正しい記事装飾の保持、危険なHTMLの除去、GA4初期化の回帰テスト4件。
- test:headers：全HTMLのCSPハッシュ、Cloudflareの制限、フレーム/MIME保護のテスト3件。
- lint：エラー0。既存のアンカー遷移・effect等について警告5件あり。表示や動作を変えないため保持。
- サイトマップとrobots.txtはNext.js 16の静的出力要件に合わせforce-staticを指定。
- ビルド後は必ずout/_headersが存在することを確認。npm run buildが自動生成する。

## 公開前後の確認

1. 差分レビューとGitHub mainへのマージ。
2. VISIONのCloudflareアカウントとPagesプロジェクトvision-personal-gymを確認。
3. このブランチの出力だけを使用し、解析管理画面等の未コミット作業を混ぜない。
4. npm run buildと上記チェックを実行。
5. VISIONの認証後、wrangler pages deploy out --project-name=vision-personal-gym --branch=mainで公開。
6. pt-vision.comの各ページ・記事・写真・地図・LINE/電話/メール・GA4の読み込み、CSPヘッダーを確認。
7. 問題があればCloudflare Pagesの直前の本番デプロイにロールバックする。

Cloudflare Pagesでは_headersは静的ファイルへのレスポンスに適用される。
将来Pages Functionsを追加する際は、Functionsのレスポンス側にも必要な保護を設定する。

## 管理画面で別途確認する事項

- microCMS APIキーは従来からブラウザに渡る設計。公開に必要なAPIのGET権限だけに絞られているか、下書き閲覧権限やWRITE権限がないかを管理画面で確認する。権限はコードだけでは確定できず、今回は変更していない。
- GitHub / Cloudflare / microCMS / ドメイン管理者の二要素認証と復旧方法。
- 旧Vercel環境の扱い。今回の変更の公開対象は現行Cloudflareのみ。
- CSPにない新しい外部埋め込み等を追加する場合、用途を確認して許可先を追加する。

## PHPの話題との関係

2026-10-21にPHP公式が公表したCVE-2026-109618 / CVE-2026-109619は、Webリクエストを処理するPHPが対象。
このサイトはNext.jsの静的出力をCloudflare Pagesで配信し、PHPを使わないため、そのPHP更新は本サイトの作業対象ではない。
ただしNext.js自身にも継続的な更新が必要なので、サポート中の修正版へ更新した。

参考：
- https://www.php.net/archive/2026.php
- https://nextjs.org/support-policy
- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://developers.cloudflare.com/pages/configuration/headers/
- https://document.microcms.io/content-api/x-microcms-api-key
