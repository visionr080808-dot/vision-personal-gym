// microCMSの「results」API（実績ページ）から取得するデータ型。
// クライアント側（ブラウザ）で直接fetchする方式のため、
// 戸田さんがmicroCMSで公開ボタンを押すと再デプロイ不要で即反映される。

export type ResultItem = {
  id: string;
  title: string;
  category?: string;
  period?: string;
  comment?: string;
  beforeImage?: { url: string; width: number; height: number };
  afterImage?: { url: string; width: number; height: number };
  publishedAt: string;
};

type MicroCmsListResponse = {
  contents: ResultItem[];
};

const SERVICE_DOMAIN = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

export const microCmsConfigured = Boolean(SERVICE_DOMAIN && API_KEY);

export async function fetchResults(): Promise<ResultItem[]> {
  if (!microCmsConfigured) return [];

  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/results?limit=100&orders=-publishedAt`,
    { headers: { "X-MICROCMS-API-KEY": API_KEY as string } }
  );
  if (!res.ok) return [];

  const data: MicroCmsListResponse = await res.json();
  return data.contents ?? [];
}
