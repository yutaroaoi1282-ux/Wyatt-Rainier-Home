import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { Mask, Reveal } from "@/components/Reveal";
import MountainMark from "@/components/MountainMark";
import ValuesRows from "@/components/ValuesRows";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Wyatt's vision, philosophy, founding story, and why Mount Rainier is our emblem.",
};

const IMG = {
  office:
    "https://images.pexels.com/photos/15543037/pexels-photo-15543037.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800",
  rainierFull:
    "https://images.pexels.com/photos/31203334/pexels-photo-31203334.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=900",
};

type TimelineItem = { year: string; title: string; body: string };

export default async function AboutPage() {
  const t = await getTranslations("about");
  const timeline = t.raw("timeline") as TimelineItem[];
  const profileRows = t.raw("profile.rows") as [string, string][];
  const rainierFacts = t.raw("rainier.facts") as [string, string][];

  return (
    <>
      <PageHero
        crumb={t("crumb")}
        lines={[t("titleA"), t("titleB")]}
        lede={t("lede")}
        meta={t.raw("meta") as string[]}
      />

      {/* ============ ビジョン ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead lines={[t("vision.title")]} />
          </div>
          <div className="lg:col-span-8">
            <blockquote className="border-l-2 border-glacier pl-6 md:pl-9">
              <Mask>
                <p className="text-[clamp(1.4rem,3.2vw,2.1rem)] font-bold leading-[1.7] text-navy">
                  {t("vision.quoteA")}
                  <br className="hidden md:block" />
                  {t("vision.quoteB")}
                </p>
              </Mask>
            </blockquote>
            <Reveal delay={150}>
              <p className="lede mt-8 text-[15px] text-ink">{t("vision.p1")}</p>
              <p className="lede mt-5 text-[15px] text-ink">{t("vision.p2")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 想い ============ */}
      <section className="border-y border-line bg-mist py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-6">
          <SectionHead lines={[t("philosophy.title")]} />
          <Reveal delay={120}>
            <figure className="mx-auto mt-12 max-w-[780px] text-center">
              <span
                className="text-[4.6rem] leading-none text-glacier/60"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="-mt-6 text-[clamp(1.05rem,2.2vw,1.35rem)] font-normal leading-[2.15] text-ink">
                {t("philosophy.quoteA")}
              </blockquote>
              <blockquote className="mt-7 text-[clamp(1.05rem,2.2vw,1.35rem)] font-normal leading-[2.15] text-rainier">
                {t("philosophy.quoteB")}
              </blockquote>
              <figcaption className="mt-9 text-[10px] tracking-[0.28em] text-ink-soft">
                {t("philosophy.source")}
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-16">
            <Reveal>
              <h3 className="text-[1.3rem] font-bold text-navy">
                {t("philosophy.detailsTitle")}
              </h3>
            </Reveal>
            <div className="mt-6">
              <ValuesRows />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 創業ストーリー(スティッキー 2 段) ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead lines={[t("story.titleA")]} />
              <Mask delay={260}>
                <h3 className="mt-2 text-[clamp(1.5rem,3.2vw,2.2rem)] font-bold leading-[1.4] text-navy">
                  {t("story.titleB")}
                </h3>
              </Mask>
              <Reveal delay={200}>
                <p className="lede mt-6 max-w-[400px] text-[14px] text-ink-soft">
                  {t("story.description")}
                </p>
              </Reveal>
              <Reveal delay={280}>
                <div className="relative mt-8 hidden lg:block">
                  <span
                    className="absolute -left-3 -top-3 h-full w-full border border-glacier/60"
                    aria-hidden="true"
                  />
                  <Image
                    src={IMG.office}
                    alt={t("story.imageAlt")}
                    width={1200}
                    height={800}
                    className="relative aspect-[3/2] w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                  <p className="mt-3 text-[9.5px] tracking-[0.2em] text-ink-soft">
                    {t("story.imageCaption")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <ol className="relative lg:col-span-7">
            <span
              className="absolute bottom-4 left-[3px] top-4 w-px bg-line"
              aria-hidden="true"
            />
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 60} y={16}>
                <li className="relative pb-12 pl-10 last:pb-0 md:pl-14">
                  <span
                    className="absolute left-0 top-[7px] h-[7px] w-[7px] bg-fjord"
                    aria-hidden="true"
                  />
                  <p className="text-[12px] tracking-[0.22em] text-fjord">
                    {item.year}
                  </p>
                  <h3 className="mt-2.5 text-[1.15rem] font-bold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[520px] text-[14px] leading-[2] text-ink-soft">
                    {item.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ レーニア山 ============ */}
      <section id="rainier" className="relative border-t border-line bg-abyss text-white">
        <div className="relative h-[46vh] min-h-[300px] overflow-hidden md:h-[56vh]">
          <Image
            src={IMG.rainierFull}
            alt={t("rainier.imageAlt")}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-transparent to-abyss"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto max-w-[1180px] px-5 pb-24 pt-14 md:px-6 md:pb-32 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                tone="light"
                lines={[t("rainier.titleA"), t("rainier.titleB")]}
              />
              <Reveal delay={140}>
                <dl className="mt-10 divide-y divide-navy border-y border-navy">
                  {rainierFacts.map(([dt, dd]) => (
                    <div
                      key={dt}
                      className="flex items-baseline justify-between gap-6 py-4"
                    >
                      <dt className="shrink-0 text-[10.5px] tracking-[0.22em] text-glacier">
                        {dt}
                      </dt>
                      <dd className="text-right text-[13.5px] leading-relaxed text-white/90">
                        {dd}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <blockquote className="border-l-2 border-glacier bg-navy/60 p-7 text-[16.5px] font-bold leading-[2.05] text-white">
                  {t("rainier.quote")}
                </blockquote>
              </Reveal>
              <Reveal delay={150}>
                <p className="lede mt-8 text-[14.5px] text-white/80">{t("rainier.p1")}</p>
                <p className="lede mt-5 text-[14.5px] text-white/80">{t("rainier.p2")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-10 flex items-center gap-4">
                  <MountainMark className="h-12 w-16" tone="light" ariaHidden={false} />
                  <p className="text-[10px] leading-[1.9] tracking-[0.2em] text-glacier/85">
                    {t("rainier.markCaption")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 会社概要 ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHead lines={[t("profile.title")]} />
            <Reveal delay={140}>
              <p className="mt-6 max-w-[280px] text-[13px] leading-[1.9] text-ink-soft">
                {t("profile.description")}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <dl className="border-b border-line">
                {profileRows.map(([dt, dd]) => (
                  <div
                    key={dt}
                    className="grid grid-cols-[110px_1fr] gap-4 border-t border-line py-4 md:grid-cols-[160px_1fr]"
                  >
                    <dt className="text-[11px] tracking-[0.14em] text-ink-soft">
                      {dt}
                    </dt>
                    <dd className="text-[14px] leading-[1.9] text-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 導線 ============ */}
      <section className="border-t border-line bg-mist">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-6">
          <h2 className="text-[clamp(1.3rem,2.8vw,1.8rem)] font-bold leading-[1.5] text-navy">
            {t("cta.titleA")}
            <br />
            {t("cta.titleB")}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 bg-navy px-7 py-3.5 text-[11.5px] font-medium tracking-[0.22em] text-white transition-colors duration-300 hover:bg-rainier"
            >
              {t("cta.products")}
              <ArrowRightIcon
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-navy/40 px-7 py-3.5 text-[11.5px] font-medium tracking-[0.22em] text-navy transition-colors duration-300 hover:border-navy"
            >
              {t("cta.contact")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
