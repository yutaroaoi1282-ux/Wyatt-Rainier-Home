import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const MAX_MESSAGE_LEN = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * POST /api/contact
 * お問い合わせフォームの受付。
 * 検証通过后に PostgreSQL へ保存し、ユーザーへ参照番号を返す。
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  const data = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    agree?: boolean;
  };

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const subject = (data.subject ?? "").trim();
  const message = (data.message ?? "").trim();
  const agree = data.agree === true;

  if (name.length === 0 || name.length > 100) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (subject.length === 0) {
    return NextResponse.json({ ok: false, error: "subject" }, { status: 400 });
  }
  if (message.length < 10 || message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({ ok: false, error: "message" }, { status: 400 });
  }
  if (!agree) {
    return NextResponse.json({ ok: false, error: "agree" }, { status: 400 });
  }

  if (!db) {
    return NextResponse.json(
      { ok: false, error: "database-not-configured" },
      { status: 503 }
    );
  }

  try {
    const rows = await db
      .insert(contactMessages)
      .values({ name, email, subject, message, agree })
      .returning({ id: contactMessages.id });

    // 参照番号: WY- + 時刻(base36) + 短ランダム
    const stamp = Date.now().toString(36).toUpperCase().slice(-5);
    const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
    const ref = `WY-${rows[0]?.id ?? "0"}-${stamp}${rand}`;

    return NextResponse.json({ ok: true, ref });
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
