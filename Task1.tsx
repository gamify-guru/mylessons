import { motion } from "framer-motion";
import { Check, CircleAlert, PartyPopper, Search, ZoomIn } from "lucide-react";
import { useState } from "react";
import { MARKET_IMG } from "../assets/img";
import { FRUITS, TASK1_CORRECT, TASK1_GRID, type FruitId } from "../data";
import { cn } from "../utils/cn";
import { FruitIcon } from "./atoms";
import { Doc, Section } from "./Section";

export function Task1({
  done,
  onDone,
  onOpenPhoto,
}: {
  done: boolean;
  onDone: () => void;
  onOpenPhoto: () => void;
}) {
  const [found, setFound] = useState<Set<FruitId>>(new Set());
  const [wrong, setWrong] = useState<FruitId | null>(null);

  const total = TASK1_CORRECT.length;
  const complete = found.size === total;

  const pick = (id: FruitId) => {
    if (complete || found.has(id)) return;
    if (TASK1_CORRECT.includes(id)) {
      const next = new Set(found);
      next.add(id);
      setFound(next);
      if (next.size === total) {
        setTimeout(onDone, 500);
      }
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 650);
    }
  };

  return (
    <Section
      id="task1"
      index="01"
      kicker="Задание · Разведка"
      title="Активизация лексики: что на фото?"
      minutes="5 минут"
      intro="Посмотри на фото плавучего рынка. В досье есть карточки с продуктами — но не все из них есть на фото, тут есть ловушки! Выбери 7 продуктов, которые ты видишь на лодках."
      done={done}
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* photo side */}
        <Doc
          title="Улика №1 — фото места"
          right={
            <span className="text-[11px] font-bold uppercase tracking-widest text-ink-500">
              осмотри внимательно
            </span>
          }
          className="lg:sticky lg:top-28 self-start"
        >
          <button
            onClick={onOpenPhoto}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl"
            aria-label="Открыть фото крупно"
          >
            <img
              src={MARKET_IMG}
              alt="Плавучий рынок: найди фрукты и овощи"
              className="aspect-[16/11] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-night-950/40 to-transparent opacity-70" />
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-night-950/65 px-3 py-2 text-xs font-bold text-paper-50 backdrop-blur transition group-hover:bg-sun-500 group-hover:text-night-950">
              <ZoomIn className="h-4 w-4" /> Увеличить
            </span>
          </button>
          <p className="font-hand mt-3 text-xl leading-tight text-ink-700">
            Присмотрись: фрукты сложены горками на каждой лодке…
          </p>
        </Doc>

        {/* cards side */}
        <Doc
          title="Карточки продуктов"
          right={
            <span
              className={cn(
                "font-display rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest transition",
                complete ? "bg-leaf-500 text-white" : "bg-ink-900/10 text-ink-700",
              )}
            >
              Найдено {found.size} / {total}
            </span>
          }
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {TASK1_GRID.map((id, i) => {
              const f = FRUITS[id];
              const isFound = found.has(id);
              const isWrong = wrong === id;
              return (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  onClick={() => pick(id)}
                  className={cn(
                    "group relative flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-4 transition",
                    isFound
                      ? "border-leaf-500 bg-leaf-400/15 shadow-[0_8px_20px_-8px_rgba(42,140,90,0.5)]"
                      : "border-ink-900/12 bg-white/65 hover:-translate-y-1 hover:border-sun-500 hover:bg-white hover:shadow-[0_14px_26px_-12px_rgba(217,134,23,0.45)]",
                    isWrong && "animate-shake border-coral-500 bg-coral-500/10",
                  )}
                >
                  {isFound && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-leaf-500 text-white shadow"
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                  )}
                  <FruitIcon
                    id={id}
                    className={cn(
                      "h-14 w-14 transition-transform group-hover:scale-110 sm:h-16 sm:w-16",
                      isFound && "scale-105",
                    )}
                  />
                  <span className="font-display text-xs font-semibold text-ink-900 sm:text-sm">
                    {f.en}
                  </span>
                  <span className="text-[11px] text-ink-500">{f.ru}</span>
                </motion.button>
              );
            })}
          </div>

          {wrong && (
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-coral-600">
              <CircleAlert className="h-4 w-4" />
              Этого нет на фото — посмотри ещё раз!
            </p>
          )}

          {complete && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center gap-3 rounded-2xl bg-leaf-500/15 px-4 py-3.5"
            >
              <PartyPopper className="h-6 w-6 shrink-0 text-leaf-600" />
              <p className="text-sm font-semibold text-ink-900">
                Отличная разведка! Ты нашёл всё:{" "}
                <span className="font-display">bananas, mangoes, watermelons, lemons, peppers, coconuts, onions.</span>
              </p>
            </motion.div>
          )}

          <hr className="dashed-hr my-5" />
          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500 sm:text-sm">
            <Search className="mt-0.5 h-4 w-4 shrink-0" />
            В классе: назови найденные продукты вслух по-английски — учитель отмечает произношение.
          </p>
        </Doc>
      </div>
    </Section>
  );
}
