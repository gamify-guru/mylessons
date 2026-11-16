import { motion } from "framer-motion";
import {
  Camera,
  Check,
  CircleAlert,
  MessagesSquare,
  NotebookPen,
  Plus,
  Puzzle,
  Save,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MARKET_IMG } from "../assets/img";
import { HW_GAPS } from "../data";
import { cn } from "../utils/cn";
import { Section } from "./Section";

/* сохранение текста ДЗ */
function useSaved(key: string) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const v = localStorage.getItem(key);
    if (v) setText(v);
  }, [key]);
  const save = () => {
    localStorage.setItem(key, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };
  return { text, setText, save, saved };
}

function lineCount(t: string) {
  return t.split(/\n|\./).filter((l) => l.trim().length > 3).length;
}

function HwCard({
  n,
  icon: Icon,
  title,
  desc,
  children,
}: {
  n: string;
  icon: typeof Save;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      className="relative overflow-hidden rounded-3xl border border-berry-500/30 bg-night-850 p-5 sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-berry-500 via-sun-500 to-coral-500" />
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-berry-500/15 text-berry-500 ring-1 ring-berry-500/40">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-berry-500">
            Домашнее задание {n}
          </p>
          <h3 className="font-display text-base font-bold text-paper-50 sm:text-lg">{title}</h3>
        </div>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-paper-100/60 sm:text-sm">{desc}</p>
      {children}
    </motion.article>
  );
}

const HW1_CHIPS = ["I'd like some ", "Can I have a ", "Can I have some "];
const HW2_CHIPS = [
  "Buyer: I'd like some ",
  "Seller: How many?",
  "Buyer: Six, please.",
  "Seller: Would you like some ",
  "Seller: Here you are.",
  "Buyer: Thank you!",
];

export function Homework({ onOpenPhoto }: { onOpenPhoto: () => void }) {
  const hw1 = useSaved("dossier-hw1");
  const hw2 = useSaved("dossier-hw2");
  const hw3 = useSaved("dossier-hw3");

  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const gapScore = HW_GAPS.filter((g, i) => picks[i] === g.answer).length;
  const allPicked = Object.keys(picks).length === HW_GAPS.length;

  const append = (setter: (v: string) => void, cur: string, chip: string) => {
    setter(cur ? (cur.endsWith("\n") || cur.endsWith(" ") ? cur + chip : cur + "\n" + chip) : chip);
  };

  const textareaCls =
    "w-full rounded-2xl border-2 border-night-600 bg-night-950/80 p-4 font-display text-[13px] font-medium leading-relaxed text-paper-100 outline-none transition placeholder:text-paper-100/30 focus:border-berry-500 sm:text-sm";

  const counter = (t: string, min: number) => (
    <span
      className={cn(
        "text-[11px] font-bold uppercase tracking-wider",
        lineCount(t) >= min ? "text-leaf-400" : "text-paper-100/40",
      )}
    >
      строк: ~{lineCount(t)} / мин. {min}
    </span>
  );

  return (
    <Section
      id="homework"
      index="ДЗ"
      kicker="После миссии"
      title="Домашняя база агента"
      minutes="на выходные"
      intro="Четыре новых задания — с другими фразами, чем на уроке. Пиши прямо здесь и нажимай «Сохранить»: досье запомнит твои ответы. Можно и переписать в тетрадь."
      tone="hw"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {/* HW1 */}
        <HwCard
          n="1"
          icon={NotebookPen}
          title="Письменные запросы"
          desc="Напиши 6–8 своих предложений-запросов для рынка. Используй I'd like… и Can I have… Нажимай на фишки, чтобы начать строку."
        >
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {HW1_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => append(hw1.setText, hw1.text, c)}
                className="inline-flex items-center gap-1 rounded-lg border border-night-600 bg-night-800 px-2.5 py-1.5 text-[11px] font-semibold text-ripple-300 transition hover:border-berry-500 hover:text-paper-50"
              >
                <Plus className="h-3 w-3" /> {c.trim()}…
              </button>
            ))}
          </div>
          <textarea
            rows={6}
            value={hw1.text}
            onChange={(e) => hw1.setText(e.target.value)}
            placeholder={"I'd like some coconuts, please.\nCan I have some grapes, please.\n…"}
            className={textareaCls}
          />
          <div className="mt-2.5 flex items-center justify-between">
            {counter(hw1.text, 6)}
            <SaveBtn onClick={hw1.save} saved={hw1.saved} />
          </div>
        </HwCard>

        {/* HW2 */}
        <HwCard
          n="2"
          icon={MessagesSquare}
          title="Мини-диалог"
          desc="Составь диалог на 6–8 реплик между покупателем (Buyer) и продавцом (Seller): фрукты, овощи или смешанный заказ."
        >
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {HW2_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => append(hw2.setText, hw2.text, c)}
                className="inline-flex items-center gap-1 rounded-lg border border-night-600 bg-night-800 px-2.5 py-1.5 text-[11px] font-semibold text-ripple-300 transition hover:border-berry-500 hover:text-paper-50"
              >
                <Plus className="h-3 w-3" /> {c}
              </button>
            ))}
          </div>
          <textarea
            rows={6}
            value={hw2.text}
            onChange={(e) => hw2.setText(e.target.value)}
            placeholder={"Buyer: I'd like some peas, please.\nSeller: How many?\n…"}
            className={textareaCls}
          />
          <div className="mt-2.5 flex items-center justify-between">
            {counter(hw2.text, 6)}
            <SaveBtn onClick={hw2.save} saved={hw2.saved} />
          </div>
        </HwCard>

        {/* HW3 */}
        <HwCard
          n="3"
          icon={Camera}
          title="Что я вижу на фото"
          desc="Открой фото рынка и напиши 6 предложений: что ты видишь и что хочешь купить. Например: «I can see peppers. I'd like some mangoes.»"
        >
          <button
            onClick={onOpenPhoto}
            className="group relative mb-3 block w-full overflow-hidden rounded-2xl"
          >
            <img
              src={MARKET_IMG}
              alt="Фото плавучего рынка для домашнего задания"
              className="aspect-[16/7] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-night-950/30 transition group-hover:bg-night-950/10" />
            <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-night-950/70 px-2.5 py-1.5 text-[11px] font-bold text-paper-50 backdrop-blur">
              Открыть фото крупно
            </span>
          </button>
          <textarea
            rows={5}
            value={hw3.text}
            onChange={(e) => hw3.setText(e.target.value)}
            placeholder={"I can see bananas and mangoes.\nI'd like six bananas, please.\n…"}
            className={textareaCls}
          />
          <div className="mt-2.5 flex items-center justify-between">
            {counter(hw3.text, 6)}
            <SaveBtn onClick={hw3.save} saved={hw3.saved} />
          </div>
        </HwCard>

        {/* HW4 */}
        <HwCard
          n="4"
          icon={Puzzle}
          title="Заполни пропуски"
          desc="Шесть коротких диалогов — в каждом одно слово потерялось. Выбери его из списка и нажми «Проверить»."
        >
          <ol className="space-y-3">
            {HW_GAPS.map((g, i) => {
              const picked = picks[i];
              const right = checked && picked === g.answer;
              const wrongPick = checked && picked !== undefined && picked !== g.answer;
              return (
                <li
                  key={i}
                  className={cn(
                    "rounded-2xl border-2 p-3.5 transition",
                    right
                      ? "border-leaf-500/60 bg-leaf-500/10"
                      : wrongPick
                        ? "border-coral-500/50 bg-coral-500/5"
                        : "border-night-600 bg-night-900/60",
                  )}
                >
                  <p className="font-display text-[12.5px] font-semibold leading-relaxed text-paper-100 sm:text-[13px]">
                    {g.before}{" "}
                    <select
                      value={picked ?? ""}
                      disabled={checked && picked === g.answer}
                      onChange={(e) => {
                        setPicks({ ...picks, [i]: Number(e.target.value) });
                        setChecked(false);
                      }}
                      className={cn(
                        "mx-1 rounded-lg border px-2 py-1.5 text-[12px] font-bold outline-none transition",
                        right
                          ? "border-leaf-500 bg-leaf-500 text-white"
                          : wrongPick
                            ? "border-coral-500 bg-night-950 text-coral-400"
                            : "border-berry-500/60 bg-night-950 text-berry-500 focus:border-berry-500",
                      )}
                    >
                      <option value="" disabled>
                        ···
                      </option>
                      {g.options.map((o, oi) => (
                        <option key={o} value={oi}>
                          {o}
                        </option>
                      ))}
                    </select>{" "}
                    {g.after}
                  </p>
                  <p className="mt-1.5 pl-1 text-[11px] italic text-paper-100/45">Seller: {g.reply}</p>
                  {wrongPick && (
                    <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-coral-400">
                      <CircleAlert className="h-3 w-3" /> Верно: «{g.options[g.answer]}»
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex items-center justify-between">
            {checked ? (
              <span className="font-display text-xs font-bold text-leaf-400">
                Результат: {gapScore} / {HW_GAPS.length}
              </span>
            ) : (
              <span className="text-[11px] font-bold uppercase tracking-wider text-paper-100/40">
                выбрано {Object.keys(picks).length} / {HW_GAPS.length}
              </span>
            )}
            <div className="flex gap-2">
              {checked && (
                <button
                  onClick={() => {
                    setPicks({});
                    setChecked(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-night-600 px-4 py-2.5 text-xs font-bold text-paper-100/70 transition hover:border-coral-500 hover:text-coral-400"
                >
                  <X className="h-3.5 w-3.5" /> Сброс
                </button>
              )}
              <button
                onClick={() => allPicked && setChecked(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition",
                  allPicked
                    ? "bg-berry-500 text-white hover:bg-berry-500/85"
                    : "cursor-not-allowed bg-night-700 text-paper-100/30",
                )}
              >
                <Check className="h-3.5 w-3.5" /> Проверить
              </button>
            </div>
          </div>
        </HwCard>
      </div>
    </Section>
  );
}

function SaveBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition",
        saved ? "bg-leaf-500 text-white" : "bg-sun-500 text-night-950 hover:bg-sun-400",
      )}
    >
      {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
      {saved ? "Сохранено" : "Сохранить"}
    </button>
  );
}
