import { motion } from "framer-motion";
import { Check, Minus, PenLine, Plus, Receipt, RotateCcw, ShoppingBasket, Volume2 } from "lucide-react";
import { useState } from "react";
import { FRUITS, NUM_WORDS, ORDER_ITEMS, ORDER_MAX, ORDER_MIN, type FruitId } from "../data";
import { cn } from "../utils/cn";
import { FruitIcon } from "./atoms";
import { Doc, Section } from "./Section";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Task4({ done, onDone }: { done: boolean; onDone: () => void }) {
  const [sel, setSel] = useState<Partial<Record<FruitId, number>>>({});
  const [built, setBuilt] = useState(false);
  const [warn, setWarn] = useState(false);

  const count = Object.keys(sel).length;
  const valid = count >= ORDER_MIN && count <= ORDER_MAX;

  const toggle = (id: FruitId) => {
    if (built) return;
    const next = { ...sel };
    if (next[id]) delete next[id];
    else next[id] = FRUITS[id].plural ? 4 : 1;
    setSel(next);
    setWarn(false);
  };

  const qty = (id: FruitId, d: number) => {
    const cur = sel[id] ?? 3;
    const nv = Math.min(8, Math.max(2, cur + d));
    setSel({ ...sel, [id]: nv });
  };

  const build = () => {
    if (!valid) {
      setWarn(true);
      setTimeout(() => setWarn(false), 600);
      return;
    }
    setBuilt(true);
  };

  const lines: { buy: string; reply?: string }[] = built
    ? ORDER_ITEMS.filter((id) => sel[id]).map((id) => {
        const f = FRUITS[id];
        if (!f.plural) return { buy: `Can I have a ${f.en}, please?` };
        return {
          buy: `I'd like some ${f.en}, please.`,
          reply: `— How many? — ${cap(NUM_WORDS[(sel[id] ?? 2) - 1])}, please.`,
        };
      })
    : [];

  return (
    <Section
      id="task4"
      index="04"
      kicker="Задание · Свободное действие"
      title="Свой заказ агента"
      minutes="5 минут"
      intro={`Теперь ты главный покупатель. Выбери ${ORDER_MIN}–${ORDER_MAX} продуктов с рынка, реши сколько нужно, и собери свой секретный заказ. Потом прочитай его вслух или запиши в тетрадь.`}
      done={done}
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* picker */}
        <Doc
          title="Витрина рынка"
          right={
            <span
              className={cn(
                "font-display rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest transition",
                valid ? "bg-leaf-500 text-white" : warn ? "animate-shake bg-coral-500 text-white" : "bg-ink-900/10 text-ink-700",
              )}
            >
              Выбрано {count} / {ORDER_MIN}–{ORDER_MAX}
            </span>
          }
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {ORDER_ITEMS.map((id, i) => {
              const f = FRUITS[id];
              const on = sel[id] !== undefined;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i }}
                  className={cn(
                    "relative rounded-2xl border-2 p-3 text-center transition",
                    on
                      ? "border-sun-500 bg-sun-400/20 shadow-[0_10px_24px_-10px_rgba(217,134,23,0.5)]"
                      : "border-ink-900/12 bg-white/60 hover:border-sun-500/60 hover:bg-white",
                  )}
                >
                  <button
                    onClick={() => toggle(id)}
                    className="flex w-full flex-col items-center gap-1"
                    aria-pressed={on}
                  >
                    {on && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-sun-500 text-night-950 shadow">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <FruitIcon id={id} className="h-12 w-12" />
                    <span className="font-display text-xs font-semibold text-ink-900">{f.en}</span>
                    <span className="text-[10px] text-ink-500">{f.ru}</span>
                  </button>
                  {on && f.plural && (
                    <div className="mt-2 flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => qty(id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-ink-900/10 text-ink-900 transition hover:bg-coral-500 hover:text-white"
                        aria-label="Меньше"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-display w-6 text-sm font-bold text-ink-900">
                        {sel[id]}
                      </span>
                      <button
                        onClick={() => qty(id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-ink-900/10 text-ink-900 transition hover:bg-leaf-500 hover:text-white"
                        aria-label="Больше"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {on && !f.plural && (
                    <span className="mt-2 inline-block rounded-md bg-ink-900/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-700">
                      один · one
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {warn && (
            <p className="mt-4 text-sm font-semibold text-coral-600">
              Выбери от {ORDER_MIN} до {ORDER_MAX} продуктов — рюкзак агента не резиновый!
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={build}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-night-900 px-5 py-3.5 text-sm font-bold text-paper-50 transition hover:bg-night-700 sm:flex-none"
            >
              <ShoppingBasket className="h-4 w-4 text-sun-400" />
              Собрать заказ
            </button>
            {built && (
              <button
                onClick={() => setBuilt(false)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink-900/20 px-5 py-3.5 text-sm font-bold text-ink-700 transition hover:border-coral-500 hover:text-coral-600"
              >
                <RotateCcw className="h-4 w-4" /> Изменить
              </button>
            )}
          </div>
        </Doc>

        {/* receipt */}
        <Doc title="Чек агента" className="self-start lg:sticky lg:top-28">
          {!built ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <Receipt className="h-10 w-10 text-ink-500/50" />
              <p className="max-w-xs text-sm leading-relaxed text-ink-500">
                Здесь появится твой заказ на английском. Выбери продукты слева и нажми «Собрать
                заказ».
              </p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-hand mb-4 text-2xl leading-none text-coral-600">My order</p>
              <ul className="space-y-3">
                {lines.map((l, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 * i }}
                    className="rounded-xl border border-ink-900/10 bg-white/60 px-4 py-3"
                  >
                    <p className="font-display text-[13px] font-semibold text-ink-900 sm:text-sm">
                      {l.buy}
                    </p>
                    {l.reply && (
                      <p className="mt-1 text-xs italic text-ink-500 sm:text-[13px]">{l.reply}</p>
                    )}
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 * lines.length }}
                  className="rounded-xl border border-leaf-500/40 bg-leaf-500/10 px-4 py-3"
                >
                  <p className="font-display text-[13px] font-semibold text-ink-900 sm:text-sm">
                    Thank you!
                  </p>
                </motion.li>
              </ul>
              <hr className="dashed-hr my-4" />
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-400/30 px-3 py-1.5 font-semibold text-ink-700">
                  <Volume2 className="h-3.5 w-3.5" /> Прочитай вслух два раза
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-sun-400/30 px-3 py-1.5 font-semibold text-ink-700">
                  <PenLine className="h-3.5 w-3.5" /> Или перепиши в тетрадь
                </span>
              </div>
              <button
                onClick={onDone}
                disabled={done}
                className={cn(
                  "mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition",
                  done
                    ? "cursor-default bg-leaf-500/20 text-leaf-600"
                    : "bg-leaf-500 text-white hover:bg-leaf-600",
                )}
              >
                <Check className="h-4 w-4" />
                {done ? "Заказ зачтён" : "Я прочитал(а) заказ — готово"}
              </button>
            </motion.div>
          )}
        </Doc>
      </div>
    </Section>
  );
}
