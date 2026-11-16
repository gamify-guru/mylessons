import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CheckCheck,
  Mic,
  PartyPopper,
  RotateCcw,
  Store,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SHOPPING_LIST, SPEAK_TURNS, type FruitId } from "../data";
import { cn } from "../utils/cn";
import { FruitIcon } from "./atoms";
import { Doc, Section } from "./Section";

interface Msg {
  who: "seller" | "agent";
  text: string;
}

/* какой ход закрывает позицию списка */
const TURN_CLOSES: Record<number, FruitId> = {
  1: "bananas",
  2: "watermelon",
  4: "mangoes",
  6: "lemons",
};

const QTY: Partial<Record<FruitId, string>> = {
  bananas: "six",
  mangoes: "four",
  lemons: "five",
};

export function Task3({
  done,
  onDone,
  onOpenRules,
}: {
  done: boolean;
  onDone: () => void;
  onOpenRules: (tab: number) => void;
}) {
  const [turn, setTurn] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([{ who: "seller", text: SPEAK_TURNS[0].seller }]);
  const [typing, setTyping] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [bought, setBought] = useState<Set<FruitId>>(new Set());
  const [repeats, setRepeats] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, finished]);

  const choose = (oi: number) => {
    if (typing || finished) return;
    const t = SPEAK_TURNS[turn];
    if (oi !== t.correct) {
      setWrong(oi);
      setTimeout(() => setWrong(null), 600);
      return;
    }
    const agentMsg: Msg = { who: "agent", text: t.options[t.correct] };
    const close = TURN_CLOSES[turn];
    const newBought = new Set(bought);
    if (close) newBought.add(close);
    setBought(newBought);
    setMsgs((m) => [...m, agentMsg]);

    if (turn === SPEAK_TURNS.length - 1) {
      setFinished(true);
      setTimeout(onDone, 700);
      return;
    }
    setTyping(true);
    const nextTurn = turn + 1;
    setTimeout(() => {
      setMsgs((m) => [...m, { who: "seller", text: SPEAK_TURNS[nextTurn].seller }]);
      setTurn(nextTurn);
      setTyping(false);
    }, 850);
  };

  const reset = () => {
    setTurn(0);
    setMsgs([{ who: "seller", text: SPEAK_TURNS[0].seller }]);
    setFinished(false);
    setBought(new Set());
    setWrong(null);
    setRepeats((r) => r + 1);
  };

  const current = SPEAK_TURNS[turn];

  return (
    <Section
      id="task3"
      index="03"
      kicker="Задание · Операция «Продавец»"
      title="Role Mission: Speaking"
      minutes="12 минут"
      intro="Время действовать! Ты — покупатель, продавец ждёт тебя на лодке. Покупай всё по списку из досье: произнеси фразу вслух и выбери её. Всего 8 реплик."
      teacherNote="Ты или «система» — продавец. Ученик произносит свои реплики вслух, потом выбирает их на экране. После прохождения поменяйтесь ролями или нажмите «Повторить»."
      done={done}
    >
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        {/* shopping list */}
        <Doc title="Список покупок из досье" className="self-start lg:sticky lg:top-28">
          <ul className="space-y-2.5">
            {SHOPPING_LIST.map((item) => {
              const got = bought.has(item.icon);
              return (
                <motion.li
                  key={item.icon}
                  layout
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 px-3.5 py-3 transition",
                    got
                      ? "border-leaf-500/60 bg-leaf-400/15"
                      : "border-dashed border-ink-900/20 bg-white/50",
                  )}
                >
                  <span className="relative">
                    <FruitIcon id={item.icon} className="h-11 w-11" />
                    {got && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-leaf-500 text-white"
                      >
                        <CheckCheck className="h-3 w-3" />
                      </motion.span>
                    )}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "font-display block text-[13px] font-semibold sm:text-sm",
                        got ? "text-leaf-600 line-through opacity-70" : "text-ink-900",
                      )}
                    >
                      {item.label.replace("a watermelon", "1 watermelon")}
                    </span>
                    <span className="text-[11px] text-ink-500">
                      {got ? "Куплено!" : "Нужно купить"}
                    </span>
                  </span>
                  {QTY[item.icon] && <span className="font-hand ml-auto text-xl text-coral-600">× {QTY[item.icon] === "six" ? 6 : QTY[item.icon] === "four" ? 4 : 5}</span>}
                </motion.li>
              );
            })}
          </ul>
          <hr className="dashed-hr my-4" />
          <button
            onClick={() => onOpenRules(0)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-night-900/80 bg-night-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-paper-50 transition hover:bg-night-700"
          >
            <BookOpen className="h-4 w-4 text-sun-400" />
            Подсмотреть в карточке правил
          </button>
        </Doc>

        {/* chat */}
        <div className="overflow-hidden rounded-3xl border border-night-600 bg-night-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-3 border-b border-night-700 bg-night-850 px-4 py-3.5 sm:px-5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-ripple-400/20 text-ripple-300">
              <Store className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-leaf-400 ring-2 ring-night-850" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-paper-50">
                Связь с продавцом
              </p>
              <p className="text-[11px] text-ripple-300/80">
                {finished ? "Сделка завершена" : `Реплика ${Math.min(turn + 1, 8)} из 8 · на связи`}
              </p>
            </div>
            <button
              onClick={reset}
              className="ml-auto inline-flex items-center gap-2 rounded-xl border border-night-600 px-3 py-2 text-xs font-semibold text-paper-100/70 transition hover:border-sun-500/60 hover:text-sun-400"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Повторить{repeats > 0 ? ` (${repeats})` : ""}
            </button>
          </div>

          <div ref={scrollRef} className="h-[380px] space-y-3 overflow-y-auto p-4 sm:h-[420px] sm:p-5 no-scrollbar">
            <AnimatePresence initial={false}>
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={cn("flex", m.who === "agent" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "flex max-w-[85%] items-end gap-2 sm:max-w-[75%]",
                      m.who === "agent" && "flex-row-reverse",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        m.who === "agent"
                          ? "bg-sun-500 text-night-950"
                          : "bg-ripple-400/25 text-ripple-300",
                      )}
                    >
                      {m.who === "agent" ? <User className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                    </span>
                    <p
                      className={cn(
                        "font-display rounded-2xl px-4 py-3 text-[13px] font-medium leading-snug sm:text-sm",
                        m.who === "agent"
                          ? "rounded-br-md bg-sun-500 text-night-950"
                          : "rounded-bl-md bg-night-800 text-paper-100",
                      )}
                    >
                      {m.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ripple-400/25 text-ripple-300">
                    <Store className="h-4 w-4" />
                  </span>
                  <span className="flex gap-1.5 rounded-2xl rounded-bl-md bg-night-800 px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-2 w-2 rounded-full bg-paper-100/60"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }}
                      />
                    ))}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {finished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-sm rounded-2xl border border-leaf-400/40 bg-leaf-500/10 p-4 text-center"
              >
                <PartyPopper className="mx-auto mb-2 h-7 w-7 text-leaf-400" />
                <p className="font-display text-sm font-bold text-leaf-400">
                  Список досье выкуплен полностью!
                </p>
                <p className="mt-1 text-xs leading-relaxed text-paper-100/70">
                  Прочитай весь диалог вслух ещё раз или нажми «Повторить» и поменяйся ролями с
                  учителем.
                </p>
              </motion.div>
            )}
          </div>

          {/* answer options */}
          {!finished && (
            <div className="border-t border-night-700 bg-night-850 p-4 sm:p-5">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sun-400">
                <Mic className="h-3.5 w-3.5" /> Произнеси вслух и выбери свою реплику
              </p>
              <div className="grid gap-2">
                {current.options.map((opt, oi) => (
                  <motion.button
                    key={`${turn}-${oi}`}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * oi }}
                    onClick={() => choose(oi)}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition",
                      wrong === oi
                        ? "animate-shake border-coral-500 bg-coral-500/15 text-coral-400"
                        : "border-night-600 bg-night-800 text-paper-100 hover:border-sun-500 hover:bg-night-700",
                    )}
                  >
                    <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-night-950 text-[10px] font-bold text-ripple-300 transition group-hover:bg-sun-500 group-hover:text-night-950">
                      {["A", "B", "C"][oi]}
                    </span>
                    <span className="font-display text-[13px] font-semibold sm:text-sm">{opt}</span>
                  </motion.button>
                ))}
              </div>
              {wrong !== null && (
                <button
                  onClick={() => onOpenRules(0)}
                  className="mt-3 flex items-center gap-2 text-xs font-semibold text-coral-400 underline-offset-2 transition hover:text-sun-400 hover:underline"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Не уверен? Загляни в карточку «Как попросить на рынке»
                </button>
              )}
            </div>
          )}

          {finished && (
            <div className="border-t border-night-700 bg-night-850 p-4 text-center sm:p-5">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl bg-sun-500 px-6 py-3 text-sm font-bold text-night-950 transition hover:bg-sun-400"
              >
                <RotateCcw className="h-4 w-4" /> Повторить диалог ещё раз
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
