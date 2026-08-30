import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Wyatt. Product inquiries, bug reports, and corporate questions — replies within two business days.",
};

type FaqItem = { q: string; a: string };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string | string[] }>;
}) {
  const t = await getTranslations("contact");
  const ts = await getTranslations("site");
  const sp = await searchParams;
  const subject =
    typeof sp.subject === "string" ? decodeURIComponent(sp.subject) : "";

  const infoRows = t.raw("info") as [string, string][];
  const faqs = t.raw("faq.items") as FaqItem[];

  return (
    <>
      <PageHero
        crumb={t("crumb")}
        lines={[t("title")]}
        lede={t("lede")}
        meta={t.raw("meta") as string[]}
      />

      {/* ============ フォーム + 案内 ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm initialSubject={subject} />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="border border-line bg-white p-7">
                <span className="text-rainier">
                  <MailIcon size={26} />
                </span>
                <h3 className="mt-4 text-[1.1rem] font-bold text-navy">
                  {t("mailBox.title")}
                </h3>
                <p className="mt-2.5 text-[13px] leading-[1.9] text-ink-soft">
                  {t("mailBox.body")}
                </p>
                <a
                  href={`mailto:${ts("email")}`}
                  className="mt-4 inline-block border border-navy bg-navy px-5 py-2.5 text-[12px] font-medium tracking-[0.14em] text-white transition-colors duration-300 hover:bg-rainier"
                >
                  {ts("email")}
                </a>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-6 divide-y divide-line border border-line bg-mist/60">
                {infoRows.map(([dt, dd]) => (
                  <div key={dt} className="grid grid-cols-[104px_1fr] gap-3 px-6 py-4">
                    <dt className="text-[10.5px] leading-[1.9] tracking-[0.12em] text-ink-soft">
                      {dt}
                    </dt>
                    <dd className="text-[13px] leading-[1.9] text-ink">{dd}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 border-l-2 border-glacier bg-white/70 p-5 text-[12.5px] leading-[2] text-ink-soft">
                {t("note")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ プライバシー ============ */}
      <section id="privacy" className="border-t border-line bg-mist py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-5 md:px-6">
          <SectionHead lines={[t("privacy.title")]} />
          <Reveal delay={120}>
            <div className="mt-10 grid gap-10 border border-line bg-white p-7 md:grid-cols-2 md:p-10">
              <div className="space-y-4 text-[13.5px] leading-[2.05] text-ink">
                <p>{t("privacy.p1")}</p>
                <p>{t("privacy.p2")}</p>
              </div>
              <div className="space-y-4 text-[13.5px] leading-[2.05] text-ink">
                <p>{t("privacy.p3")}</p>
                <p className="text-[10px] leading-[1.9] tracking-[0.12em] text-ink-soft">
                  {t("privacy.enacted")} / {t("privacy.revised")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 md:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHead lines={[t("faq.title")]} />
              <Reveal delay={140}>
                <p className="mt-6 max-w-[280px] text-[13px] leading-[1.9] text-ink-soft">
                  {t("faq.description")}
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <div className="border-b border-line">
                {faqs.map((f, i) => (
                  <details key={f.q} className="group border-t border-line" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 transition-colors hover:text-rainier [&::-webkit-details-marker]:hidden">
                      <span className="text-[11px] tracking-[0.2em] text-ink-soft group-open:text-fjord">
                        Q{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[14.5px] font-medium text-navy">{f.q}</span>
                      <span className="relative block h-3.5 w-3.5 shrink-0" aria-hidden="true">
                        <span className="absolute left-0 top-1/2 h-px w-3.5 bg-fjord" />
                        <span className="absolute left-1/2 top-0 h-3.5 w-px bg-fjord transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                      </span>
                    </summary>
                    <p className="pb-6 pl-[3.4rem] pr-8 text-[13.5px] leading-[2.05] text-ink-soft md:pl-[4.2rem]">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
