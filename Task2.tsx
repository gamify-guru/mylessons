import { motion } from "framer-motion";
import {
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  Headphones,
  Quote,
  Send,
  Store,
  User,
} from "lucide-react";
import { useState } from "react";
import { LISTENING_QUESTIONS, LISTENING_SCRIPT, type ListenQ } from "../data";
import { cn } from "../utils/cn";
import { Doc, Section } from "./Section";

type AnswerState = { ok: boolean; value: string };

export function Task2({ done, onDone }: { done: boolean; onDone: () => void }) {
  const [showScript, setShowScript] = useState(false);
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);

  const answeredCount = Object.values(answers).filter((a) => a.ok).length;
  const total = LISTENING_QUESTIONS.length;
  const complete = answeredCount === total;

  const mark = (i: number, ok: boolean, value: string) => {
    if (answers[i]?.ok) return;
    if (ok) {
      const next = { ...answers, [i]: { ok, value } };
      setAnswers(next);
      if (Object.values(next).filter((a) => a.ok).length === total) {
        setTimeout(onDone, 600);
      }
    } else {
      setAnswers({ ...answers, [i]: { ok: false, value } });
      setWrongFlash(i);
      setTimeout(() => setWrongFlash(null), 500);
    }
  };

  const checkInput = (i: number, q: Extract<ListenQ, { kind: "input" }>) => {
    const raw = (inputs[i] ?? "").trim().toLowerCase().replace(/[.!]+$/g, "");
    if (!raw) return;
    mark(i, q.accept.includes(raw), raw);
  };

  return (
    <Section
      id="task2"
      index="02"
      kicker="Задание · Прослушка"
      title="Secret Mission: Listening"
      minutes="10 минут"
      intro="На рынке агент разговаривает с продавцом. Прослушай диалог и собери секретные сведения: сколько лодок, что на лодках, сколько бананов и манго купил агент… Ответы — в бумагах ниже."
      teacherNote="Прочитай диалог вслух два раза: первый раз — ученик только слушает (текст скрыт), второй — отвечает на вопросы. Для самостоятельной работы ученик нажимает «Показать текст» и читает сам."
      done={done}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        {/* script */}
        <Doc
          title="Секретная передача — расшифровка"
          className="self-start"
          right={
            <button
              onClick={() => setShowScript((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider transition",
                showScript
                  ? "bg-night-900 text-paper-50 hover:bg-night-700"
                  : "bg-sun-500 text-night-950 hover:bg-sun-400",
              )}
            >
              {showScript ? (
                <>
                  <EyeOff className="h-4 w-4" /> Скрыть текст
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" /> Показать текст
                </>
              )}
            </button>
          }
        >
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-ink-500">
            <Headphones className="h-4 w-4 text-coral-500" />
            {showScript
              ? "Читай диалог ролями: Продавец — Агент."
              : "Режим аудирования: слушай, не подсматривая."}
          </div>

          <div className="relative max-h-[560px] overflow-y-auto rounded-2xl border border-ink-900/10 bg-white/50 p-3 sm:p-4 no-scrollbar">
            {!showScript && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-night-900/90 p-6 text-center backdrop-blur-[2px]">
                <Headphones className="h-9 w-9 text-sun-400" />
                <p className="font-display text-sm font-bold text-paper-50">
                  Текст засекречен
                </p>
                <p className="max-w-xs text-xs leading-relaxed text-paper-100/70">
                  Учитель читает диалог вслух два раза. Работаешь сам? Нажми «Показать текст» и
                  прочитай диалог.
                </p>
                <button
                  onClick={() => setShowScript(true)}
                  className="mt-1 rounded-xl bg-sun-500 px-5 py-2.5 text-xs font-bold text-night-950 transition hover:bg-sun-400"
                >
                  Показать текст
                </button>
              </div>
            )}
            <ul className="space-y-2.5">
              {LISTENING_SCRIPT.map((l, i) => (
                <li
                  key={i}
                  className={cn("flex", l.who === "agent" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 sm:max-w-[80%]",
                      l.who === "agent"
                        ? "rounded-br-md bg-sun-400/30"
                        : "rounded-bl-md bg-ripple-400/25",
                    )}
                  >
                    <p className="mb-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ink-500">
                      {l.who === "agent" ? (
                        <>
                          <User className="h-3 w-3" /> Агент
                        </>
                      ) : (
                        <>
                          <Store className="h-3 w-3" /> Продавец
                        </>
                      )}
                    </p>
                    <p className="font-display text-[13px] font-medium leading-snug text-ink-900 sm:text-sm">
                      {l.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Doc>

        {/* questions */}
        <Doc
          title="Собери сведения — 8 вопросов"
          right={
            <span
              className={cn(
                "font-display rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest",
                complete ? "bg-leaf-500 text-white" : "bg-ink-900/10 text-ink-700",
              )}
            >
              {answeredCount} / {total}
            </span>
          }
        >
          <ol className="space-y-4">
            {LISTENING_QUESTIONS.map((q, i) => (
              <Question
                key={i}
                i={i}
                q={q}
                state={answers[i]}
                flash={wrongFlash === i}
                onMark={mark}
                inputVal={inputs[i] ?? ""}
                onInput={(v) => setInputs({ ...inputs, [i]: v })}
                onCheck={checkInput}
              />
            ))}
          </ol>

          {complete && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-2xl bg-leaf-500/15 px-4 py-3.5"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <Check className="h-5 w-5 text-leaf-600" />
                Все сведения собраны! Слух у агента отличный.
              </p>
            </motion.div>
          )}
        </Doc>
      </div>
    </Section>
  );
}

function Question({
  i,
  q,
  state,
  flash,
  onMark,
  inputVal,
  onInput,
  onCheck,
}: {
  i: number;
  q: ListenQ;
  state?: AnswerState;
  flash: boolean;
  onMark: (i: number, ok: boolean, v: string) => void;
  inputVal: string;
  onInput: (v: string) => void;
  onCheck: (i: number, q: Extract<ListenQ, { kind: "input" }>) => void;
}) {
  const ok = state?.ok;
  return (
    <li
      className={cn(
        "rounded-2xl border-2 p-4 transition",
        ok
          ? "border-leaf-500/70 bg-leaf-400/10"
          : flash
            ? "animate-shake border-coral-500/70 bg-coral-500/5"
            : "border-ink-900/10 bg-white/50",
      )}
    >
      <p className="flex items-start gap-2.5">
        <span
          className={cn(
            "font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold",
            ok ? "bg-leaf-500 text-white" : "bg-night-900 text-sun-400",
          )}
        >
          {ok ? <Check className="h-4 w-4" /> : i + 1}
        </span>
        <span className="font-display text-[13px] font-semibold leading-snug text-ink-900 sm:text-sm">
          {q.q}
        </span>
      </p>

      {q.kind === "mc" && (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {q.options.map((opt, oi) => {
            const chosen = state?.value === opt;
            const right = ok && chosen;
            return (
              <button
                key={opt}
                disabled={!!ok}
                onClick={() => onMark(i, oi === q.answer, opt)}
                className={cn(
                  "rounded-xl border-2 px-3 py-2.5 text-left text-[13px] font-semibold transition",
                  right
                    ? "border-leaf-500 bg-leaf-500 text-white"
                    : chosen && !ok
                      ? "border-coral-500 bg-coral-500/10 text-coral-600"
                      : "border-ink-900/15 bg-white text-ink-900 hover:border-sun-500 hover:bg-sun-400/20",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {q.kind === "tf" && (
        <div className="mt-3 flex gap-2">
          {[true, false].map((v) => {
            const label = v ? "True" : "False";
            const chosen = state?.value === label;
            const right = ok && chosen;
            return (
              <button
                key={label}
                disabled={!!ok}
                onClick={() => onMark(i, v === q.answer, label)}
                className={cn(
                  "flex-1 rounded-xl border-2 px-3 py-2.5 text-[13px] font-bold uppercase tracking-wider transition",
                  right
                    ? "border-leaf-500 bg-leaf-500 text-white"
                    : chosen && !ok
                      ? "border-coral-500 bg-coral-500/10 text-coral-600"
                      : "border-ink-900/15 bg-white text-ink-900 hover:border-sun-500 hover:bg-sun-400/20",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {q.kind === "input" && (
        <div className="mt-3 flex gap-2">
          <input
            value={inputVal}
            disabled={!!ok}
            onChange={(e) => onInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onCheck(i, q)}
            placeholder={q.placeholder}
            className={cn(
              "min-w-0 flex-1 rounded-xl border-2 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink-900 outline-none transition placeholder:text-ink-500/50",
              ok
                ? "border-leaf-500 bg-leaf-500/10"
                : "border-ink-900/15 focus:border-sun-500",
            )}
          />
          {!ok && (
            <button
              onClick={() => onCheck(i, q)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-night-900 px-4 py-2.5 text-xs font-bold text-paper-50 transition hover:bg-night-700"
            >
              <Send className="h-3.5 w-3.5" /> ОК
            </button>
          )}
        </div>
      )}

      {state && !ok && (
        <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-coral-600">
          <CircleAlert className="h-3.5 w-3.5" /> Не совсем… попробуй ещё раз!
        </p>
      )}
      {ok && (
        <p className="mt-2.5 flex items-start gap-1.5 text-xs italic leading-snug text-ink-500">
          <Quote className="mt-0.5 h-3 w-3 shrink-0" /> {q.hint}
        </p>
      )}
    </li>
  );
}
