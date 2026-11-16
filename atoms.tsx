import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import type { FruitId } from "../data";

/* -------------------- Fruit / veg SVG icons -------------------- */

const SHAPES: Record<FruitId, ReactNode> = {
  bananas: (
    <>
      <path
        d="M10 31 Q 23 45 39 17"
        stroke="#f4b63f"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 30 Q 23 44 39 16"
        stroke="#ffd54a"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M13 29.5 Q 23 39 35 22"
        stroke="#ffe58a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="10" cy="31" r="2.4" fill="#8a5a2b" />
      <circle cx="39" cy="17" r="2.6" fill="#5d7a36" />
    </>
  ),
  coconuts: (
    <>
      <circle cx="24" cy="27" r="15" fill="#8fce5e" />
      <path
        d="M24 12 q-5 15 0 30 M17 15 q-4 12 1 24 M31 15 q4 12 -1 24"
        stroke="#6fb246"
        strokeWidth="1.6"
        fill="none"
        opacity="0.9"
      />
      <ellipse cx="18" cy="20" rx="4" ry="6" fill="#a9de7c" opacity="0.75" />
      <path d="M24 12 q1 -5 5 -6" stroke="#4c8a3b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  ),
  watermelon: (
    <>
      <path d="M7 15 h34 l-17 27 z" fill="#4f9e4f" stroke="#3c7f3c" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 17.5 h26 l-13 20.5 z" fill="#f7f3d8" />
      <path d="M14 19.5 h20 l-10 16 z" fill="#ff5f58" />
      <ellipse cx="24" cy="24" rx="1.1" ry="1.8" fill="#43262a" />
      <ellipse cx="20" cy="28" rx="1.1" ry="1.8" fill="#43262a" transform="rotate(-12 20 28)" />
      <ellipse cx="28" cy="28" rx="1.1" ry="1.8" fill="#43262a" transform="rotate(12 28 28)" />
    </>
  ),
  mangoes: (
    <>
      <ellipse cx="24" cy="28" rx="13" ry="14.5" fill="#ffb74d" transform="rotate(-16 24 28)" />
      <ellipse cx="19" cy="30" rx="9" ry="11" fill="#ff8a5c" opacity="0.55" transform="rotate(-16 19 30)" />
      <ellipse cx="28" cy="22" rx="4.5" ry="7" fill="#ffd54a" opacity="0.8" transform="rotate(-16 28 22)" />
      <path d="M24 13 q2 -5 7 -5 q-1 5 -7 5z" fill="#58a04c" />
    </>
  ),
  lemons: (
    <>
      <ellipse cx="24" cy="26" rx="12" ry="9" fill="#ffd94d" />
      <circle cx="12.5" cy="26" r="2.6" fill="#ffd94d" />
      <circle cx="35.5" cy="26" r="2.6" fill="#ffd94d" />
      <path d="M14 24 q10 -8 20 0" stroke="#ffef9e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9" />
      <path d="M33 19 q3 -4 7 -3 q-1 4 -7 3z" fill="#58a04c" />
    </>
  ),
  peppers: (
    <>
      <path
        d="M24 16 c-7.5 -3.5 -13.5 0.5 -13.5 9 c0 7.5 4 13 8.5 15 c3.2 1.5 6.8 1.5 10 0 c4.5 -2 8.5 -7.5 8.5 -15 c0 -8.5 -6 -12.5 -13.5 -9z"
        fill="#ee5347"
      />
      <path d="M19.5 18 q-3 10 1 22 M28.5 18 q3 10 -1 22" stroke="#d63b30" strokeWidth="1.5" fill="none" opacity="0.8" />
      <ellipse cx="19" cy="23" rx="2.6" ry="6" fill="#ff8a75" opacity="0.55" transform="rotate(-10 19 23)" />
      <path d="M24 16 q-0.5 -5 2 -8" stroke="#3f8f3f" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 8 q4 -1.5 6 1 q-3 2 -6 -1z" fill="#4fae51" />
    </>
  ),
  onions: (
    <>
      <path
        d="M24 12 c7 6 12 11 12 18 a12 12 0 1 1 -24 0 c0 -7 5 -12 12 -18z"
        fill="#f4b562"
      />
      <path d="M19 24 q-3.5 6 0 14 M29 24 q3.5 6 0 14 M24 22 v18" stroke="#dd8f3c" strokeWidth="1.5" fill="none" opacity="0.85" />
      <ellipse cx="18.5" cy="29" rx="3" ry="7" fill="#ffd195" opacity="0.6" transform="rotate(-12 18.5 29)" />
      <path d="M24 12 q-1 -4 1.5 -6" stroke="#7aa94c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  grapes: (
    <>
      <path d="M24 7 q1 4 0 8" stroke="#7a5230" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M24 9 q6 -3 10 1 q-4 4 -10 -1z" fill="#4fae51" />
      <circle cx="18" cy="20" r="5.4" fill="#9b5fc0" />
      <circle cx="30" cy="20" r="5.4" fill="#a96fd0" />
      <circle cx="24" cy="25" r="5.4" fill="#8b4fb0" />
      <circle cx="18" cy="30" r="5.4" fill="#a96fd0" />
      <circle cx="30" cy="30" r="5.4" fill="#9b5fc0" />
      <circle cx="24" cy="36" r="5.4" fill="#8b4fb0" />
      <circle cx="17" cy="18.5" r="1.6" fill="#cf9df0" opacity="0.8" />
      <circle cx="29" cy="18.5" r="1.6" fill="#cf9df0" opacity="0.8" />
    </>
  ),
  potato: (
    <>
      <ellipse cx="24" cy="27" rx="14" ry="12" fill="#cfa96e" transform="rotate(8 24 27)" />
      <path d="M14 22 q10 -8 20 -1" stroke="#e3c391" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
      <circle cx="19" cy="26" r="1.4" fill="#8f6b3d" />
      <circle cx="28" cy="31" r="1.4" fill="#8f6b3d" />
      <circle cx="30" cy="22" r="1.4" fill="#8f6b3d" />
      <circle cx="21" cy="34" r="1.2" fill="#8f6b3d" />
    </>
  ),
  peas: (
    <>
      <ellipse cx="24" cy="26" rx="17" ry="7.5" fill="#4fae51" transform="rotate(-18 24 26)" />
      <ellipse cx="24" cy="26" rx="14.5" ry="5" fill="#6fca6d" transform="rotate(-18 24 26)" />
      <circle cx="15" cy="29" r="3" fill="#c0e8a0" />
      <circle cx="21" cy="27" r="3" fill="#c0e8a0" />
      <circle cx="27" cy="25" r="3" fill="#c0e8a0" />
      <circle cx="33" cy="23" r="3" fill="#c0e8a0" />
      <path d="M39 20 q4 -2 4 -6" stroke="#3c8f3f" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  carrots: (
    <>
      <path d="M24 20 q8 0 8 6 q0 12 -8 18 q-8 -6 -8 -18 q0 -6 8 -6z" fill="#ff8842" />
      <path d="M18.5 27 h11 M19.5 32 h9 M21 37 h6" stroke="#e06e2a" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="21" cy="23" rx="2.4" ry="5" fill="#ffa96e" opacity="0.6" />
      <path d="M24 20 q-4 -4 -7 -4 M24 20 q0 -6 2 -8 M24 20 q4 -4 7 -4" stroke="#4fae51" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </>
  ),
};

export function FruitIcon({
  id,
  className,
}: {
  id: FruitId;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {SHAPES[id]}
    </svg>
  );
}

/* -------------------- Stamp -------------------- */

export function Stamp({
  children,
  tone = "coral",
  className,
  rotate = -7,
}: {
  children: ReactNode;
  tone?: "coral" | "leaf";
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.span
      initial={{ scale: 2.2, opacity: 0, rotate: rotate - 14 }}
      animate={{ scale: 1, opacity: 1, rotate }}
      transition={{ type: "spring", stiffness: 320, damping: 17 }}
      className={cn(
        "stamp",
        tone === "coral" ? "text-coral-600" : "text-leaf-600",
        className,
      )}
      style={{ rotate }}
    >
      {children}
    </motion.span>
  );
}

/* -------------------- Small chips -------------------- */

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-ink-900/15 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function NumBadge({ n, className }: { n: string; className?: string }) {
  return (
    <span
      className={cn(
        "font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-night-900 text-sm font-bold text-sun-400 shadow-[0_2px_0_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {n}
    </span>
  );
}
