/* ---------------------------------------------------------------
   Контент урока: Academy Stars 2, Unit 8 Lesson 7
   Listening — identify specific information
   Speaking — ask for things in a shop or market
---------------------------------------------------------------- */

export type FruitId =
  | "bananas"
  | "coconuts"
  | "watermelon"
  | "mangoes"
  | "lemons"
  | "peppers"
  | "onions"
  | "grapes"
  | "potato"
  | "peas"
  | "carrots";

export interface Fruit {
  id: FruitId;
  en: string;
  ru: string;
  plural: boolean; // some mangoes / a watermelon
}

export const FRUITS: Record<FruitId, Fruit> = {
  bananas: { id: "bananas", en: "bananas", ru: "бананы", plural: true },
  coconuts: { id: "coconuts", en: "coconuts", ru: "кокосы", plural: true },
  watermelon: { id: "watermelon", en: "watermelon", ru: "арбуз", plural: false },
  mangoes: { id: "mangoes", en: "mangoes", ru: "манго", plural: true },
  lemons: { id: "lemons", en: "lemons", ru: "лимоны", plural: true },
  peppers: { id: "peppers", en: "peppers", ru: "перцы", plural: true },
  onions: { id: "onions", en: "onions", ru: "лук", plural: true },
  grapes: { id: "grapes", en: "grapes", ru: "виноград", plural: true },
  potato: { id: "potato", en: "potato", ru: "картофель", plural: false },
  peas: { id: "peas", en: "peas", ru: "горошек", plural: true },
  carrots: { id: "carrots", en: "carrots", ru: "морковь", plural: true },
};

export const RULE_VOCAB: FruitId[] = [
  "bananas",
  "coconuts",
  "watermelon",
  "mangoes",
  "lemons",
  "peppers",
  "onions",
  "grapes",
  "potato",
  "peas",
  "carrots",
];

/* ---------- Задание 1: что на фото ---------- */

export const TASK1_CORRECT: FruitId[] = [
  "bananas",
  "mangoes",
  "watermelon",
  "lemons",
  "peppers",
  "coconuts",
  "onions",
];

export const TASK1_GRID: FruitId[] = [
  "bananas",
  "grapes",
  "watermelon",
  "potato",
  "mangoes",
  "peas",
  "lemons",
  "carrots",
  "peppers",
  "onions",
  "coconuts",
];

/* ---------- Задание 2: Listening ---------- */

export interface ScriptLine {
  who: "seller" | "agent";
  text: string;
}

export const LISTENING_SCRIPT: ScriptLine[] = [
  { who: "seller", text: "Hello! Welcome to the floating market!" },
  { who: "agent", text: "Wow! It's a floating market! There are lots of boats." },
  {
    who: "seller",
    text: "Yes! And look — there are lots of fruit and vegetables. Bananas, mangoes, lemons, peppers and onions!",
  },
  { who: "agent", text: "I can see peppers and onions! And big watermelons!" },
  { who: "seller", text: "Uh-huh. What would you like?" },
  { who: "agent", text: "I'd like some bananas, please." },
  { who: "seller", text: "How many?" },
  { who: "agent", text: "Six, please." },
  { who: "seller", text: "Here you are. Would you like some mangoes?" },
  { who: "agent", text: "Yes, please. Can I have four, please?" },
  { who: "seller", text: "Four mangoes. Here you are." },
  { who: "agent", text: "Can I have a watermelon, please?" },
  { who: "seller", text: "Yes! Here you are. It's a big one!" },
  { who: "agent", text: "Thank you! And I'd like some lemons, please." },
  { who: "seller", text: "How many?" },
  { who: "agent", text: "Five, please." },
  { who: "seller", text: "Here you are!" },
  { who: "agent", text: "Thank you very much!" },
];

export type ListenQ =
  | {
      kind: "mc";
      q: string;
      options: string[];
      answer: number;
      hint: string;
    }
  | { kind: "tf"; q: string; answer: boolean; hint: string }
  | { kind: "input"; q: string; accept: string[]; placeholder: string; hint: string };

export const LISTENING_QUESTIONS: ListenQ[] = [
  {
    kind: "mc",
    q: "Where is the agent? (Где агент?)",
    options: ["At a school", "At a floating market", "At a toy shop"],
    answer: 1,
    hint: "It's a floating market.",
  },
  {
    kind: "mc",
    q: "What can he see on the water? (Что он видит на воде?)",
    options: ["Lots of cars", "Lots of boats", "Lots of shops"],
    answer: 1,
    hint: "There are lots of boats.",
  },
  {
    kind: "mc",
    q: "How many bananas does he buy? (Сколько бананов?)",
    options: ["Five", "Four", "Six"],
    answer: 2,
    hint: "Six, please.",
  },
  {
    kind: "mc",
    q: "How many mangoes does he buy? (Сколько манго?)",
    options: ["Four", "Six", "Seven"],
    answer: 0,
    hint: "Can I have four, please?",
  },
  {
    kind: "tf",
    q: "The agent buys a watermelon. (Агент покупает арбуз.)",
    answer: true,
    hint: "Can I have a watermelon, please? — Yes!",
  },
  {
    kind: "tf",
    q: "The agent buys some peppers and onions. (Он покупает перцы и лук.)",
    answer: false,
    hint: "He sees them, but he buys bananas, mangoes, a watermelon and lemons.",
  },
  {
    kind: "input",
    q: "How many lemons does he buy? (Сколько лимонов? Напиши слово или цифру.)",
    accept: ["five", "5", "five lemons", "5 lemons"],
    placeholder: "five",
    hint: "Five, please.",
  },
  {
    kind: "input",
    q: "What does he buy first? (Что он покупает первым?)",
    accept: ["bananas", "banana", "some bananas", "the bananas"],
    placeholder: "bananas",
    hint: "I'd like some bananas, please.",
  },
];

/* ---------- Задание 3: Speaking-тренажёр ---------- */

export interface SpeakTurn {
  seller: string;
  options: string[];
  correct: number;
  buy?: { icon: FruitId; label: string };
}

export const SPEAK_TURNS: SpeakTurn[] = [
  {
    seller: "Hello! Welcome to my boat! Would you like some fruit?",
    options: [
      "I like boats.",
      "I'd like some bananas, please.",
      "There are lots of lemons.",
    ],
    correct: 1,
    buy: { icon: "bananas", label: "bananas" },
  },
  {
    seller: "How many?",
    options: ["Yes, please.", "Four coconuts.", "Can I have six, please."],
    correct: 2,
    buy: { icon: "bananas", label: "six" },
  },
  {
    seller: "Here you are! Anything else?",
    options: [
      "How many?",
      "Thank you.",
      "Can I have a watermelon, please?",
    ],
    correct: 2,
    buy: { icon: "watermelon", label: "a watermelon" },
  },
  {
    seller: "OK! Would you like some mangoes?",
    options: [
      "No, thanks.",
      "It's a floating market.",
      "I'd like some mangoes, please.",
    ],
    correct: 2,
    buy: { icon: "mangoes", label: "mangoes" },
  },
  {
    seller: "How many?",
    options: ["Five, please.", "Here you are.", "Four, please."],
    correct: 2,
    buy: { icon: "mangoes", label: "four" },
  },
  {
    seller: "Here you are! Look at these lemons — they are great!",
    options: [
      "I can see lemons.",
      "Can I have some lemons, please?",
      "Would you like lemons?",
    ],
    correct: 1,
    buy: { icon: "lemons", label: "lemons" },
  },
  {
    seller: "How many?",
    options: ["Six, please.", "Yes, please.", "Five, please."],
    correct: 2,
    buy: { icon: "lemons", label: "five" },
  },
  {
    seller: "Here you are!",
    options: ["Goodbye!", "Here you are.", "Thank you."],
    correct: 2,
  },
];

export const SHOPPING_LIST: { icon: FruitId; label: string }[] = [
  { icon: "bananas", label: "bananas — six" },
  { icon: "watermelon", label: "a watermelon" },
  { icon: "mangoes", label: "mangoes — four" },
  { icon: "lemons", label: "lemons — five" },
];

/* ---------- Задание 4: свой заказ ---------- */

export const ORDER_ITEMS: FruitId[] = [
  "bananas",
  "mangoes",
  "lemons",
  "coconuts",
  "peppers",
  "onions",
  "grapes",
  "watermelon",
];

export const ORDER_MIN = 4;
export const ORDER_MAX = 6;

export const NUM_WORDS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
];

/* ---------- Финальная проверка ---------- */

export interface FinalQ {
  mode: "gap" | "choose";
  before?: string;
  after?: string;
  prompt: string;
  ru: string;
  options: string[];
  answer: number;
}

export const FINAL_QUESTIONS: FinalQ[] = [
  {
    mode: "gap",
    before: "",
    after: " some bananas, please.",
    prompt: "Дополни фразу:",
    ru: "Попроси бананы.",
    options: ["I like", "I'd like", "I can see"],
    answer: 1,
  },
  {
    mode: "choose",
    prompt: "Как попросить ОДИН арбуз?",
    ru: "Выбери правильную фразу.",
    options: [
      "Can I have a watermelon, please?",
      "Can I have a watermelons, please?",
      "I'd like a watermelons, please.",
    ],
    answer: 0,
  },
  {
    mode: "gap",
    before: "— Would you like some mangoes? — ",
    after: "",
    prompt: "Что ответит покупатель? Он хочет манго.",
    ru: "Yes = да.",
    options: ["No, thanks.", "Here you are.", "Yes, please."],
    answer: 2,
  },
  {
    mode: "gap",
    before: "— How ",
    after: " bananas? — Six, please.",
    prompt: "Дополни вопрос продавца:",
    ru: "Сколько?",
    options: ["much", "many", "old"],
    answer: 1,
  },
  {
    mode: "choose",
    prompt: "Продавец даёт тебе фрукты и говорит…",
    ru: "Выбери фразу продавца.",
    options: [
      "There are lots of boats.",
      "Here you are.",
      "I can see peppers.",
    ],
    answer: 1,
  },
  {
    mode: "gap",
    before: "Thank ",
    after: "!",
    prompt: "Поблагодари продавца:",
    ru: "Спасибо!",
    options: ["your", "you", "are"],
    answer: 1,
  },
];

/* ---------- Карточки правил ---------- */

export interface RuleRow {
  en: string;
  ru: string;
  icon?: FruitId;
}

export const RULE_CARD_1: RuleRow[] = [
  { en: "I'd like some bananas, please.", ru: "Я бы хотел(а) бананы, пожалуйста.", icon: "bananas" },
  { en: "Can I have a watermelon, please?", ru: "Можно мне арбуз, пожалуйста?", icon: "watermelon" },
  { en: "How many?", ru: "Сколько? — спрашивает продавец" },
  { en: "Six, please. / Four, please. / Five, please.", ru: "Шесть / четыре / пять, пожалуйста." },
  { en: "Here you are.", ru: "Вот, возьми. — говорит продавец" },
  { en: "Thank you.", ru: "Спасибо." },
];

export const RULE_CARD_2: RuleRow[] = [
  { en: "Would you like some mangoes?", ru: "Хочешь манго?", icon: "mangoes" },
  { en: "Yes, please. / No, thanks.", ru: "Да, пожалуйста. / Нет, спасибо." },
  { en: "There are lots of boats.", ru: "Здесь много лодок." },
  { en: "It's a floating market.", ru: "Это плавучий рынок." },
  { en: "I can see peppers and onions.", ru: "Я вижу перцы и лук.", icon: "peppers" },
];

/* ---------- ДЗ 4: пропуски в диалогах ---------- */

export interface HwGap {
  lines: { who: "B" | "S"; before: string; after: string; gap: boolean }[];
  options: string[];
  answer: number;
}

export const HW_GAPS: {
  options: string[];
  answer: number;
  before: string;
  after: string;
  reply: string;
}[] = [
  {
    before: "I'd like some",
    after: ", please.",
    options: ["boats", "onions", "water"],
    answer: 1,
    reply: "Here you are.",
  },
  {
    before: "Can I",
    after: "three coconuts, please?",
    options: ["have", "am", "see"],
    answer: 0,
    reply: "Yes! Here you are.",
  },
  {
    before: "— Would you like some peas? —",
    after: "",
    options: ["How many?", "No, thanks.", "It's a boat."],
    answer: 1,
    reply: "OK! Would you like some carrots?",
  },
  {
    before: "—",
    after: "peppers? — Three, please.",
    options: ["How many", "What colour", "Where are"],
    answer: 0,
    reply: "Here you are.",
  },
  {
    before: "I'd like some",
    after: ", please. — How many? — Seven, please.",
    options: ["grapes", "rivers", "markets"],
    answer: 0,
    reply: "Seven grapes. Here you are!",
  },
  {
    before: "—",
    after: "a potato, please? — Here you are.",
    options: ["I can see", "Can I have", "There are"],
    answer: 1,
    reply: "Thank you very much!",
  },
];

/* ---------- Навигация ---------- */

export const NAV = [
  { id: "mission", label: "Вход" },
  { id: "task1", label: "Лексика" },
  { id: "task2", label: "Слушаем" },
  { id: "task3", label: "Говорим" },
  { id: "task4", label: "Заказ" },
  { id: "final", label: "Финал" },
  { id: "homework", label: "ДЗ" },
];

export const PLAN = [
  { id: "task1", n: "01", title: "Разведка", sub: "Лексика рынка", min: "5 мин" },
  { id: "task2", n: "02", title: "Прослушка", sub: "Listening", min: "10 мин" },
  { id: "task3", n: "03", title: "Операция «Продавец»", sub: "Speaking", min: "12 мин" },
  { id: "task4", n: "04", title: "Свой заказ", sub: "Speaking / Writing", min: "5 мин" },
  { id: "final", n: "05", title: "Проверка досье", sub: "Финальный микс", min: "4 мин" },
  { id: "homework", n: "ДЗ", title: "Домашняя база", sub: "4 задания", min: "дома" },
];
