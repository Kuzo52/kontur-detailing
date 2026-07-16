"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Детейлинг-полировка",
    text: "Коррекция рисок, голограмм и окисления лака с восстановлением глубины цвета.",
    meta: "от 18 000 ₽ · 1–2 дня",
  },
  {
    number: "02",
    title: "Керамическая защита 9H",
    text: "Твёрдое гидрофобное покрытие с выраженным блеском и стойкостью к дорожной химии.",
    meta: "от 35 000 ₽ · 2 дня",
  },
  {
    number: "03",
    title: "Химчистка и реставрация кожи",
    text: "Глубокая очистка салона, деликатное восстановление пигмента и защитная консервация.",
    meta: "от 22 000 ₽ · 1–3 дня",
  },
  {
    number: "04",
    title: "Оклейка полиуретаном",
    text: "Лекальная защита кузова прозрачной самовосстанавливающейся плёнкой премиального класса.",
    meta: "от 95 000 ₽ · 3–5 дней",
  },
];

const processSteps = [
  ["Диагностика", "Осматриваем лакокрасочное покрытие под направленным светом и фиксируем состояние."],
  ["Точная смета", "Согласовываем состав работ, материалы, стоимость и срок до начала процедуры."],
  ["Исполнение", "Работаем по технологическим картам и контролируем результат на каждом этапе."],
  ["Выдача", "Передаём автомобиль с рекомендациями по уходу и гарантией на защитные составы."],
];

const spring = { type: "spring", stiffness: 420, damping: 28 };

function ActionLink({ href, children, className = "", ariaLabel }) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={`inline-flex min-h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 ease-out ${className}`}
    >
      {children}
    </motion.a>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3.75 9H14.25M10.25 5L14.25 9L10.25 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container || !Number.isFinite(clientX)) return;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0) return;

    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  }, []);

  const handleMouseMove = (event) => {
    if (isDragging) updatePosition(event.clientX);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
    updatePosition(touch.clientX);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const touch = event.touches[0];
    if (!touch) return;

    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    if (deltaX > deltaY && event.cancelable) event.preventDefault();
    updatePosition(touch.clientX);
  };

  const finishDragging = () => setIsDragging(false);

  return (
    <figure
      ref={containerRef}
      className="comparison-slider relative aspect-[4/5] w-full cursor-ew-resize overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900 shadow-[0_32px_100px_rgba(0,0,0,0.45)] md:aspect-[16/9]"
      onMouseDown={(event) => {
        setIsDragging(true);
        updatePosition(event.clientX);
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={finishDragging}
      onMouseLeave={finishDragging}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={finishDragging}
      onTouchCancel={finishDragging}
      role="slider"
      aria-label="Сравнение состояния автомобиля до и после детейлинга"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setSliderPosition((value) => Math.max(0, value - 2));
        if (event.key === "ArrowRight") setSliderPosition((value) => Math.min(100, value + 2));
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
        alt="Кузов автомобиля до детейлинг-обработки"
        width="1200"
        height="900"
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
        До
      </span>

      <section
        aria-hidden="true"
        className="comparison-mask absolute inset-0"
        style={{ "--clip-right": `${100 - sliderPosition}%` }}
      >
        <img
          src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80"
          alt=""
          width="1200"
          height="900"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] backdrop-blur-md">
          После
        </span>
      </section>

      <span
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-white shadow-[0_0_24px_rgba(255,255,255,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-[#171714]/90 shadow-xl backdrop-blur-xl">
          <span className="flex items-center gap-1 text-[#C5A880]">
            <span>‹</span>
            <span>›</span>
          </span>
        </span>
      </span>
    </figure>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const blobTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[#0F0F0E]">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-[-10%] size-[34rem] rounded-full bg-[#C5A880] opacity-10 blur-[150px]"
        animate={reduceMotion ? undefined : { x: [0, 80, -30], y: [0, 60, 20], scale: [1, 1.12, 0.96] }}
        transition={blobTransition}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[20%] right-[10%] size-[30rem] rounded-full bg-[#4B5563] opacity-[0.08] blur-[150px]"
        animate={reduceMotion ? undefined : { x: [0, -70, 25], y: [0, -40, 35], scale: [1, 0.92, 1.08] }}
        transition={{ ...blobTransition, duration: 22 }}
      />

      <header className="section-shell relative z-20 flex items-center justify-between py-6">
        <a href="#hero" className="text-lg font-black tracking-[0.24em] text-white" aria-label="KONTUR — на главную">
          KONTUR
        </a>
        <nav aria-label="Основная навигация" className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#services" className="transition-colors duration-300 ease-out hover:text-white">Услуги</a>
          <a href="#result" className="transition-colors duration-300 ease-out hover:text-white">Результат</a>
          <a href="#process" className="transition-colors duration-300 ease-out hover:text-white">Подход</a>
        </nav>
        <ActionLink href="#contact" className="border border-white/10 bg-white/[0.04] px-4 hover:border-[#C5A880]/50 hover:bg-[#C5A880]/10">
          Записаться
        </ActionLink>
      </header>

      <section id="hero" className="section-shell relative z-10 grid min-h-[calc(100dvh-96px)] items-center gap-12 pb-24 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <article className="max-w-3xl">
          <p className="eyebrow mb-6">Студия детейлинга · Москва</p>
          <h1 className="text-balance text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
            KONTUR. Эстетика кузова и&nbsp;совершенство деталей.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-7 text-[#A1A1AA] md:text-lg md:leading-8">
            Студия детейлинга для тех, кто ценит безупречное состояние своего автомобиля. Профессиональная защита, реставрация и&nbsp;индивидуальный уход в&nbsp;Москве.
          </p>
          <footer className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="#contact" className="gap-3 bg-[#C5A880] text-[#11110F] shadow-[0_12px_40px_rgba(197,168,128,0.22)] hover:bg-[#D0B893]">
              Рассчитать стоимость <ArrowIcon />
            </ActionLink>
            <ActionLink href="#result" className="border border-white/10 bg-white/[0.03] text-zinc-200 hover:border-white/20 hover:bg-white/[0.07]">
              Посмотреть результат
            </ActionLink>
          </footer>
        </article>

        <figure className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <span aria-hidden="true" className="absolute -inset-3 rounded-[28px] border border-[#C5A880]/10" />
          <img
            src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=86"
            alt="Спортивный автомобиль в студии KONTUR"
            width="1200"
            height="1500"
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-[24px] object-cover object-center shadow-[0_36px_120px_rgba(0,0,0,0.55)]"
          />
          <figcaption className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-5 py-4 text-sm">
            <span className="text-zinc-400">Контроль качества</span>
            <strong className="font-medium text-[#C5A880]">Под направленным светом</strong>
          </figcaption>
        </figure>
      </section>

      <section aria-label="Показатели студии" className="section-shell relative z-10 grid grid-cols-2 border-y border-white/[0.07] py-8 md:grid-cols-4">
        {[
          ["7+", "лет практики"],
          ["1 200+", "автомобилей"],
          ["9H", "твёрдость керамики"],
          ["3 года", "гарантии"],
        ].map(([value, label]) => (
          <article key={label} className="border-white/[0.07] px-4 py-4 first:pl-0 even:border-l md:border-l md:first:border-l-0">
            <strong className="block text-2xl font-semibold tracking-tight text-white md:text-3xl">{value}</strong>
            <span className="mt-1 block text-xs text-zinc-500">{label}</span>
          </article>
        ))}
      </section>

      <section id="services" className="relative z-10 py-28 md:py-40">
        <header className="section-shell mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <article>
            <p className="eyebrow mb-4">Экспертиза</p>
            <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-6xl">
              Технологии ухода без компромиссов.
            </h2>
          </article>
          <p className="max-w-lg text-base leading-7 text-zinc-400 md:justify-self-end">
            Подбираем процедуру после диагностики покрытия. Работаем только с&nbsp;проверенными составами и&nbsp;соблюдаем регламенты производителей.
          </p>
        </header>

        <section className="services-track scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {services.map((service) => (
            <motion.article
              key={service.number}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
              className="service-card glass flex min-h-[22rem] snap-center flex-col rounded-[24px] p-6 transition-[border-color,background-color] duration-300 ease-out hover:border-[#C5A880]/30 hover:bg-[#191816]"
            >
              <header className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C5A880]">{service.number}</span>
                <span className="size-1.5 rounded-full bg-[#C5A880]" />
              </header>
              <h3 className="mt-auto text-2xl font-medium leading-tight tracking-[-0.025em] text-white">{service.title}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{service.text}</p>
              <footer className="mt-7 border-t border-white/[0.07] pt-4 text-xs font-medium text-zinc-300">{service.meta}</footer>
            </motion.article>
          ))}
        </section>
      </section>

      <section id="result" className="section-shell relative z-10 py-24 md:py-36">
        <header className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">До / После</p>
          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-6xl">
            Сила в&nbsp;деталях. Взгляните на&nbsp;разницу.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">
            Перемещайте разделитель: слева — исходное состояние, справа — восстановленная глубина и&nbsp;чистота поверхности.
          </p>
        </header>
        <ComparisonSlider />
      </section>

      <section id="process" className="section-shell relative z-10 py-28 md:py-40">
        <header className="mb-14 md:max-w-2xl">
          <p className="eyebrow mb-4">Стандарт KONTUR</p>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">Прозрачный процесс. Измеримый результат.</h2>
        </header>
        <section className="grid border-t border-white/10 md:grid-cols-2">
          {processSteps.map(([title, text], index) => (
            <article key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-8 md:p-10 md:first:border-r md:[&:nth-child(3)]:border-r">
              <span className="font-mono text-xs text-[#C5A880]">0{index + 1}</span>
              <section>
                <h3 className="text-xl font-medium text-white">{title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{text}</p>
              </section>
            </article>
          ))}
        </section>
      </section>

      <section id="contact" className="section-shell relative z-10 pb-36 pt-20 md:pb-44">
        <article className="relative overflow-hidden rounded-[24px] border border-[#C5A880]/20 bg-[#171612] px-6 py-14 shadow-[0_32px_100px_rgba(0,0,0,0.35)] md:px-14 md:py-20">
          <span aria-hidden="true" className="absolute -right-20 -top-28 size-80 rounded-full bg-[#C5A880]/10 blur-[100px]" />
          <p className="eyebrow mb-5">Предварительная запись</p>
          <h2 className="relative max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-6xl">
            Узнайте, какая защита нужна вашему автомобилю.
          </h2>
          <p className="relative mt-6 max-w-2xl text-base leading-7 text-zinc-400">
            Укажите марку, модель, год выпуска и&nbsp;желаемый результат. Мастер подготовит предварительный расчёт и&nbsp;предложит время диагностики.
          </p>
          <footer className="relative mt-10 flex flex-col gap-3 sm:flex-row">
            <ActionLink
              href="mailto:hello@kontur-detailing.ru?subject=Запись%20на%20диагностику%20KONTUR"
              className="gap-3 bg-[#C5A880] text-[#11110F] shadow-[0_12px_40px_rgba(197,168,128,0.2)] hover:bg-[#D0B893]"
            >
              Записаться на диагностику <ArrowIcon />
            </ActionLink>
            <ActionLink href="#services" className="border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.07]">
              Сверить услуги
            </ActionLink>
          </footer>
        </article>
      </section>

      <footer className="section-shell relative z-10 grid gap-10 border-t border-white/10 pb-32 pt-10 text-sm text-zinc-500 md:grid-cols-[1.4fr_1fr_1fr] md:pb-12">
        <section>
          <strong className="text-base font-black tracking-[0.24em] text-white">KONTUR</strong>
          <p className="mt-4 max-w-sm leading-6">Профессиональный детейлинг, защита и&nbsp;реставрация автомобилей в&nbsp;Москве.</p>
        </section>
        <nav aria-label="Навигация в подвале" className="flex flex-col items-start gap-3">
          <a href="#services" className="hover:text-white">Услуги</a>
          <a href="#result" className="hover:text-white">Результат</a>
          <a href="#process" className="hover:text-white">Подход</a>
        </nav>
        <section className="md:text-right">
          <a href="mailto:hello@kontur-detailing.ru" className="text-zinc-300 hover:text-white">hello@kontur-detailing.ru</a>
          <p className="mt-3">© 2026 KONTUR. Все права защищены.</p>
        </section>
      </footer>

      <nav aria-label="Мобильная навигация" className="safe-bottom fixed left-1/2 z-50 flex w-[min(calc(100%-2rem),25rem)] -translate-x-1/2 items-center justify-around rounded-full border border-white/5 bg-black/30 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden">
        {[
          ["#hero", "Главная"],
          ["#services", "Услуги"],
          ["#result", "Результат"],
          ["#contact", "Запись"],
        ].map(([href, label]) => (
          <motion.a
            key={href}
            href={href}
            whileTap={{ scale: 0.97 }}
            transition={spring}
            className="rounded-full px-3 py-2.5 text-[0.68rem] font-medium text-zinc-400 transition-colors duration-300 ease-out hover:bg-white/[0.06] hover:text-white"
          >
            {label}
          </motion.a>
        ))}
      </nav>
    </main>
  );
}
