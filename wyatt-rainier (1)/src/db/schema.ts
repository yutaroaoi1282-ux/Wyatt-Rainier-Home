import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

/**
 * お問い合わせフォームの送信データ。
 * 送信都度に INSERT し、確認画面に参照番号を返す。
 */
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  agree: boolean("agree").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
