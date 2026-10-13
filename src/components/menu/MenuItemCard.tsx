"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { MenuItem, Category } from "@/types";

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  category?: Category;
}

/* Warm gradient palettes cycled by index for items without images */
const PLACEHOLDERS = [
  { from: "#FFF3E8", to: "#FFD9B0", emoji: "☕" },
  { from: "#FFF8E1", to: "#FFE082", emoji: "🍵" },
  { from: "#FBE9E7", to: "#FFAB91", emoji: "🥤" },
  { from: "#F3E5F5", to: "#CE93D8", emoji: "🧋" },
  { from: "#E8F5E9", to: "#A5D6A7", emoji: "🍹" },
  { from: "#E3F2FD", to: "#90CAF9", emoji: "🧃" },
  { from: "#FCE4EC", to: "#F48FB1", emoji: "🍸" },
  { from: "#E0F7FA", to: "#80DEEA", emoji: "🍰" },
];

export default function MenuItemCard({ item, index, category }: MenuItemCardProps) {
  const { lang, t, isRTL } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const name = lang === "ar" ? (item.name_ar || item.name_en) : (item.name_en || item.name_ar);
  const nameSub = lang === "ar" ? item.name_en : item.name_ar;
  const description = lang === "ar" ? item.description_ar : item.description_en;

  const hasSmall = (item.price_small ?? 0) > 0;
  const hasLarge = (item.price_large ?? 0) > 0;
  const hasPrices = hasSmall || hasLarge;

  const ph = PLACEHOLDERS[index % PLACEHOLDERS.length];
  const hasImage = !!item.image && !imgError;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.55),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`menu-card bg-surface rounded-3xl overflow-hidden shadow-card border border-border flex flex-col ${
        !item.available ? "opacity-60" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ── Image / Placeholder ── */}
      <div className={`relative w-full flex-shrink-0 ${hasImage ? "h-44" : "h-32"}`}>
        {hasImage ? (
          <>
            <Image
              src={item.image!}
              alt={name}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
              unoptimized={item.image!.startsWith("data:")}
              onError={() => setImgError(true)}
              loading="lazy"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 img-overlay" />

            {/* Unavailable overlay */}
            {!item.available && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-black/70 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  {t("unavailable")}
                </span>
              </div>
            )}
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(145deg, ${ph.from}, ${ph.to})`,
            }}
          >
            <span className="text-5xl opacity-45 select-none drop-shadow-sm">{ph.emoji}</span>
          </div>
        )}

        {/* Category badge */}
        {category && (
          <div className={`absolute top-2.5 ${isRTL ? "right-2.5" : "left-2.5"}`}>
            <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
              {lang === "ar" ? category.name_ar : category.name_en}
            </span>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-3.5 flex flex-col flex-1 gap-2">
        {/* Name */}
        <div className="flex-1">
          <h3 className="font-bold text-ink text-[14px] leading-snug line-clamp-2">
            {name}
          </h3>
          {nameSub && nameSub !== name && (
            <p className="text-ink-3 text-[11px] mt-0.5 line-clamp-1">{nameSub}</p>
          )}
          {description && (
            <p className="text-ink-2 text-[11px] mt-1.5 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Prices */}
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-border/50">
          {hasSmall && (
            <div className="flex flex-col items-start gap-0">
              <span className="text-[9px] text-ink-3 font-semibold uppercase tracking-wide">
                {t("small")}
              </span>
              <span className="price-badge text-[13px] font-extrabold px-2.5 py-0.5 rounded-xl">
                {item.price_small} <span className="text-[10px] font-semibold opacity-80">{t("egp")}</span>
              </span>
            </div>
          )}

          {hasSmall && hasLarge && (
            <div className="w-px h-7 bg-border" />
          )}

          {hasLarge && (
            <div className="flex flex-col items-start gap-0">
              <span className="text-[9px] text-ink-3 font-semibold uppercase tracking-wide">
                {t("large")}
              </span>
              <span className="price-badge text-[13px] font-extrabold px-2.5 py-0.5 rounded-xl">
                {item.price_large} <span className="text-[10px] font-semibold opacity-80">{t("egp")}</span>
              </span>
            </div>
          )}

          {!hasPrices && (
            <span className="text-ink-3 text-sm">—</span>
          )}

          {/* Unavailable badge (no image) */}
          {!item.available && !hasImage && (
            <span className="ms-auto text-[10px] bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2.5 py-0.5 rounded-full font-semibold">
              {t("unavailable")}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
