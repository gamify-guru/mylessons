import { useCallback, useEffect, useState } from "react";
import { Footer, Header, PhotoModal, RulesModal } from "./components/chrome";
import { Hero } from "./components/Hero";
import { Homework } from "./components/Homework";
import { Task1 } from "./components/Task1";
import { Task2 } from "./components/Task2";
import { Task3 } from "./components/Task3";
import { Task4 } from "./components/Task4";
import { Task5 } from "./components/Task5";

const TASK_KEYS = ["task1", "task2", "task3", "task4", "final"] as const;
type TaskKey = (typeof TASK_KEYS)[number];

const LS_KEY = "dossier-progress-v1";

function loadProgress(): Record<TaskKey, boolean> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) throw new Error();
    return { ...emptyProgress(), ...JSON.parse(raw) };
  } catch {
    return emptyProgress();
  }
}

const emptyProgress = (): Record<TaskKey, boolean> => ({
  task1: false,
  task2: false,
  task3: false,
  task4: false,
  final: false,
});

export default function App() {
  const [done, setDone] = useState<Record<TaskKey, boolean>>(loadProgress);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rulesTab, setRulesTab] = useState(0);
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(done));
  }, [done]);

  const markDone = useCallback(
    (k: TaskKey) => setDone((d) => (d[k] ? d : { ...d, [k]: true })),
    [],
  );

  const openRules = useCallback((tab: number) => {
    setRulesTab(tab);
    setRulesOpen(true);
  }, []);

  const openPhoto = useCallback(() => setPhotoOpen(true), []);

  const progress =
    TASK_KEYS.reduce((acc, k) => acc + (done[k] ? 1 : 0), 0) / TASK_KEYS.length;

  return (
    <div className="min-h-screen bg-night-950 font-body text-paper-50">
      <Header
        progress={progress}
        onOpenRules={openRules}
        onOpenPhoto={openPhoto}
      />

      <main>
        <Hero onOpenRules={() => openRules(0)} onOpenPhoto={openPhoto} />

        <Divider />

        <Task1 done={done.task1} onDone={() => markDone("task1")} onOpenPhoto={openPhoto} />

        <Divider flip />

        <Task2 done={done.task2} onDone={() => markDone("task2")} />

        <Divider />

        <Task3 done={done.task3} onDone={() => markDone("task3")} onOpenRules={openRules} />

        <Divider flip />

        <Task4 done={done.task4} onDone={() => markDone("task4")} />

        <Divider />

        <Task5 done={done.final} onDone={() => markDone("final")} />

        <div className="relative border-y border-night-700/60 bg-night-900/50">
          <Homework onOpenPhoto={openPhoto} />
        </div>
      </main>

      <Footer />

      <RulesModal
        open={rulesOpen}
        tab={rulesTab}
        onTab={setRulesTab}
        onClose={() => setRulesOpen(false)}
      />
      <PhotoModal open={photoOpen} onClose={() => setPhotoOpen(false)} />
    </div>
  );
}

/* Волнистый разделитель — «вода канала» между страницами досье */
function Divider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className="mx-auto -my-3 flex max-w-6xl justify-center px-6 opacity-30">
      <svg
        viewBox="0 0 320 14"
        className={flip ? "h-3.5 w-72 -scale-x-100 text-ripple-400" : "h-3.5 w-72 text-ripple-400"}
        fill="none"
      >
        <path
          d="M0 7 q20 -7 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
