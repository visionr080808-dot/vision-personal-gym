// microCMSの各APIから取得するデータ型。
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

export type AchievementItem = {
  id: string;
  title: string;
  category?: string; // 大会実績 / スポーツ経歴 / 学歴 / 資格
  year?: string;
  description?: string;
  publishedAt: string;
};

type MicroCmsListResponse<T> = {
  contents: T[];
};

const SERVICE_DOMAIN = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

export const microCmsConfigured = Boolean(SERVICE_DOMAIN && API_KEY);

async function fetchList<T>(endpoint: string): Promise<T[]> {
  if (!microCmsConfigured) return [];

  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?limit=100&orders=-publishedAt`,
    { headers: { "X-MICROCMS-API-KEY": API_KEY as string } }
  );
  if (!res.ok) return [];

  const data: MicroCmsListResponse<T> = await res.json();
  return data.contents ?? [];
}

export function fetchResults(): Promise<ResultItem[]> {
  return fetchList<ResultItem>("results");
}

export function fetchAchievements(): Promise<AchievementItem[]> {
  return fetchList<AchievementItem>("achievements");
}
