import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  BookOpen,
  ChevronRight,
  Clock3,
  Headphones,
  MapPin,
  Mic,
  Ship,
  Sun,
  Target,
  Umbrella,
  ZoomIn,
} from "lucide-react";
import { useRef } from "react";
import { MARKET_IMG } from "../assets/img";
import { PLAN } from "../data";

export function Hero({
  onOpenRules,
  onOpenPhoto,
}: {
  onOpenRules: () => void;
  onOpenPhoto: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div id="mission" ref={ref} className="relative overflow-hidden pt-24 sm:pt-28">
      {/* backdrop */}
      <div className="texture-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-ripple-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-64 h-96 w-96 rounded-full bg-sun-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/3 top-[560px] h-72 w-72 rounded-full bg-coral-500/10 blur-[110px]" />

      {/* floating market icons */}
      <Umbrella
        className="animate-float pointer-events-none absolute right-[10%] top-28 hidden h-9 w-9 text-coral-400/45 md:block"
        style={{ ["--fl-rot" as string]: "14deg", animationDelay: "0.6s" }}
      />
      <Sun
        className="animate-float pointer-events-none absolute left-[42%] top-20 hidden h-7 w-7 text-sun-400/40 md:block"
        style={{ ["--fl-rot" as string]: "0deg", animationDelay: "1.8s" }}
      />
      <Ship
        className="animate-float pointer-events-none absolute bottom-[46%] left-[4%] hidden h-8 w-8 text-ripple-400/40 lg:block"
        style={{ ["--fl-rot" as string]: "-8deg", animationDelay: "1.1s" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
        {/* ------- text column ------- */}
        <motion.div style={{ y: yText }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="stamp text-[10px] text-coral-400 sm:text-xs">Совершенно секретно</span>
            <span className="rounded-full border border-night-600 bg-night-850 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ripple-300 sm:text-xs">
              Досье № 8.7
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display mt-6 text-[clamp(1.9rem,5.4vw,3.6rem)] font-black leading-[1.06] text-paper-50"
          >
            Миссия:
            <br />
            <span className="bg-gradient-to-r from-sun-400 via-coral-400 to-berry-500 bg-clip-text text-transparent">
              Плавучий рынок
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-paper-100/75 sm:text-base"
          >
            Ты получил новое досье. Сегодня твоя миссия — на{" "}
            <b className="text-sun-400">плавучем рынке в Таиланде</b>. Слушай внимательно и делай
            правильные покупки.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-6 flex flex-wrap items-center gap-2.5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-night-600 bg-night-850 px-3.5 py-2 text-xs font-semibold text-paper-100/80">
              <Clock3 className="h-4 w-4 text-sun-400" /> 45 минут
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-night-600 bg-night-850 px-3.5 py-2 text-xs font-semibold text-paper-100/80">
              <MapPin className="h-4 w-4 text-coral-400" /> Таиланд
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-night-600 bg-night-850 px-3.5 py-2 text-xs font-semibold text-paper-100/80">
              <Headphones className="h-4 w-4 text-ripple-400" /> Listening
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-night-600 bg-night-850 px-3.5 py-2 text-xs font-semibold text-paper-100/80">
              <Mic className="h-4 w-4 text-berry-500" /> Speaking
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#task1"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-sun-500 px-6 py-3.5 text-sm font-bold text-night-950 shadow-[0_14px_34px_-8px_rgba(242,161,44,0.55)] transition hover:-translate-y-0.5 hover:bg-sun-400"
            >
              <Target className="h-4.5 w-4.5" />
              Открыть досье
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={onOpenRules}
              className="inline-flex items-center gap-2.5 rounded-2xl border border-night-500 bg-night-850 px-6 py-3.5 text-sm font-bold text-paper-100 transition hover:border-ripple-400/60 hover:text-ripple-300"
            >
              <BookOpen className="h-4.5 w-4.5 text-ripple-400" />
              Карточки правил
            </button>
          </motion.div>
        </motion.div>

        {/* ------- photo column ------- */}
        <motion.div style={{ y: yImg }} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="paper animate-float relative rounded-2xl p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] sm:rounded-3xl sm:p-4"
            style={{ ["--fl-rot" as string]: "1.5deg" }}
          >
            <span className="tape -top-3 left-8 -rotate-[8deg]" />
            <span className="tape -top-3 right-10 rotate-[6deg]" />
            <button
              onClick={onOpenPhoto}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl sm:rounded-2xl"
              aria-label="Открыть фото крупно"
            >
              <img
                src={MARKET_IMG}
                alt="Мальчик-агент на лодке на плавучем рынке с фруктами и овощами"
                className="aspect-[16/11] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night-950/35 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-night-950/60 text-paper-50 opacity-0 backdrop-blur transition group-hover:opacity-100">
                <ZoomIn className="h-5 w-5" />
              </span>
              <span className="font-hand absolute bottom-3 left-3 text-xl text-paper-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                Твоя точка назначения
              </span>
            </button>
            <div className="mt-3 flex items-center justify-between px-1 pb-1">
              <p className="font-hand text-lg leading-none text-ink-700 sm:text-xl">
                Улика №1: рынок на воде
              </p>
              <span className="stamp text-[10px] text-coral-600" style={{ rotate: "6deg" }}>
                Секретно
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ------- mission plan strip ------- */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-night-700 bg-night-900/70 p-4 backdrop-blur sm:p-6"
        >
          <p className="font-display mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-ripple-300">
            <Target className="h-4 w-4" /> План операции
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {PLAN.map((p, i) => (
              <motion.a
                key={p.id}
                href={`#${p.id}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.45 }}
                className="group rounded-2xl border border-night-600 bg-night-850 p-3.5 transition hover:-translate-y-1 hover:border-sun-500/50 hover:bg-night-800"
              >
                <span className="font-display text-[10px] font-bold tracking-widest text-sun-400">
                  {p.n}
                </span>
                <p className="mt-1.5 text-[13px] font-bold leading-tight text-paper-50">
                  {p.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-paper-100/50">{p.sub}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-ripple-300/70">
                  <Clock3 className="h-3 w-3" /> {p.min}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.a
          href="#task1"
          className="mx-auto mt-10 flex w-max flex-col items-center gap-1 text-paper-100/40 transition hover:text-sun-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Листай вниз</span>
          <ArrowDown className="animate-bob h-4 w-4" />
        </motion.a>
      </div>
    </div>
  );
}
