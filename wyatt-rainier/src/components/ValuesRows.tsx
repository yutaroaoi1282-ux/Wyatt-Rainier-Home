import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";
import {
  BeautyIcon,
  FitIcon,
  UnityIcon,
  IntuitionIcon,
  FeatherIcon,
} from "./icons";

const VALUE_ICONS = [BeautyIcon, FitIcon, UnityIcon, IntuitionIcon, FeatherIcon];

type ValueItem = { no: string; en: string; title: string; body: string };

/**
 * 開発原則(5)の行リスト。
 * 同じ列を揃え続けた「表」の体裁で、カード羅列と差別化する。
 */
export default async function ValuesRows({
  compact = false,
}: {
  compact?: boolean;
}) {
  const t = await getTranslations("values");
  const items = t.raw("items") as ValueItem[];

  return (
    <div className="border-b border-line">
      {items.map((v, i) => {
        const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
        return (
          <Reveal key={v.no} delay={i * 70} y={16}>
            <article className="group grid grid-cols-[44px_1fr] items-start gap-x-4 border-t border-line py-6 transition-colors duration-300 hover:bg-mist/70 md:grid-cols-[72px_56px_minmax(180px,240px)_1fr] md:items-center md:gap-x-8 md:py-7">
              <span className="pt-0.5 text-[12px] tracking-[0.2em] text-ink-soft transition-colors duration-300 group-hover:text-fjord md:pt-0">
                {v.no}
              </span>
              <span className="hidden text-navy/70 transition-colors duration-300 group-hover:text-fjord md:block">
                <Icon size={26} />
              </span>
              <h3 className="text-[1.1rem] font-bold text-navy md:text-[1.25rem]">
                {v.title}
                <span className="mt-1 block text-[9.5px] font-medium tracking-[0.28em] text-ink-soft">
                  {v.en}
                </span>
              </h3>
              <p
                className={`col-span-2 text-[14px] leading-[1.95] text-ink-soft md:col-span-1 ${
                  compact ? "md:line-clamp-2" : ""
                }`}
              >
                {v.body}
              </p>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
