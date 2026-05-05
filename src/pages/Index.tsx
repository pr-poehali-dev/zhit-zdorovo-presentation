import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  { id: 0, type: "title" },
  { id: 1, type: "goal" },
  { id: 2, type: "relevance" },
  { id: 3, type: "budget" },
  { id: 4, type: "participants" },
  { id: 5, type: "timeline" },
  { id: 6, type: "schedule" },
  { id: 7, type: "results" },
];

const SLIDE_LABELS = [
  "Титул", "Цель", "Актуальность", "Бюджет", "Участники", "Сроки", "График", "Результаты"
];

function useAnimated(slideIndex: number, current: number) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (slideIndex === current) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [slideIndex, current]);
  return visible;
}

/* ---- Slide Components ---- */

function TitleSlide({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full text-center overflow-hidden">
      {/* bg blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-yellow-400 opacity-20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500 opacity-20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600 opacity-10 blur-3xl" />

      <div
        className="relative z-10"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-montserrat font-700 text-sm px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          <Icon name="Zap" size={14} />
          Проект 2025
        </div>
        <h1
          className="font-oswald font-bold uppercase leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff" }}
        >
          Название<br />
          <span style={{ color: "#FFD600" }}>Проекта</span>
        </h1>
        <p
          className="font-montserrat text-white/70 max-w-xl mx-auto mb-10"
          style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", transitionDelay: "0.2s" }}
        >
          Краткое описание — суть вашего проекта в одной строке
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {["Команда проекта", "2025 год", "Ваша организация"].map((tag, i) => (
            <span
              key={i}
              className="font-montserrat border border-white/30 text-white/80 text-sm px-5 py-2 rounded-full"
              style={{ backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.08)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GoalSlide({ active }: { active: boolean }) {
  const items = [
    { icon: "Target", label: "Главная цель", text: "Сформулируйте главную цель проекта — что именно должно быть достигнуто" },
    { icon: "CheckCircle2", label: "Задача 1", text: "Первая конкретная задача, которую решает проект" },
    { icon: "CheckCircle2", label: "Задача 2", text: "Вторая задача — измеримый результат" },
    { icon: "CheckCircle2", label: "Задача 3", text: "Третья задача — конкретное действие" },
  ];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12 overflow-hidden">
      <div
        style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}
      >
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">02 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Цель &amp; <span style={{ color: "#FFD600" }}>Задачи</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 flex gap-4 items-start cursor-pointer group"
            style={{
              background: i === 0 ? "linear-gradient(135deg, #FFD600 0%, #FF6B00 100%)" : "rgba(255,255,255,0.07)",
              border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.1}s`,
              backdropFilter: "blur(10px)",
            }}
          >
            <Icon name={item.icon} fallback="CheckCircle2" size={22} className={i === 0 ? "text-gray-900 mt-0.5 shrink-0" : "text-yellow-400 mt-0.5 shrink-0"} />
            <div>
              <div className={`font-oswald font-bold text-lg mb-1 ${i === 0 ? "text-gray-900" : "text-white"}`}>{item.label}</div>
              <div className={`font-montserrat text-sm leading-relaxed ${i === 0 ? "text-gray-800" : "text-white/60"}`}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelevanceSlide({ active }: { active: boolean }) {
  const stats = [
    { value: "73%", label: "Нуждаются в решении" },
    { value: "2.4×", label: "Рост проблемы" },
    { value: "18М", label: "Затронутых людей" },
  ];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12">
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">03 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Актуальность &amp; <span style={{ color: "#FFD600" }}>Проблема</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 text-center"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,214,0,0.3)",
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.8)",
              transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.12}s`,
            }}
          >
            <div className="font-oswald font-bold text-yellow-400" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>{s.value}</div>
            <div className="font-montserrat text-white/60 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, rgba(255,107,0,0.2) 0%, rgba(255,214,0,0.1) 100%)",
          border: "1px solid rgba(255,107,0,0.4)",
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(.22,1,.36,1) 0.4s",
        }}
      >
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={22} className="text-orange-400 shrink-0 mt-0.5" />
          <p className="font-montserrat text-white/80 leading-relaxed">
            Опишите ключевую проблему: почему она существует, кто страдает, каковы последствия бездействия. Убедите аудиторию в необходимости вашего решения прямо сейчас.
          </p>
        </div>
      </div>
    </div>
  );
}

function BudgetSlide({ active }: { active: boolean }) {
  const items = [
    { label: "Оборудование", amount: "450 000 ₽", pct: 35, color: "#FFD600" },
    { label: "Персонал", amount: "385 000 ₽", pct: 30, color: "#FF6B00" },
    { label: "Маркетинг", amount: "256 000 ₽", pct: 20, color: "#FF3366" },
    { label: "Прочие расходы", amount: "192 000 ₽", pct: 15, color: "#7B61FF" },
  ];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12">
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">04 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Бюджет &amp; <span style={{ color: "#FFD600" }}>Ресурсы</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${item.color}44`,
              opacity: active ? 1 : 0,
              transform: active ? "translateX(0)" : "translateX(30px)",
              transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.1}s`,
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-oswald font-bold text-gray-900 text-lg"
              style={{ background: item.color }}>
              {item.pct}%
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-montserrat text-white/70 text-sm mb-1">{item.label}</div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: active ? `${item.pct}%` : "0%",
                    background: item.color,
                    transition: `width 1s cubic-bezier(.22,1,.36,1) ${0.3 + i * 0.1}s`,
                  }}
                />
              </div>
            </div>
            <div className="font-oswald font-bold text-white text-lg shrink-0">{item.amount}</div>
          </div>
        ))}
      </div>
      <div
        className="mt-5 rounded-2xl p-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #FFD600 0%, #FF6B00 100%)",
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(.22,1,.36,1) 0.5s",
        }}
      >
        <span className="font-oswald font-bold text-gray-900 text-xl uppercase">Итого бюджет</span>
        <span className="font-oswald font-bold text-gray-900 text-2xl">1 283 000 ₽</span>
      </div>
    </div>
  );
}

function ParticipantsSlide({ active }: { active: boolean }) {
  const team = [
    { role: "Руководитель", name: "Иванов И.И.", icon: "Crown" },
    { role: "Координатор", name: "Петрова А.В.", icon: "Users" },
    { role: "Эксперт", name: "Сидоров К.О.", icon: "Star" },
    { role: "Финансист", name: "Козлова М.Р.", icon: "DollarSign" },
  ];
  const audience = ["Предприниматели", "Молодёжь 18–35", "Государственные органы", "НКО и фонды"];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12">
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">05 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Участники &amp; <span style={{ color: "#FFD600" }}>Аудитория</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="font-montserrat text-white/50 text-xs uppercase tracking-widest mb-3">Команда проекта</div>
          <div className="space-y-3">
            {team.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.08}s`,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #FFD600, #FF6B00)" }}>
                  <Icon name={m.icon} fallback="User" size={18} className="text-gray-900" />
                </div>
                <div>
                  <div className="font-montserrat font-semibold text-white text-sm">{m.name}</div>
                  <div className="font-montserrat text-white/50 text-xs">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-montserrat text-white/50 text-xs uppercase tracking-widest mb-3">Целевая аудитория</div>
          <div className="space-y-3">
            {audience.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{
                  background: "rgba(255,214,0,0.08)",
                  border: "1px solid rgba(255,214,0,0.2)",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateX(0)" : "translateX(20px)",
                  transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.08}s`,
                }}
              >
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#FFD600" }} />
                <span className="font-montserrat text-white text-sm">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineSlide({ active }: { active: boolean }) {
  const phases = [
    { num: "01", name: "Подготовка", dur: "Январь — Март", color: "#FFD600" },
    { num: "02", name: "Запуск", dur: "Апрель — Июнь", color: "#FF6B00" },
    { num: "03", name: "Реализация", dur: "Июль — Сентябрь", color: "#FF3366" },
    { num: "04", name: "Завершение", dur: "Октябрь — Декабрь", color: "#7B61FF" },
  ];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12">
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">06 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Сроки <span style={{ color: "#FFD600" }}>Реализации</span>
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-white/10" style={{ display: "block" }} />
        <div className="space-y-4">
          {phases.map((p, i) => (
            <div
              key={i}
              className="relative flex items-center gap-5"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(-30px)",
                transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.12}s`,
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-oswald font-bold text-gray-900 text-lg shrink-0 z-10"
                style={{ background: p.color }}
              >
                {p.num}
              </div>
              <div
                className="flex-1 rounded-xl p-4 flex items-center justify-between"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${p.color}33`,
                }}
              >
                <span className="font-oswald font-bold text-white text-xl">{p.name}</span>
                <span className="font-montserrat text-white/50 text-sm">{p.dur}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleSlide({ active }: { active: boolean }) {
  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const tasks = [
    { name: "Планирование", start: 0, end: 2, color: "#FFD600" },
    { name: "Разработка", start: 2, end: 6, color: "#FF6B00" },
    { name: "Тестирование", start: 5, end: 8, color: "#FF3366" },
    { name: "Внедрение", start: 7, end: 10, color: "#7B61FF" },
    { name: "Оценка", start: 10, end: 11, color: "#00C9A7" },
  ];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12">
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">07 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Календарный <span style={{ color: "#FFD600" }}>График</span>
        </h2>
      </div>
      <div
        className="rounded-2xl p-5 overflow-x-auto"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          opacity: active ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}
      >
        <div className="min-w-[500px]">
          <div className="grid grid-cols-12 gap-1 mb-3">
            {months.map((m) => (
              <div key={m} className="font-montserrat text-white/40 text-xs text-center">{m}</div>
            ))}
          </div>
          <div className="space-y-2.5">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 font-montserrat text-white/70 text-xs shrink-0 text-right">{task.name}</div>
                <div className="flex-1 relative h-7">
                  <div className="absolute inset-0 grid grid-cols-12 gap-1">
                    {months.map((_, mi) => (
                      <div key={mi} className="h-full rounded bg-white/5" />
                    ))}
                  </div>
                  <div
                    className="absolute top-0 bottom-0 rounded-lg"
                    style={{
                      left: `calc(${(task.start / 12) * 100}% + 2px)`,
                      width: active ? `calc(${((task.end - task.start) / 12) * 100}% - 4px)` : "0%",
                      background: `linear-gradient(90deg, ${task.color}, ${task.color}99)`,
                      transition: `width 0.8s cubic-bezier(.22,1,.36,1) ${0.3 + i * 0.1}s`,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <span className="font-montserrat text-gray-900 text-xs font-semibold whitespace-nowrap overflow-hidden">{task.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsSlide({ active }: { active: boolean }) {
  const results = [
    { icon: "TrendingUp", label: "Охват аудитории", value: "50 000+", color: "#FFD600" },
    { icon: "Award", label: "Новых рабочих мест", value: "120", color: "#FF6B00" },
    { icon: "BarChart2", label: "Рост показателей", value: "3.2×", color: "#FF3366" },
    { icon: "Heart", label: "Партнёров", value: "25+", color: "#7B61FF" },
  ];
  return (
    <div className="flex flex-col h-full justify-center px-4 md:px-12">
      <div style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(-40px)", transition: "all 0.7s cubic-bezier(.22,1,.36,1)" }}>
        <span className="font-montserrat text-yellow-400 uppercase tracking-widest text-sm font-semibold">08 / 08</span>
        <h2 className="font-oswald font-bold uppercase text-white mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1 }}>
          Ожидаемые <span style={{ color: "#FFD600" }}>Результаты</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {results.map((r, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 text-center flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `2px solid ${r.color}44`,
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.1}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.1}s, scale 0.2s`,
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${r.color}22` }}>
              <Icon name={r.icon} fallback="Star" size={24} style={{ color: r.color }} />
            </div>
            <div className="font-oswald font-bold text-white" style={{ fontSize: "2rem", color: r.color }}>{r.value}</div>
            <div className="font-montserrat text-white/60 text-xs leading-tight">{r.label}</div>
          </div>
        ))}
      </div>
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: "linear-gradient(135deg, #FFD600 0%, #FF6B00 100%)",
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(.22,1,.36,1) 0.5s",
        }}
      >
        <div className="font-oswald font-bold text-gray-900 text-2xl uppercase mb-1">Готовы к реализации!</div>
        <div className="font-montserrat text-gray-800 text-sm">Проект подготовлен и ждёт вашего старта</div>
      </div>
    </div>
  );
}

const SLIDE_COMPONENTS = [
  TitleSlide,
  GoalSlide,
  RelevanceSlide,
  BudgetSlide,
  ParticipantsSlide,
  TimelineSlide,
  ScheduleSlide,
  ResultsSlide,
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = (idx: number) => {
    if (animating || idx === current || idx < 0 || idx >= slides.length) return;
    setDir(idx > current ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350);
  };

  const goNext = () => goTo(current + 1);
  const goPrev = () => goTo(current - 1);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, animating]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) { if (dx < 0) goNext(); else goPrev(); }
    touchStartX.current = null;
  };

  const SlideComp = SLIDE_COMPONENTS[current];

  return (
    <div
      className="fixed inset-0 flex flex-col select-none"
      style={{ background: "#0A0A0F", fontFamily: "Montserrat, sans-serif" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header nav dots */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FFD600" }}>
            <Icon name="Presentation" size={14} className="text-gray-900" />
          </div>
          <span className="font-oswald text-white/60 text-sm uppercase tracking-wider hidden md:block">Презентация</span>
        </div>

        {/* Slide dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={SLIDE_LABELS[i]}
              className="relative group"
              style={{ padding: "4px" }}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  background: i === current ? "#FFD600" : "rgba(255,255,255,0.25)",
                }}
              />
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-montserrat text-white/60 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {SLIDE_LABELS[i]}
              </span>
            </button>
          ))}
        </div>

        <div className="font-oswald text-white/40 text-sm">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Slide area */}
      <div className="relative flex-1 overflow-hidden">
        <div
          key={current}
          className="absolute inset-0"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? dir === "next" ? "translateX(-30px)" : "translateX(30px)"
              : "translateX(0)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <SlideComp active={!animating} />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="relative z-20 flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-2 font-montserrat text-sm font-semibold rounded-xl px-5 py-2.5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
          style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <Icon name="ChevronLeft" size={18} />
          Назад
        </button>

        {/* Progress bar */}
        <div className="flex-1 mx-6 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((current + 1) / slides.length) * 100}%`,
              background: "linear-gradient(90deg, #FFD600, #FF6B00)",
            }}
          />
        </div>

        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 font-montserrat text-sm font-semibold rounded-xl px-5 py-2.5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
          style={{ background: "linear-gradient(135deg, #FFD600, #FF6B00)", color: "#111" }}
        >
          Вперёд
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>
    </div>
  );
}