import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import MountainMark from "@/components/MountainMark";
import {
  ArrowRightIcon,
  CheckIcon,
  CloudOffIcon,
  LayoutIcon,
  PresentIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Products — VisionAir",
  description:
    "VisionAir is a free slide application. Starts in 0.9 seconds, auto-layout, offline editing, shared with a single link.",
};

const USECASE_IMGS: { src: string; alt: string }[] = [
  {
    src: "https://images.pexels.com/photos/3184171/pexels-photo-3184171.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=700",
    alt: "Meeting where people check a laptop screen together",
  },
  {
    src: "https://images.pexels.com/photos/8145248/pexels-photo-8145248.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=700",
    alt: "Training session reviewing shared materials",
  },
  {
    src: "https://images.pexels.com/photos/5424635/pexels-photo-5424635.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=700",
    alt: "A person working with a laptop and documents at a desk",
  },
];

const EXTRA_ICONS = {
  present: PresentIcon,
  cloud: CloudOffIcon,
  layout: LayoutIcon,
} as const;

/** 特徴ごとのミニビジュアル(CSS 構築) */
function FeatureVisual({ no }: { no: string }) {
  if (no === "01") {
    return (
      <div className="flex h-full flex-col justify-center border border-line bg-white p-8">
        <p className="text-[10px] tracking-[0.28em] text-ink-soft">STARTUP TIME</p>
        <p className="mt-3 text-[3.2rem] font-bold leading-none text-navy">
          0.9<span className="text-[1.5rem]">sec</span>
        </p>
        <div className="mt-7 space-y-4">
          {[
            { label: "VisionAir", w: "18%", time: "0.9s", accent: true },
            { label: "Slide software A", w: "62%", time: "4.3s", accent: false },
            { label: "Slide software B", w: "48%", time: "3.1s", accent: false },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between text-[11.5px] text-ink-soft">
                <span className={r.accent ? "font-bold text-navy" : ""}>{r.label}</span>
                <span className="text-[10px]">{r.time}</span>
              </div>
              <div className="mt-1.5 h-[7px] bg-mist">
                <div
                  className={r.accent ? "h-full bg-fjord" : "h-full bg-glacier/60"}
                  style={{ width: r.w }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[9px] leading-[1.8] tracking-[0.1em] text-ink-soft/80">
          * Measured on a 2021 i5 / 8GB laptop
        </p>
      </div>
    );
  }

  if (no === "02") {
    return (
      <div className="grid h-full grid-cols-2 gap-4 border border-line bg-white p-6">
        <div className="flex flex-col">
          <p className="text-[9.5px] tracking-[0.24em] text-ink-soft">BEFORE</p>
          <div className="mt-3 flex-1 space-y-2 border border-dashed border-line p-3">
            <div className="h-[9px] w-[68%] bg-glacier/40" />
            <div className="ml-6 h-[9px] w-[40%] bg-glacier/40" />
            <div className="h-[9px] w-[88%] bg-glacier/40" />
            <div className="ml-3 h-[9px] w-[52%] bg-glacier/40" />
            <div className="mt-4 h-10 w-[60%] bg-ice" />
            <div className="h-[9px] w-[35%] bg-glacier/40" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[9.5px] tracking-[0.24em] text-fjord">AUTO-LAYOUT</p>
          <div className="mt-3 flex-1 border border-fjord/50 bg-mist/50 p-3">
            <div className="h-[11px] w-full bg-navy" />
            <div className="mt-2 h-[6px] w-3/4 bg-glacier/70" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-10 bg-white shadow-sm" />
              <div className="h-10 bg-white shadow-sm" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-[5px] w-full bg-glacier/50" />
              <div className="h-[5px] w-5/6 bg-glacier/50" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-5 border border-line bg-white p-8">
      <div className="flex items-center justify-between gap-3 border border-fjord/50 bg-mist/60 px-4 py-3">
        <span className="truncate text-[12px] tracking-[0.04em] text-navy">
          wyatt.app/s/q3-review
        </span>
        <span className="shrink-0 border border-navy bg-navy px-3 py-1.5 text-[9.5px] tracking-[0.18em] text-white">
          COPY
        </span>
      </div>
      <div className="space-y-3 text-[12.5px] text-ink">
        <p className="flex items-center gap-3">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-fjord" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-fjord" />
          </span>
          View only (default)
        </p>
        <p className="flex items-center gap-3 text-ink-soft">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-line" aria-hidden="true" />
          Allow download
        </p>
      </div>
      <p className="border-t border-line pt-4 text-[9.5px] leading-[1.9] tracking-[0.1em] text-ink-soft">
        Two permissions only. No hesitation by design.
      </p>
    </div>
  );
}

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const tf = await getTranslations("products.features");
  type FeatureItem = {
    no: string;
    title: string;
    en: string;
    description: string;
    points: string[];
  };
  const features: FeatureItem[] = [
    tf.raw("feature1") as FeatureItem,
    tf.raw("feature2") as FeatureItem,
    tf.raw("feature3") as FeatureItem,
  ];
  const extras = t.raw("extra") as { title: string; description: string; icon: string }[];
  const cases = t.raw("useCases.cases") as {
    no: string;
    title: string;
    caption: string;
    description: string;
  }[];
  const specRows = t.raw("specs.rows") as [string, string][];

  return (
    <>
      <PageHero
        crumb={t("crumb")}
        lines={[t("title"), t("subtitle")]}
        lede={t("lede")}
        meta={t.raw("meta") as string[]}
      />

      {/* ============ 製品概要 ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead
              lines={[t("overview.titleA"), t("overview.titleB")]}
            />
            <Reveal delay={140}>
              <p className="lede mt-8 text-[15px] text-ink">{t("overview.p1")}</p>
              <p className="lede mt-5 text-[15px] text-ink">{t("overview.p2")}</p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact?subject=download"
                  className="group inline-flex items-center gap-3 bg-navy px-7 py-3.5 text-[12px] font-medium tracking-[0.22em] text-white transition-colors duration-300 hover:bg-rainier"
                >
                  {t("overview.download")}
                  <ArrowRightIcon
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="#spec"
                  className="inline-flex items-center gap-3 border border-navy/40 px-7 py-3.5 text-[12px] font-medium tracking-[0.22em] text-navy transition-colors duration-300 hover:border-navy"
                >
                  {t("overview.specs")}
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="relative">
                <span
                  className="absolute -left-3 -top-3 h-full w-full border border-glacier/60"
                  aria-hidden="true"
                />
                <Image
                  src="/images/wyatt_visionair.jpg"
                  alt={t("overview.imageAlt")}
                  width={1400}
                  height={1000}
                  className="relative w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <p className="mt-3 text-[9.5px] tracking-[0.2em] text-ink-soft">
                  {t("overview.imageCaption")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ 特徴 ============ */}
      <section className="border-y border-line bg-mist py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-6">
          <SectionHead lines={[t("features.titleA"), t("features.titleB")]} />

          <div className="mt-14 space-y-20 md:space-y-24">
            {features.map((f, i) => (
              <article
                key={f.no}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                <Reveal className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <FeatureVisual no={f.no} />
                </Reveal>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal delay={80}>
                    <p className="flex items-baseline gap-4">
                      <span className="text-[12px] tracking-[0.22em] text-fjord">{f.no}</span>
                      <span className="text-[10px] tracking-[0.28em] text-ink-soft">
                        {f.en}
                      </span>
                    </p>
                    <h3 className="mt-3 text-[1.5rem] font-bold leading-[1.4] text-navy md:text-[1.7rem]">
                      {f.title}
                    </h3>
                    <p className="lede mt-5 text-[14.5px] text-ink">{f.description}</p>
                  </Reveal>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[13.5px] text-ink-soft">
                        <CheckIcon size={15} className="mt-1 shrink-0 text-fjord" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 grid gap-px border border-line bg-line md:grid-cols-3">
            {extras.map((e, i) => {
              const Icon = EXTRA_ICONS[(e.icon as keyof typeof EXTRA_ICONS) ?? "present"];
              return (
                <Reveal key={e.title} delay={i * 90}>
                  <div className="h-full bg-white p-7 transition-colors duration-300 hover:bg-mist/60">
                    <span className="text-rainier">
                      <Icon size={26} />
                    </span>
                    <h4 className="mt-4 text-[1.05rem] font-bold text-navy">{e.title}</h4>
                    <p className="mt-2.5 text-[13px] leading-[1.9] text-ink-soft">{e.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 使う人 ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-6">
          <SectionHead lines={[t("useCases.title")]} />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {cases.map((u, i) => (
              <Reveal key={u.no} delay={i * 90}>
                <article className="group h-full bg-white">
                  <div className="relative aspect-[10/7] overflow-hidden">
                    <Image
                      src={USECASE_IMGS[i].src}
                      alt={USECASE_IMGS[i].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                    <span className="absolute left-4 top-4 bg-abyss/70 px-2.5 py-1 text-[9.5px] tracking-[0.24em] text-white">
                      {u.no}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[1.1rem] font-bold text-navy">{u.title}</h3>
                    <p className="mt-1 text-[10px] tracking-[0.18em] text-fjord">{u.caption}</p>
                    <p className="mt-3.5 text-[13px] leading-[1.95] text-ink-soft">{u.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 仕様 + 料金(無料) ============ */}
      <section id="spec" className="border-t border-line bg-navy py-24 text-white md:py-32">
        <div className="mx-auto max-w-[1180px] px-5 md:px-6">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead tone="light" lines={[t("specs.title")]} />
              <Reveal delay={120}>
                <dl className="mt-10 divide-y divide-navy border-y border-navy">
                  {specRows.map(([dt, dd]) => (
                    <div key={dt} className="grid grid-cols-[96px_1fr] items-baseline gap-4 py-3.5">
                      <dt className="text-[10px] tracking-[0.2em] text-glacier">{dt}</dt>
                      <dd className="text-[13px] leading-relaxed text-white/90">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <SectionHead tone="light" lines={[t("pricing.title")]} />
              <Reveal delay={140}>
                <div className="mt-10 border border-glacier bg-rainier/35 p-8 md:p-10">
                  <p className="text-[2.6rem] font-bold leading-none md:text-[3.2rem]">
                    {t("pricing.price")}
                  </p>
                  <p className="lede mt-4 max-w-[420px] text-[14px] text-white/90">
                    {t("pricing.description")}
                  </p>
                  <p className="mt-3 max-w-[420px] text-[12.5px] leading-[1.9] text-white/65">
                    {t("pricing.note")}
                  </p>
                  <Link
                    href="/contact?subject=download"
                    className="group mt-8 inline-flex items-center gap-3 bg-white px-7 py-3.5 text-[12px] font-medium tracking-[0.22em] text-navy transition-colors duration-300 hover:bg-ice"
                  >
                    {t("pricing.cta")}
                    <ArrowRightIcon
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden">
        <MountainMark
          tone="ghost"
          className="pointer-events-none absolute -bottom-14 right-0 h-72 w-96 opacity-60"
        />
        <div className="relative mx-auto max-w-[1180px] px-5 py-16 md:px-6 md:py-24">
          <div className="flex flex-col gap-9 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.5rem,3.2vw,2.2rem)] font-bold leading-[1.5] text-navy">
                {t("cta.titleA")}
                <br />
                {t("cta.titleB")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact?subject=download"
                className="group inline-flex items-center gap-3 bg-navy px-8 py-4 text-[12px] font-medium tracking-[0.24em] text-white transition-colors duration-300 hover:bg-rainier"
              >
                {t("cta.download")}
                <ArrowRightIcon
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 border border-navy/40 px-8 py-4 text-[12px] font-medium tracking-[0.24em] text-navy transition-colors duration-300 hover:border-navy"
              >
                {t("cta.philosophy")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
