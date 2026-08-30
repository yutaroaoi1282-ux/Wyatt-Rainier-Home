"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon } from "./icons";

/** URL の ?subject= で渡されるキー */
const SUBJECT_KEYS = ["download", "report", "business", "other"] as const;

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm({
  initialSubject = "",
}: {
  initialSubject?: string;
}) {
  const t = useTranslations("contact.form");

  const subjects = t.raw("subjects") as string[];
  const initialIndex = SUBJECT_KEYS.indexOf(
    initialSubject as (typeof SUBJECT_KEYS)[number]
  );
  const [subjectIndex, setSubjectIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const subject = subjects[subjectIndex] ?? subjects[0];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [website, setWebsite] = useState(""); // ハネポット(スパム対策・非表示)
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [refNo, setRefNo] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (website) return; // ボットと判断して無言で終了
    if (!name.trim()) return setError(t("errorName"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      return setError(t("errorEmail"));
    if (message.trim().length < 10) return setError(t("errorMsg"));
    if (!agree) return setError(t("errorAgree"));

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, agree }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("submit failed");
      setRefNo(data.ref);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-line bg-white p-8" role="status">
        <span className="inline-flex h-11 w-11 items-center justify-center border border-fjord text-fjord">
          <CheckIcon size={22} />
        </span>
        <h2 className="mt-5 text-[1.3rem] font-bold text-navy">
          {t("doneTitle")}
        </h2>
        <p className="lede mt-4 text-[14px] text-ink">{t("doneBody")}</p>
        <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[12px] tracking-[0.06em] text-ink-soft">
          <div className="flex gap-4">
            <dt className="w-28 shrink-0">{t("refLabel")}</dt>
            <dd className="font-medium text-rainier">{refNo}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-28 shrink-0">{t("toLabel")}</dt>
            <dd>{email}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-28 shrink-0">{t("subjectLabel")}</dt>
            <dd>{subject}</dd>
          </div>
        </dl>
        <p className="mt-6 text-[12.5px] leading-relaxed text-ink-soft">
          {t("urgentNote")}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-line bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/55 transition-colors focus:border-fjord focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-line bg-white p-6 md:p-8"
    >
      <h2 className="text-[1.25rem] font-bold text-navy">{t("title")}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
        {t("description")}
      </p>

      <div className="mt-6 space-y-5">
        {/* ハネポット: 人は見えない・ボットだけが埋める */}
        <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
          <label>
            Do not fill this field
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="cf-name"
              className="mb-2 block text-[12.5px] font-medium text-navy"
            >
              {t("name")} <span className="text-rainier">*</span>
            </label>
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              placeholder={t("namePlaceholder")}
              required
            />
          </div>
          <div>
            <label
              htmlFor="cf-email"
              className="mb-2 block text-[12.5px] font-medium text-navy"
            >
              {t("email")} <span className="text-rainier">*</span>
            </label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder={t("emailPlaceholder")}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cf-subject"
            className="mb-2 block text-[12.5px] font-medium text-navy"
          >
            {t("subject")} <span className="text-rainier">*</span>
          </label>
          <select
            id="cf-subject"
            value={subjectIndex}
            onChange={(e) => setSubjectIndex(Number(e.target.value))}
            className={`${inputCls} select-arrow pr-10`}
          >
            {subjects.map((s, i) => (
              <option key={s} value={i}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="cf-message"
            className="mb-2 block text-[12.5px] font-medium text-navy"
          >
            {t("message")} <span className="text-rainier">*</span>
          </label>
          <textarea
            id="cf-message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputCls} resize-y`}
            placeholder={t("messagePlaceholder")}
            required
          />
        </div>

        <div className="border-t border-line pt-5">
          <label className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-relaxed text-ink">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#175a7d]"
              required
            />
            <span>
              {t("agree")} <span className="text-rainier">*</span>
            </span>
          </label>
        </div>

        {error && (
          <p
            className="border border-rainier/30 bg-mist px-4 py-3 text-[13px] text-rainier"
            role="alert"
          >
            {error}
          </p>
        )}
        {status === "error" && (
          <p
            className="border border-rainier/30 bg-mist px-4 py-3 text-[13px] text-rainier"
            role="alert"
          >
            {t("errorNetwork")}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-full items-center justify-center gap-3 bg-navy px-8 py-4 text-[12.5px] font-medium tracking-[0.22em] text-white transition-colors duration-300 hover:bg-rainier disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t("sending") : t("submit")}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </form>
  );
}
