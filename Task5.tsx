import { motion } from "framer-motion";
import { Award, Check, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { FINAL_QUESTIONS, type FinalQ } from "../data";
import { cn } from "../utils/cn";
import { FruitIcon } from "./atoms";
import { Doc, Section } from "./Section";
import type { FruitId } from "../data";

const CONFETTI: FruitId[] = [
  "bananas",
  "mangoes",
  "lemons",
  "watermelon",
  "peppers",
  "coconuts",
  "grapes",
  "onions",
];

function FruitRain() {
  const [run, setRun] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setRun(false), 4600);
    return () => clearTimeout(t);
  }, []);
  if (!run) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl">
      {Array.from({ length: 18 }).map((_, i) => {
        const left = 4 + ((i * 53) % 92);
        const delay = (i % 9) * 0.28;
        const size = 22 + ((i * 13) % 20);
        return (
          <motion.span
            key={i}
            initial={{ y: -60, x: 0, rotate: 0, opacity: 0 }}
            animate={{ y: 620, x: i % 2 ? 40 : -30, rotate: i % 2 ? 200 : -180, opacity: [0, 1, 1, 0.9] }}
            transition={{ duration: 3.8, delay, ease: [0.3, 0.6, 0.6, 1] }}
            className="absolute top-0"
            style={{ left: `${left}%`, width: size, height: size }}
          >
            <FruitIcon id={CONFETTI[i % CONFETTI.length]} className="h-full w-full" />
          </motion.span>
        );
      })}
    </div>
  );
}

export function Task5({ done, onDone }: { done: boolean; onDone: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const total = FINAL_QUESTIONS.length;
  const answered = Object.keys(answers).length;
  const score = FINAL_QUESTIONS.filter((q, i) => answers[i] === q.answer).length;
  const complete = answered === total;

  useEffect(() => {
    if (complete && !done) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
  }, [complete, done, onDone]);

  return (
    <Section
      id="final"
      index="05"
      kicker="Финал · Проверка досье"
      title="Закрыть досье"
      minutes="4 минуты"
      intro="Последняя проверка перед сдачей досье: 6 заданий вперемешку — где-то нужно дополнить фразу, где-то выбрать правильную. Покажи, чему научился на рынке!"
      done={done}
    >
      <div className="relative">
        {complete && <FruitRain />}
        <Doc
          title="Протокол проверки — 6 пунктов"
          right={
            <span
              className={cn(
                "font-display rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest transition",
                complete ? "bg-leaf-500 text-white" : "bg-ink-900/10 text-ink-700",
              )}
            >
              {answered} / {total}
            </span>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {FINAL_QUESTIONS.map((q, i) => (
              <FinalCard
                key={i}
                i={i}
                q={q}
                chosen={answers[i]}
                onPick={(oi) => {
                  if (answers[i] !== undefined) return;
                  setAnswers({ ...answers, [i]: oi });
                }}
              />
            ))}
          </div>

          {complete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 18 }}
              className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-night-900 p-6 text-center"
            >
              <Award className="h-9 w-9 text-sun-400" />
              <p className="font-display text-lg font-bold text-paper-50 sm:text-xl">
                {score >= 5 ? "Досье закрыто! Ты — агент рынка." : "Досье закрыто! Почти идеально."}
              </p>
              <p className="text-sm text-paper-100/70">
                Результат проверки: <b className="text-sun-400">{score} из {total}</b>
                {score < 5 && " — загляни ещё раз в карточки правил и попробуй завтра."}
              </p>
              <span className="stamp text-sm text-coral-400 sm:text-base" style={{ rotate: "-4deg" }}>
                Миссия выполнена
              </span>
            </motion.div>
          )}
        </Doc>
      </div>
    </Section>
  );
}

function FinalCard({
  i,
  q,
  chosen,
  onPick,
}: {
  i: number;
  q: FinalQ;
  chosen?: number;
  onPick: (oi: number) => void;
}) {
  const answered = chosen !== undefined;
  const ok = answered && chosen === q.answer;
  const [flash, setFlash] = useState(false);

  // flash при неправильном выборе
  useEffect(() => {
    if (answered && !ok) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 500);
      return () => clearTimeout(t);
    }
  }, [answered, ok]);

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border-2 p-4 transition",
        ok
          ? "border-leaf-500/70 bg-leaf-400/10"
          : answered
            ? "border-coral-500/60 bg-coral-500/5"
            : "border-ink-900/10 bg-white/50",
        flash && "animate-shake",
      )}
    >
      <p className="flex items-start gap-2.5">
        <span
          className={cn(
            "font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold",
            ok ? "bg-leaf-500 text-white" : answered ? "bg-coral-500 text-white" : "bg-night-900 text-sun-400",
          )}
        >
          {ok ? <Check className="h-4 w-4" /> : i + 1}
        </span>
        <span>
          <span className="block text-sm font-bold text-ink-900">{q.prompt}</span>
          <span className="text-xs text-ink-500">{q.ru}</span>
        </span>
      </p>

      {q.mode === "gap" && (
        <p className="font-display mt-3 rounded-xl bg-night-900/90 px-4 py-3 text-[13px] font-semibold leading-relaxed text-paper-100 sm:text-sm">
          {q.before}
          <span
            className={cn(
              "gap-slot mx-1 px-2 font-bold",
              ok ? "text-leaf-400" : answered ? "text-coral-400" : "text-sun-400",
            )}
          >
            {answered ? q.options[chosen!] : "···"}
          </span>
          {q.after}
        </p>
      )}

      <div className={cn("mt-3 grid gap-2", q.mode === "choose" && "sm:grid-cols-1")}>
        {q.options.map((opt, oi) => {
          const isChosen = chosen === oi;
          const isRight = oi === q.answer;
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => onPick(oi)}
              className={cn(
                "rounded-xl border-2 px-3.5 py-2.5 text-left font-display text-[12.5px] font-semibold transition sm:text-[13px]",
                answered && isRight
                  ? "border-leaf-500 bg-leaf-500 text-white"
                  : isChosen && !isRight
                    ? "border-coral-500 bg-coral-500/10 text-coral-600"
                    : answered
                      ? "border-ink-900/10 bg-white/40 text-ink-500"
                      : "border-ink-900/15 bg-white text-ink-900 hover:border-sun-500 hover:bg-sun-400/20",
              )}
            >
              {opt}
              {answered && isRight && <Check className="ml-2 inline h-3.5 w-3.5" />}
            </button>
          );
        })}
      </div>

      {answered && !ok && (
        <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-coral-600">
          <CircleAlert className="h-3.5 w-3.5" /> Правильный ответ подсвечен зелёным.
        </p>
      )}
    </div>
  );
}
