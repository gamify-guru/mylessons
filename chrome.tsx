import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ClipboardList,
  FolderOpen,
  Image as ImageIcon,
  Menu,
  MessagesSquare,
  Ship,
  Waves,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MARKET_IMG } from "../assets/img";
import { FRUITS, NAV, RULE_CARD_1, RULE_CARD_2, RULE_VOCAB, type FruitId } from "../data";
import { cn } from "../utils/cn";
import { FruitIcon } from "./atoms";

/* ============================= HEADER ============================= */

export function Header({
  progress,
  onOpenRules,
  onOpenPhoto,
}: {
  progress: number;
  onOpenRules: (tab: number) => void;
  onOpenPhoto: () => void;
}) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-night-700 bg-night-950/90 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[72px] sm:px-6">
        <a href="#mission" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sun-500 text-night-950 shadow-[0_4px_14px_rgba(242,161,44,0.4)]">
            <Ship className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 sm:text-xs">
              Досье агента
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-ripple-300/80">
              Unit 8 · Lesson 7
            </span>
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-paper-100/60 transition hover:bg-night-800 hover:text-sun-400"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onOpenPhoto}
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-night-600 bg-night-850 px-3 text-xs font-semibold text-paper-100/80 transition hover:border-ripple-400/50 hover:text-ripple-300"
          >
            <ImageIcon className="h-4 w-4 text-ripple-400" />
            <span className="hidden sm:inline">Фото миссии</span>
          </button>
          <button
            onClick={() => onOpenRules(0)}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-sun-500 px-3 text-xs font-bold text-night-950 shadow-[0_6px_18px_rgba(242,161,44,0.35)] transition hover:bg-sun-400 hover:shadow-[0_8px_24px_rgba(242,161,44,0.5)]"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Карточки правил</span>
          </button>
          <button
            onClick={() => setMenu((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-night-600 bg-night-850 text-paper-100/80 lg:hidden"
            aria-label="Меню"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* progress */}
      <div className="h-[3px] w-full bg-night-800/60">
        <motion.div
          className="h-full bg-gradient-to-r from-ripple-400 via-sun-400 to-coral-500"
          animate={{ width: `${Math.round(progress * 100)}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>

      {/* mobile nav */}
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-night-700 bg-night-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1 p-3">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setMenu(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-paper-100/70 transition hover:bg-night-800 hover:text-sun-400"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================= RULES MODAL ============================= */

const RULE_TABS = [
  { label: "Как попросить на рынке", icon: ClipboardList },
  { label: "Полезные фразы", icon: MessagesSquare },
  { label: "Лексика рынка", icon: BookOpen },
];

function RuleList({ rows }: { rows: { en: string; ru: string; icon?: FruitId }[] }) {
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.35 }}
          className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-white/55 px-4 py-3 transition hover:border-sun-500/40 hover:bg-white/85"
        >
          {r.icon ? (
            <FruitIcon id={r.icon} className="h-9 w-9 shrink-0" />
          ) : (
            <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-900/85 text-[11px] font-bold text-sun-400">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <span>
            <span className="font-display block text-[13px] font-semibold leading-snug text-ink-900 sm:text-sm">
              {r.en}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-ink-500">{r.ru}</span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

export function RulesModal({
  open,
  tab,
  onTab,
  onClose,
}: {
  open: boolean;
  tab: number;
  onTab: (t: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-night-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Карточки правил"
        >
          <motion.div
            initial={{ y: 60, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="paper flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b-2 border-dashed border-ink-900/20 p-4 sm:p-5">
              <FolderOpen className="h-5 w-5 text-coral-600" />
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-ink-900 sm:text-base">
                  Карточки правил
                </h3>
                <p className="text-xs text-ink-500">Открой в любой момент. Здесь всегда подсказка.</p>
              </div>
              <button
                onClick={onClose}
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-ink-900/15 text-ink-700 transition hover:bg-ink-900 hover:text-paper-50"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-1.5 overflow-x-auto px-4 pt-4 sm:px-5 no-scrollbar">
              {RULE_TABS.map((t, i) => {
                const Icon = t.icon;
                const active = tab === i;
                return (
                  <button
                    key={t.label}
                    onClick={() => onTab(i)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-t-xl border-x-2 border-t-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wide transition sm:text-[13px]",
                      active
                        ? "border-ink-900/20 bg-white/80 text-coral-600"
                        : "border-transparent bg-ink-900/5 text-ink-500 hover:bg-white/50",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="overflow-y-auto border-t-2 border-ink-900/20 bg-white/40 p-4 sm:p-6">
              {tab === 0 && (
                <>
                  <RuleList rows={RULE_CARD_1} />
                  <p className="mt-4 rounded-xl bg-sun-400/25 px-4 py-3 text-xs leading-relaxed text-ink-700 sm:text-sm">
                    <b>Запомни:</b> <span className="font-display font-semibold">some + много</span>{" "}
                    (some bananas, some mangoes), а{" "}
                    <span className="font-display font-semibold">a + один</span> (a watermelon).
                    После <span className="font-display font-semibold">How many?</span> отвечаем
                    числом: <i>Six, please.</i>
                  </p>
                </>
              )}
              {tab === 1 && <RuleList rows={RULE_CARD_2} />}
              {tab === 2 && (
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {RULE_VOCAB.map((id, i) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.03 * i }}
                      className="flex flex-col items-center gap-1 rounded-2xl border border-ink-900/10 bg-white/60 px-2 py-3 text-center transition hover:-translate-y-0.5 hover:border-sun-500/50"
                    >
                      <FruitIcon id={id} className="h-11 w-11" />
                      <span className="font-display text-xs font-semibold text-ink-900">
                        {FRUITS[id].en}
                      </span>
                      <span className="text-[11px] text-ink-500">{FRUITS[id].ru}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================= PHOTO MODAL ============================= */

const FIND_LIST: { icon: FruitId; label: string }[] = [
  { icon: "bananas", label: "bananas" },
  { icon: "mangoes", label: "mangoes" },
  { icon: "watermelon", label: "watermelons" },
  { icon: "lemons", label: "lemons" },
  { icon: "peppers", label: "peppers" },
  { icon: "coconuts", label: "coconuts" },
  { icon: "onions", label: "onions" },
];

export function PhotoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Фото миссии"
        >
          <motion.div
            initial={{ scale: 0.9, rotate: -1.5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="paper w-full max-w-4xl overflow-hidden rounded-3xl p-3 shadow-2xl sm:p-4"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={MARKET_IMG}
                alt="Плавучий рынок в Таиланде: мальчик-агент на лодке, рядом лодка с фруктами"
                className="max-h-[62dvh] w-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-night-950/70 text-paper-50 backdrop-blur transition hover:bg-coral-600"
                aria-label="Закрыть фото"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="font-hand absolute bottom-3 left-3 inline-block -rotate-2 rounded-lg bg-night-950/70 px-3 py-1 text-lg text-paper-100 backdrop-blur">
                Плавучий рынок, Таиланд
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <p className="font-display mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                Найди на фото:
              </p>
              <div className="flex flex-wrap gap-2">
                {FIND_LIST.map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/60 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-ink-900"
                  >
                    <FruitIcon id={f.icon} className="h-6 w-6" />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================= FOOTER ============================= */

export function Footer() {
  return (
    <footer className="relative border-t border-night-700/60 bg-night-950 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <span className="flex items-center gap-2 text-ripple-400">
          <Waves className="h-5 w-5" />
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em]">
            Досье агента · Миссия «Плавучий рынок»
          </span>
        </span>
        <p className="max-w-xl text-xs leading-relaxed text-paper-100/45">
          Academy Stars 2 · Unit 8 Lesson 7 — Listening: identify specific information · Speaking:
          ask for things in a shop or market. Урок работает без аудио: все диалоги даны текстом,
          учитель или «система» читает их вслух.
        </p>
      </div>
    </footer>
  );
}
