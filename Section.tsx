import { motion } from "framer-motion";
import { Clock3, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";
import { Stamp } from "./atoms";

export function Section({
  id,
  index,
  kicker,
  title,
  minutes,
  intro,
  teacherNote,
  done,
  children,
  tone = "dark",
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  minutes: string;
  intro: string;
  teacherNote?: string;
  done?: boolean;
  children: ReactNode;
  tone?: "dark" | "hw";
}) {
  return (
    <section id={id} className="relative scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "font-display rounded-xl px-3 py-1.5 text-sm font-bold tracking-widest",
                tone === "hw"
                  ? "bg-berry-500/20 text-berry-500 ring-1 ring-berry-500/40"
                  : "bg-sun-500/15 text-sun-400 ring-1 ring-sun-500/40",
              )}
            >
              {index}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ripple-300/80">
              {kicker}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-paper-100/50">
              <Clock3 className="h-3.5 w-3.5" />
              {minutes}
            </span>
            {done && (
              <Stamp tone="leaf" className="ml-auto text-sm sm:text-base">
                Зачтено
              </Stamp>
            )}
          </div>
          <h2 className="font-display mt-4 max-w-3xl text-2xl font-bold leading-tight text-paper-50 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-100/70 sm:text-base">
            {intro}
          </p>
          {teacherNote && (
            <div className="mt-4 flex max-w-2xl items-start gap-2.5 rounded-xl border border-ripple-400/25 bg-ripple-400/10 px-4 py-3 text-xs leading-relaxed text-ripple-300 sm:text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <b className="font-semibold">Заметка для учителя:</b> {teacherNote}
              </span>
            </div>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/* Paper dossier document wrapper */
export function Doc({
  children,
  className,
  title,
  right,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  right?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "paper relative rounded-2xl p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/10 sm:rounded-3xl sm:p-8",
        className,
      )}
    >
      {(title || right) && (
        <div className="mb-5 flex flex-wrap items-center gap-3 border-b-2 border-dashed border-ink-900/20 pb-4">
          {title && (
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-500 sm:text-sm">
              {title}
            </h3>
          )}
          {right && <div className="ml-auto">{right}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
