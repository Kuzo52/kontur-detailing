"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Детейлинг-полировка",
    text: "Сводим видимые риски к минимуму, сохраняя безопасную толщину лака. Возвращаем чистую геометрию отражения и глубину цвета.",
    meta: "от 18 000 ₽ · 1–2 дня",
  },
  {
    number: "02",
    title: "Керамическая защита 9H",
    text: "Глубокий мокрый глянец, плотный гидрофоб и защита лака от реагентов, битума и жёсткой дорожной химии.",
    meta: "от 35 000 ₽ · 2 дня",
  },
  {
    number: "03",
    title: "Химчистка и реставрация кожи",
    text: "Реставрация кожи по заводской технологии с подбором оригинального колера, восстановлением фактуры и матового финиша.",
    meta: "от 22 000 ₽ · 1–3 дня",
  },
  {
    number: "04",
    title: "Оклейка полиуретаном",
    text: "Закрываем уязвимые зоны по лекалам без ножа на кузове. Плёнка принимает удар и самостоятельно затягивает мелкие риски.",
    meta: "от 95 000 ₽ · 3–5 дней",
  },
];

const processSteps = [
  ["Световая карта", "Проверяем лак толщиномером и проявочным светом. Отмечаем глубокие риски, сколы и зоны прежнего ремонта."],
  ["Технологическая карта", "Фиксируем материалы, этапы, цену и срок. Никаких дополнительных работ без согласования."],
  ["Работа по зонам", "Подбираем связку пасты и круга под конкретный лак. После каждого прохода контролируем остаточную толщину."],
  ["Приёмка в свете", "Показываем кузов под тёплым и холодным светом, выдаём регламент мойки и гарантийный талон."],
];

const spring = { type: "spring", stiffness: 420, damping: 28 };

function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  return (
    <motion.span
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-[var(--accent)]"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
    />
  );
}

function AnimatedHeading({ children, className, level = 2 }) {
  const reduceMotion = useReducedMotion();
  const Heading = level === 1 ? motion.h1 : motion.h2;
  const words = children.trim().split(/\s+/);

  return (
    <Heading
      className={className}
      aria-label={children}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.055, delayChildren: level === 1 ? 0.08 : 0 },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: "0.55em", filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Heading>
  );
}

function EditorialManifesto() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-shell relative z-10 grid gap-8 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-32">
      <header>
        <p className="eyebrow mb-4">Позиция мастерской</p>
        <span className="block font-mono text-xs uppercase tracking-[0.18em] text-zinc-600">
          Москва · 55.7558° N
        </span>
      </header>

      <article>
        <AnimatedHeading className="max-w-4xl text-4xl font-semibold uppercase leading-[1.05] tracking-[0.035em] text-[var(--heading)] md:text-6xl">
          Не маскируем дефекты. Исправляем причину.
        </AnimatedHeading>
        <motion.blockquote
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 border-l border-[var(--accent)] pl-5 text-base leading-7 text-zinc-400 md:ml-auto md:max-w-xl"
        >
          Блеск — не самостоятельная цель. Важно сохранить толщину лака, исходную фактуру кожи
          и&nbsp;точную геометрию каждой поверхности.
        </motion.blockquote>
      </article>
    </section>
  );
}

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

function ObsessionTimeline() {
  const reduceMotion = useReducedMotion();
  const steps = [
    {
      number: "01",
      title: "Деконтаминация",
      description:
        "Многоэтапный детокс кузова. Деликатная ручная мойка pH-нейтральными составами, удаление битума и металлических вкраплений колодочной пыли, очистка пор лака импортной глиной.",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
      alt: "Деликатная ручная мойка кузова активной пеной",
    },
    {
      number: "02",
      title: "Микрохирургия ЛКП",
      description:
        "Поэтапная коррекция лака под инспекционным светом Scangrip. Обязательная толщинометрия и индивидуальный подбор связки кругов и паст. Корректируем до 95% видимых дефектов в пределах безопасной толщины лака.",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      alt: "Коррекция лакокрасочного покрытия полировальной машиной",
    },
    {
      number: "03",
      title: "Кварцевая броня",
      description:
        "Нанесение многослойной керамики 9H. Состав связывается с лаком, создавая зеркальный «мокрый» глянец, выраженный гидрофобный эффект и стойкость к дорожной химии.",
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
      alt: "Гидрофобный эффект керамической защиты кузова",
    },
  ];

  return (
    <section id="result" className="relative z-10 py-12 md:py-36">
      <header className="section-shell mb-8 max-w-3xl md:mb-12">
        <p className="eyebrow mb-4">Протокол работы</p>
        <AnimatedHeading className="text-balance text-4xl font-semibold uppercase leading-tight tracking-[0.04em] text-[var(--heading)] md:text-5xl">
          Искусство в деталях
        </AnimatedHeading>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:mt-6">
          Как мы создаём безупречный результат. Три этапа бескомпромиссной работы.
        </p>
      </header>

      <section className="scrollbar-none mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:grid md:grid-cols-3 md:gap-8 md:px-4 md:pb-6">
        {steps.map((step) => (
          <motion.article
            key={step.number}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: Number(step.number) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[4/5] w-[85vw] flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-3xl border border-white/[0.05] bg-neutral-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-full"
          >
            <img
              src={step.image}
              alt={step.alt}
              width="800"
              height="1000"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-black/40 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-90"
            />
            <section className="absolute inset-0 z-20 flex flex-col justify-between p-8">
              <span className="text-5xl font-light tracking-widest text-[var(--accent)]">{step.number}</span>
              <article>
                <h3 className="mb-2 mt-auto text-2xl font-medium uppercase tracking-wider text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-300">{step.description}</p>
              </article>
            </section>
          </motion.article>
        ))}
      </section>
    </section>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="main-canvas relative min-h-[100dvh] overflow-hidden bg-[var(--canvas)]">
      <ScrollProgress />

      <header className="section-shell relative z-20 flex items-center justify-between py-4 md:py-6">
        <a href="#hero" className="text-lg font-black tracking-[0.24em] text-white" aria-label="KONTUR — на главную">
          KONTUR
        </a>
        <nav aria-label="Основная навигация" className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#services" className="transition-colors duration-300 ease-out hover:text-white">Услуги</a>
          <a href="#result" className="transition-colors duration-300 ease-out hover:text-white">Результат</a>
          <a href="#process" className="transition-colors duration-300 ease-out hover:text-white">Подход</a>
        </nav>
        <ActionLink href="#contact" className="border border-white/[0.05] bg-white/[0.03] px-4 hover:border-[#B85C4A]/40 hover:bg-[#B85C4A]/10">
          Записаться
        </ActionLink>
      </header>

      <section id="hero" className="section-shell relative z-10 grid items-center gap-8 pb-14 pt-8 md:min-h-[calc(100dvh-96px)] md:gap-12 md:pb-24 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-[6vw] top-[8%] z-0 hidden text-[16vw] font-black leading-none tracking-[-0.08em] text-white/[0.018] lg:block"
        >
          KONTUR
        </span>

        <article className="relative z-10 max-w-3xl">
          <p className="eyebrow mb-4 md:mb-6">Студия детейлинга · Москва</p>
          <AnimatedHeading
            level={1}
            className="text-balance text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[var(--heading)]"
          >
            Сохраняем заводской характер автомобиля.
          </AnimatedHeading>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] md:mt-8 md:text-lg md:leading-8"
          >
            Исправляем дефекты лака, защищаем кузов и&nbsp;возвращаем салону исходную фактуру. Работаем точно: от&nbsp;замера толщины покрытия до&nbsp;финальной приёмки под проявочным светом.
          </motion.p>
          <footer className="mt-8 flex flex-col gap-3 md:mt-10 sm:flex-row">
            <ActionLink href="#contact" className="gap-3 bg-[#B85C4A] text-[#090D0F] shadow-[0_12px_40px_rgba(184,92,74,0.2)] hover:bg-[#C96A57]">
              Рассчитать стоимость <ArrowIcon />
            </ActionLink>
            <ActionLink href="#result" className="border border-white/[0.05] bg-white/[0.02] text-zinc-200 hover:border-white/15 hover:bg-white/[0.06]">
              Проверить работу
            </ActionLink>
          </footer>

          <dl className="mt-9 grid grid-cols-3 border-t border-white/[0.05] pt-5 md:mt-12">
            {[
              ["ЛКП", "замер"],
              ["Свет", "2 спектра"],
              ["Выдача", "с мастером"],
            ].map(([term, detail]) => (
              <div key={term} className="border-white/[0.05] pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4">
                <dt className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--accent)]">{term}</dt>
                <dd className="mt-1 text-xs text-zinc-500">{detail}</dd>
              </div>
            ))}
          </dl>
        </article>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto w-full max-w-xl lg:ml-auto"
        >
          <span aria-hidden="true" className="absolute -inset-3 rounded-[28px] border border-white/[0.05]" />
          <span className="absolute left-4 top-4 z-20 rounded-full border border-white/[0.06] bg-[#080C0E]/60 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-xl">
            Контроль поверхности · 01
          </span>
          <img
            src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=86"
            alt="Спортивный автомобиль в студии KONTUR"
            width="1200"
            height="1500"
            fetchPriority="high"
            className="hero-image aspect-[4/5] w-full rounded-[24px] object-cover object-center shadow-[0_36px_120px_rgba(0,0,0,0.55)]"
          />
          <span aria-hidden="true" className="inspection-scan absolute inset-x-4 top-1/4 z-10 h-px bg-[var(--accent)]/70 shadow-[0_0_18px_rgba(184,92,74,0.75)]" />
          <figcaption className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl px-5 py-4 text-sm">
            <span className="text-zinc-400">Финишная инспекция</span>
            <strong className="font-medium text-[var(--accent)]">Два спектра света</strong>
          </figcaption>
        </motion.figure>
      </section>

      <section aria-label="Показатели студии" className="section-shell relative z-10 grid grid-cols-2 justify-items-center border-y border-white/[0.05] py-4 md:grid-cols-4 md:py-8">
        {[
          ["7+", "лет работы"],
          ["1 200+", "кузовов принято"],
          ["9H", "твёрдость защиты"],
          ["3 года", "гарантия на состав"],
        ].map(([value, label]) => (
          <article key={label} className="flex w-full flex-col items-center justify-center border-white/[0.05] px-3 py-4 text-center even:border-l md:border-l md:py-5 md:first:border-l-0">
            <strong className="block text-center text-2xl font-semibold tracking-[0.04em] text-white md:text-3xl">{value}</strong>
            <span className="mt-2 block text-center text-[0.62rem] uppercase tracking-[0.15em] text-zinc-500">{label}</span>
          </article>
        ))}
      </section>

      <EditorialManifesto />

      <section id="services" className="relative z-10 py-16 md:py-40">
        <header className="section-shell mb-8 grid gap-4 md:mb-12 md:grid-cols-2 md:items-end md:gap-6">
          <article>
            <p className="eyebrow mb-4">Работа по материалу</p>
            <AnimatedHeading className="max-w-xl text-4xl font-semibold uppercase leading-tight tracking-[0.04em] text-[var(--heading)] md:text-5xl">
              Четыре точных дисциплины.
            </AnimatedHeading>
          </article>
          <p className="max-w-lg text-base leading-7 text-zinc-400 md:justify-self-end">
            Не продаём пакет до&nbsp;осмотра. Сначала определяем толщину лака, состояние пластика и&nbsp;историю ремонта — затем собираем технологию под конкретный автомобиль.
          </p>
        </header>

        <section className="services-track scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              whileTap={{ scale: 0.97 }}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={spring}
              className={`service-card glass flex min-h-[22rem] snap-center flex-col rounded-[24px] p-6 transition-[border-color,background-color] duration-300 ease-out hover:border-[#B85C4A]/25 hover:bg-[#111A1E] md:p-8 ${index === 0 ? "lg:col-span-2 lg:min-h-[28rem]" : ""} ${index === 3 ? "lg:col-span-2" : ""}`}
            >
              <header className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--accent)]">{service.number}</span>
                <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              </header>
              <h3 className={`mt-auto font-medium uppercase leading-tight tracking-[0.06em] text-[var(--heading)] ${index === 0 ? "max-w-xl text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>{service.title}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{service.text}</p>
              <footer className="mt-7 border-t border-white/[0.05] pt-4 text-xs font-medium text-zinc-300">{service.meta}</footer>
            </motion.article>
          ))}
        </section>
      </section>

      <ObsessionTimeline />

      <section id="process" className="section-shell relative z-10 py-16 md:py-40">
        <header className="mb-8 md:mb-14 md:max-w-2xl">
          <p className="eyebrow mb-4">Протокол KONTUR</p>
          <AnimatedHeading className="text-4xl font-semibold uppercase leading-tight tracking-[0.04em] text-[var(--heading)] md:text-5xl">
            Каждый проход имеет причину.
          </AnimatedHeading>
        </header>
        <section className="grid border-t border-white/[0.05] md:grid-cols-2">
          {processSteps.map(([title, text], index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.62, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/[0.05] py-6 md:p-10 md:first:border-r md:[&:nth-child(3)]:border-r"
            >
              <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
              <section>
                <h3 className="text-xl font-medium text-white">{title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">{text}</p>
              </section>
            </motion.article>
          ))}
        </section>
      </section>

      <section id="contact" className="section-shell relative z-10 pb-28 pt-12 md:pb-44 md:pt-20">
        <article className="relative overflow-hidden rounded-[24px] border border-white/[0.05] bg-[radial-gradient(circle_at_85%_10%,rgba(184,92,74,0.1),transparent_32%),#10171A] px-6 py-10 shadow-[0_24px_70px_rgba(0,0,0,0.2)] md:px-14 md:py-20">
          <p className="eyebrow mb-4 md:mb-5">Разбор задачи</p>
          <AnimatedHeading className="relative max-w-4xl text-balance text-4xl font-semibold uppercase leading-tight tracking-[0.04em] text-[var(--heading)] md:text-5xl">
            Сначала смотрим автомобиль. Потом называем цену.
          </AnimatedHeading>
          <p className="relative mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:mt-6">
            Напишите марку, модель и&nbsp;что именно вас беспокоит. По фотографиям обозначим диапазон стоимости, а&nbsp;окончательную технологию зафиксируем после очной диагностики.
          </p>
          <footer className="relative mt-8 flex flex-col gap-3 md:mt-10 sm:flex-row">
            <ActionLink
              href="mailto:hello@kontur-detailing.ru?subject=Запись%20на%20диагностику%20KONTUR"
              className="gap-3 bg-[#B85C4A] text-[#090D0F] shadow-[0_12px_40px_rgba(184,92,74,0.2)] hover:bg-[#C96A57]"
            >
              Отправить задачу мастеру <ArrowIcon />
            </ActionLink>
            <ActionLink href="#services" className="border border-white/[0.05] bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.07]">
              Изучить направления
            </ActionLink>
          </footer>
        </article>
      </section>

      <footer className="section-shell relative z-10 grid gap-8 border-t border-white/[0.05] pb-24 pt-8 text-sm text-zinc-500 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:pb-12 md:pt-10">
        <section>
          <strong className="text-base font-black tracking-[0.24em] text-white">KONTUR</strong>
          <p className="mt-4 max-w-sm leading-6">Полировка, защита кузова и&nbsp;реставрация салона с&nbsp;контролем материала на каждом этапе.</p>
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

      <nav aria-label="Мобильная навигация" className="safe-bottom fixed left-1/2 z-50 flex w-[min(calc(100%-2rem),25rem)] -translate-x-1/2 items-center justify-around rounded-full border border-white/5 bg-[#080C0E]/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden">
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
