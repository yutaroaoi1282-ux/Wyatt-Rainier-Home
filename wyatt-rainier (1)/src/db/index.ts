import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Vercel / ローカルのいずれでも使える PostgreSQL 接続。
 * DATABASE_URL が未設定でもビルドを失敗させず、DBを使うAPIだけが 503 を返す。
 */
const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __wyattRainierPool?: Pool;
};

function createPool() {
  if (!databaseUrl) return undefined;

  return new Pool({
    connectionString: databaseUrl,
    // Serverless Function ごとに接続を増やしすぎないための上限。
    max: process.env.VERCEL ? 1 : 10,
    idleTimeoutMillis: 5_000,
    // Vercel上、または DATABASE_SSL=true の場合だけTLSを明示的に有効化。
    ssl:
      process.env.VERCEL || process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  });
}

export const pool =
  globalForDb.__wyattRainierPool ?? createPool();

if (pool && process.env.NODE_ENV !== "production") {
  globalForDb.__wyattRainierPool = pool;
}

/** DB 接続用の環境変数が設定済みかどうか。 */
export const isDatabaseConfigured = Boolean(pool);

/**
 * Drizzle client。DATABASE_URL がない環境では null になり、
 * 呼び出し側のAPIが設定エラーを安全に返す。
 */
export const db = pool ? drizzle(pool) : null;
