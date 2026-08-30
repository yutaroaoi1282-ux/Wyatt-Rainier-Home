import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Mask, Reveal } from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import MountainMark from "@/components/MountainMark";
import { ArrowRightIcon } from "@/components/icons";

const EMBLEM_IMG =
  "https://images.pexels.com/photos/5620368/pexels-photo-5620368.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=1050";

export default async function HomePage() {
  const t = await getTranslations("home");
  const th = await getTranslations("hero");
  const ts = await getTranslations("site");
  const news = (await getTranslations("news")).raw("items") as {
    date: string;
    tag: string;
    title: string;
  }[];
  const stats = t.raw("stats") as { label: string; value: string }[];
  const facts = t.raw("emblem.facts") as [string, string][];

  return (
    <>
      {/* ============ ヒーロー(背景:レーニア山、控えめ) ============ */}
      <section
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white"
        aria-label="Wyatt Rainier"
      >
        <Image
          src="/images/wyatt_hero_bg.png"
          alt={th("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="anim-kenburns object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/45 to-white"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-[1180px] flex-1 flex-col items-center justify-center px-5 pb-16 pt-28 text-center md:pt-32">
          <Reveal delay={80} y={10}>
            <MountainMark className="mx-auto h-28 w-40 md:h-32 md:w-44" tone="dark" />
          </Reveal>
          <Reveal delay={180} y={8}>
            <p className="mt-5 font-brand text-[clamp(2.5rem,7vw,4.4rem)] font-semibold leading-none tracking-[0.01em] text-navy">
              {ts("name")}
            </p>
          </Reveal>
          <h1 className="mt-8 text-[clamp(1.35rem,3.2vw,2rem)] font-bold leading-[1.75] text-navy">
            <Mask delay={420}>{th("visionA")}</Mask>
            <Mask delay={560}>{th("visionB")}</Mask>
          </h1>
          <Reveal delay={780}>
            <span className="mx-auto mt-10 block h-px w-14 bg-glacier" aria-hidden="true" />
          </Reveal>
        </div>

        <div className="relative flex px-6 pb-8 md:px-10">
          <p className="flex items-center gap-3 text-[10px] tracking-[0.32em] text-ink-soft">
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="anim-cue absolute inset-0 bg-fjord/70" aria-hidden="true" />
            </span>
            {th("scroll")}
          </p>
        </div>
      </section>

      {/* ============ 会社紹介 ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-6">
          <SectionHead lines={[t("company.title")]} />
          <Reveal delay={140}>
            <blockquote className="mt-10 max-w-[860px] border-l-2 border-glacier pl-6 md:pl-9">
              <p className="text-[1.02rem] font-normal leading-[2.15] text-ink md:text-[1.12rem]">
                {t("company.quote")}
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={220}>
            <dl className="mt-16 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white p-6 md:p-7">
                  <dt className="text-[12.5px] font-medium text-ink-soft">{s.label}</dt>
                  <dd className="mt-3 text-[2.1rem] font-bold leading-none text-navy">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ============ 象徴:レーニア山 ============ */}
      <section className="border-y border-line bg-mist py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <span
                className="absolute -left-3 -top-3 h-full w-full border border-glacier/60"
                aria-hidden="true"
              />
              <Image
                src={EMBLEM_IMG}
                alt={t("emblem.imageAlt")}
                width={1400}
                height={1050}
                className="relative aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <p className="mt-3 text-[9.5px] tracking-[0.22em] text-ink-soft">
                {t("emblem.caption")}
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHead lines={[t("emblem.titleA"), t("emblem.titleB")]} />
            <Reveal delay={140}>
              <blockquote className="mt-8 border-l-2 border-fjord bg-white p-6 text-[15.5px] font-bold leading-[2] text-navy">
                {t("emblem.quote")}
              </blockquote>
              <p className="lede mt-6 text-[14px] text-ink-soft">
                {t("emblem.description")}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <dl className="mt-8 grid grid-cols-3 gap-px border border-line bg-line">
                {facts.map(([dt, dd]) => (
                  <div key={dt} className="bg-mist p-4 text-center md:p-5">
                    <dt className="text-[9.5px] tracking-[0.24em] text-ink-soft">{dt}</dt>
                    <dd className="mt-2 text-[15px] font-bold text-navy">{dd}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/about#rainier"
                className="group mt-7 inline-flex items-center gap-2.5 text-[12.5px] font-medium text-fjord"
              >
                <span className="link-underline">{t("emblem.more")}</span>
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ お知らせ ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead lines={[t("news.title")]} />
              <Reveal delay={120}>
                <p className="mt-6 max-w-[280px] text-[13px] leading-[1.9] text-ink-soft">
                  {t("news.description")}
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ol className="border-b border-line">
              {news.map((n, i) => (
                <Reveal key={n.title} delay={i * 60} y={14}>
                  <li className="border-t border-line">
                    <article className="group grid grid-cols-[92px_1fr] gap-x-5 gap-y-2 py-6 transition-colors duration-300 hover:bg-mist/60 sm:grid-cols-[110px_72px_1fr_24px] sm:items-center sm:gap-x-6">
                      <time
                        dateTime={n.date.replace(/\./g, "-")}
                        className="text-[11.5px] tracking-[0.1em] text-ink-soft"
                      >
                        {n.date}
                      </time>
                      <p className="hidden sm:block">
                        <span className="inline-block border border-line px-2 py-1 text-[9.5px] tracking-[0.18em] text-ink-soft transition-colors group-hover:border-fjord group-hover:text-fjord">
                          {n.tag}
                        </span>
                      </p>
                      <h3 className="col-span-2 text-[14.5px] leading-[1.85] text-ink transition-colors group-hover:text-navy sm:col-span-1">
                        {n.title}
                      </h3>
                      <ArrowRightIcon
                        size={16}
                        className="hidden text-glacier transition-transform duration-300 group-hover:translate-x-1.5 sm:block"
                      />
                    </article>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ お問い合わせ誘導 ============ */}
      <section className="relative overflow-hidden border-t border-line bg-mist">
        <MountainMark
          tone="ghost"
          className="pointer-events-none absolute -bottom-16 -left-10 h-80 w-[26rem] opacity-70"
        />
        <div className="relative mx-auto flex max-w-[1180px] flex-col gap-10 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-24">
          <div>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.2rem)] font-bold leading-[1.5] text-navy">
              {t("contact.titleA")}
              <br />
              {t("contact.titleB")}
            </h2>
            <p className="lede mt-5 max-w-[460px] text-[14px] text-ink-soft">
              {t("contact.description")}
            </p>
          </div>
          <Reveal delay={120}>
            <div className="flex flex-col gap-4 sm:flex-row md:flex-col lg:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium tracking-[0.24em] text-white transition-colors duration-300 hover:bg-rainier"
              >
                {t("contact.form")}
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href={`mailto:${ts("email")}`}
                className="inline-flex items-center justify-center gap-3 border border-navy/40 px-8 py-4 text-[12px] font-medium tracking-[0.24em] text-navy transition-colors duration-300 hover:border-navy"
              >
                {ts("email")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
