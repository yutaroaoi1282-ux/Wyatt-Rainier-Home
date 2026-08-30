# Wyatt Rainier — Vercel デプロイ手順

このリポジトリは **Next.js(App Router)** 用に設定されています。`vercel.json` で Next.js を明示しているため、Vercel が安全にサーバーレスAPI・画像最適化・ロケールルーティングを構成します。

## Vercel Dashboard の設定

| 項目 | 設定値 |
| --- | --- |
| Framework Preset | **Next.js** (推奨。`Other` ではなく選択) |
| Root Directory | `./` (空欄でも可) |
| Build Command | `npm run build` |
| Output Directory | **空欄** (設定しない) |
| Install Command | `npm install` |
| Include files outside the root directory | オフ |

> `public` や `.` を Output Directory に指定すると、Next.js のサーバー機能・`/api/contact`・画像最適化が動作しなくなります。Output Directory は必ず空欄にしてください。

## 必須の環境変数

Vercel Dashboard の **Settings > Environment Variables** に次を追加してください。

| 変数名 | 値 | 対象環境 |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL接続URL | Production / Preview (必要に応じて Development) |

接続URL例:

```text
postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

- Neon / Supabase / Vercel Postgres 等の **SSL対応 PostgreSQL** を利用してください。
- 値はリポジトリに書き込まず、必ず Vercel の環境変数画面で設定してください。
- `DATABASE_URL` がない場合でもページのビルド・公開は可能です。ただし連絡フォーム(`/api/contact`)は `503 database-not-configured` を返します。

## DBテーブルを作成する

デプロイ前または `DATABASE_URL` をProduction DBへ向けた状態で、ローカルから次を一度実行してください。

```bash
npx drizzle-kit push
```

これにより連絡フォーム用の `contact_messages` テーブルが作成されます。

## 公開後の確認

- `/ja` — 日本語ホーム
- `/en` — 英語ホーム
- `/ja/products` / `/en/products` — VisionAir 紹介
- `/ja/contact` / `/en/contact` — お問い合わせフォーム
- `/api/health` — DB接続確認。接続できれば `{ "ok": true, "database": "connected" }` が返ります。

## 補足

- Vercelの環境ではDBプールを最大1接続に制限し、Serverless Function の接続数増加を抑えています。
- `src/proxy.ts` は Next.js 16 の Proxy 規約に沿って、`/` から `/ja` への誘導と日英ルーティングを処理します。
