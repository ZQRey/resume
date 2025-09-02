import React, { useEffect, useMemo, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import myPhoto from "./assets/me.jpg";


// =====================
// ВСПОМОГАТЕЛЬНЫЕ ДАННЫЕ
// =====================
const COLORS = {
  bg: "#F9F9F9",
  text: "#111827",
  primary: "#1E3A8A",
  accent: "#06B6D4",
};

const skills = [
  {
    group: "Администрирование серверов",
    items: [
      { name: "Windows Server (AD, DNS, DHCP, IIS, WSUS, GPO, SCCM)", level: 90 },
      { name: "Linux (базовое администрирование)", level: 60 },
      { name: "VMware (виртуализация)", level: 45 },
      { name: "Veeam Backup (резервное копирование)", level: 85 },
    ],
  },
  {
    group: "Сетевые технологии",
    items: [
      { name: "MikroTik (CAPsMAN, DHCP, Port Forwarding, Firewall, Honeypot)", level: 90 },
      { name: "TP-Link / Cisco / D-Link / HP: L2, VLAN, Loop Protect", level: 80 },
      { name: "Проектирование и прокладка локальных сетей", level: 85 },
      { name: "Zabbix (мониторинг)", level: 65 },
      { name: "Видеонаблюдение (Dahua, HiWatch)", level: 75 },
    ],
  },
  {
    group: "Программирование и автоматизация",
    items: [
      { name: "Python (скрипты автоматизации)", level: 65 },
      { name: "PowerShell (автоматизация Windows)", level: 45 },
      { name: "C# (Desktop)", level: 60 },
      { name: "Java (вспомогательные утилиты)", level: 40 },
      { name: "SQL (основы)", level: 40 },
    ],
  },
];

const experience = [
  {
    company: "КГП \"Поликлиника №4 г. Темиртау\"",
    period: "Январь 2025 — настоящее время",
    role: "Программист СА",
    duties: [
      "Администрирование и поддержка серверов на базе Windows Server и Linux.",
      "Техническая поддержка пользователей и решение инцидентов.",
      "Администрирование Windows SCCM (управление обновлениями, инвентаризация, деплой ПО).",
      "Управление и настройка локальных сетей.",
    ],
    achievements: [
      "Внедрил Windows SCCM, что улучшило качество обслуживания пользователей и управления инфраструктурой.",
      "Интегрировал несколько филиалов в единую сеть через VPN, обеспечив надёжный и безопасный обмен данными.",
      "Мигрировал виртуальные машины на новый физический сервер, повысив производительность и отказоустойчивость.",
    ],
  },
  {
    company: "КГП на ПХВ \"Многопрофильная больница г. Темиртау\" УЗКО",
    period: "Декабрь 2024 — Март 2025",
    role: "Программист",
    duties: [
      "Мониторинг и администрирование серверной инфраструктуры (Zabbix, VMware, Windows Server, Linux).",
      "Настройка, управление и поддержка сетевого оборудования (MikroTik, TP-Link, D-Link, HP).",
      "Разработка скриптов на Python и PowerShell для автоматизации рабочих процессов.",
      "Консультирование сотрудников по вопросам использования программного обеспечения.",
    ],
    achievements: [
      "Автоматизировал процесс выдачи учётных данных сотрудникам для доступа к корпоративным системам, сократив время обработки и минимизировав ошибки.",
    ],
  },
  {
    company: "КГП \"Поликлиника №1 г. Темиртау\"",
    period: "Май 2017 — Декабрь 2024",
    role: "Программист",
    duties: [
      "Управление серверной и сетевой инфраструктурой (MikroTik, Windows Server, Linux, HP, TP-Link).",
      "Настройка, обслуживание и ремонт IT-оборудования.",
      "Обеспечение информационной безопасности и проведение обучений для сотрудников.",
      "Администрирование телефонии Asterisk (FreePBX).",
      "Управление системой резервного копирования Veeam Backup.",
      "Поддержка и настройка системы мониторинга Zabbix.",
    ],
    achievements: [
      "Автоматизировал процесс управления системой отправки анализов, что снизило вероятность ошибок и ускорило обработку данных.",
      "Оптимизировал работу электронной очереди, сократив время ожидания пациентов.",
      "Реализовал проект модернизации системы видеонаблюдения и локальной сети: аудит, проектирование, подбор оборудования, организация и контроль работ — качество видеозаписей и внутренняя коммуникация улучшены.",
    ],
  },
  {
    company: "Производственная база ТОО \"Новая поликлиника\"",
    period: "Январь 2023 — Декабрь 2023",
    role: "Системный администратор",
    duties: [
      "Мониторинг, настройка и администрирование серверов и сетевого оборудования (MikroTik, Cisco).",
      "Подбор, закупка и внедрение IT-оборудования.",
      "Проектирование и построение серверной инфраструктуры с нуля.",
    ],
    achievements: [
      "Внедрил систему удалённого администрирования, что сократило расходы на обслуживание и упростило поддержку филиалов.",
      "Реализовал безопасный доступ по VPN к корпоративным ресурсам и файловым хранилищам, обеспечив надёжную работу распределённых офисов.",
    ],
  },
];

const projects = [
  {
    title: "Внедрение Windows SCCM",
    short: "Автоматизация обновлений, деплоя ПО и инвентаризации.",
    details:
      "Спроектировал и развернул SCCM: базовая архитектура, распределение ролей, коллекции, автоматизация обновлений и деплоев, отчётность. Сократил ручные операции и повысил прозрачность управления парком ПК.",
  },
  {
    title: "Модернизация системы видеонаблюдения",
    short: "Повышение качества видеозаписей и доступности архивов.",
    details:
      "Провёл аудит, разработал проект, подобрал оборудование, организовал работы и внедрение. Обеспечил масштабируемость, надёжность и удобный доступ к архивам.",
  },
  {
    title: "Модернизация локальной сети",
    short: "Повышение качества и скорости работы внутри организации.",
    details:
      "Провёл аудит, разработал проект, подобрал оборудование, организовал работы и внедрение. Обеспечил масштабируемость, надёжность и удобный доступ к системе.",
  },
  {
    title: "VPN-интеграция филиалов",
    short: "Безопасная связность офисов и доступ к ресурсам.",
    details:
      "Построил единую VPN-топологию между филиалами на MikroTik/Cisco, реализовал политики безопасности, обеспечил стабильный канал для внутренних сервисов и файловых хранилищ.",
  },
  {
    title: "Автоматизация выдачи учётных данных",
    short: "Сокращение времени обработки заявок и ошибок.",
    details:
      "Разработал веб приложение (PowerShell/Python (Flask)) для шаблонного создания учётных записей, назначения прав и уведомлений. Снизил человеческий фактор и ускорил онбординг сотрудников.",
  },
  {
    title: "Мониторин инфраструктуры организации",
    short: "Сокращение времени простоев в работе и устранение критических ошибок.",
    details:
      "Установка и администрирование системы мониторинга Zabbix, настройка триггеров и уведомлений, создание дашбордов для визуализации состояния инфраструктуры. Оперативное реагирование и устранение критических ошибок до того как они произойдут.",
  },
];

// =====================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// =====================
const Section = ({ id, title, children }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-8"
      style={{ color: COLORS.text }}
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

const Tag = ({ children }) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-sm border mr-2 mb-2"
    style={{ borderColor: COLORS.accent, color: COLORS.primary }}
  >
    {children}
  </span>
);

const Progress = ({ value }) => {
  const controls = useAnimation();
  const [ref, inView] = [React.useRef(null), useInView({ amount: 0.4, once: true })];
  // привязка ref
  useEffect(() => {
    if (ref.current) {
      // noop
    }
  }, []);
  useEffect(() => {
    if (inView) controls.start({ width: `${value}%` });
  }, [inView]);
  return (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden" ref={ref}>
      <motion.div
        initial={{ width: 0 }}
        animate={controls}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }}
      />
    </div>
  );
};

// Простая заглушка-аватар с инициалами
const InitialsAvatar = ({ initials = "АШ" }) => (
  <div
    className="w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full flex items-center justify-center shadow-md"
    style={{
      background: `radial-gradient(120px at 30% 30%, ${COLORS.accent}33, transparent), ${COLORS.bg}`,
      border: `4px solid ${COLORS.accent}`,
    }}
  >
    <span className="text-4xl sm:text-5xl font-bold" style={{ color: COLORS.primary }}>
      {initials}
    </span>
  </div>
);

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl rounded-2xl p-6 shadow-xl"
        style={{ background: "white" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold" style={{ color: COLORS.text }}>{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm border hover:opacity-75"
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
          >
            Закрыть
          </button>
        </div>
        <div className="text-gray-700 leading-relaxed">{children}</div>
      </motion.div>
    </div>
  );
};

// =====================
// ОСНОВНОЙ КОМПОНЕНТ
// =====================
export default function ResumeSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectModal, setProjectModal] = useState({ open: false, idx: 0 });
  const currentYear = new Date().getFullYear();

  const slogan = "Автоматизирую всё, что можно автоматизировать";

  return (
    <div className="min-h-screen" style={{ background: COLORS.bg }}>
      {/* Google Fonts (для превью в одном файле) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Хедер */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="text-lg font-semibold" style={{ color: COLORS.primary }}>
            Артём Шпынов
          </a>
          <nav className="hidden md:flex gap-6 text-sm" style={{ color: COLORS.text }}>
            <a className="hover:text-blue-800" href="#about">О себе</a>
            <a className="hover:text-blue-800" href="#skills">Навыки</a>
            <a className="hover:text-blue-800" href="#experience">Опыт</a>
            <a className="hover:text-blue-800" href="#projects">Проекты</a>
            <a className="hover:text-blue-800" href="#contacts">Контакты</a>
          </nav>
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
            aria-label="Открыть меню"
          >
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "#e5e7eb" }}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2" style={{ color: COLORS.text }}>
              {[
                { href: "#about", label: "О себе" },
                { href: "#skills", label: "Навыки" },
                { href: "#experience", label: "Опыт" },
                { href: "#projects", label: "Проекты" },
                { href: "#contacts", label: "Контакты" },
              ].map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="py-2">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold"
              style={{ color: COLORS.primary, fontFamily: "Montserrat, Inter, system-ui" }}
            >
              Шпынов Артём
            </motion.h1>
            <p className="mt-3 text-lg font-medium" style={{ color: COLORS.text }}>
              Системный администратор
            </p>
            <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: COLORS.text }}>
              {slogan}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/77084300747"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl shadow hover:shadow-md transition"
                style={{ background: COLORS.primary, color: "white" }}
              >
                <span>Связаться</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border hover:shadow-sm transition"
                style={{ borderColor: COLORS.accent, color: COLORS.primary }}
              >
                Мои проекты
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
                src={myPhoto}
                alt="Артём Шпынов"
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full shadow-lg border-4 border-white object-cover"
            />
          </div>
        </div>
      </section>

      {/* О СЕБЕ */}
      <Section id="about" title="О себе">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Опытный системный администратор с фокусом на автоматизацию процессов, построение
              и поддержку IT‑инфраструктуры, мониторинг и обеспечение отказоустойчивости. Постоянно совершенствую
              навыки, изучаю новые технологии и стремлюсь создавать надёжные, безопасные и масштабируемые решения.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3" style={{ color: COLORS.primary }}>Личные качества</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Высокая обучаемость, готовность осваивать новые технологии</li>
                <li>Целеустремлённость и доведение задач до результата</li>
                <li>Ответственность и внимательность к деталям</li>
                <li>Эффективная командная и самостоятельная работа</li>
                <li>Стремление автоматизировать рабочие процессы</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-3" style={{ color: COLORS.primary }}>Профессиональные интересы</h3>
              <ul className="space-y-2 text-gray-700 list-disc list-inside">
                <li>Автоматизация и мониторинг IT‑инфраструктуры</li>
                <li>Повышение надёжности и производительности систем</li>
                <li>Изучение новых технологий (онлайн‑курсы, книги, документация)</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* НАВЫКИ */}
      <Section id="skills" title="Навыки">
        <div className="grid lg:grid-cols-3 gap-6">
          {skills.map((group) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-semibold mb-4" style={{ color: COLORS.primary }}>{group.group}</h3>
              <div className="space-y-4">
                {group.items.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-800">{s.name}</span>
                      <span className="text-sm font-medium" style={{ color: COLORS.primary }}>{s.level}%</span>
                    </div>
                    <Progress value={s.level} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ОПЫТ */}
      <Section id="experience" title="Опыт работы">
        <div className="space-y-6">
          {experience.map((job, idx) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold" style={{ color: COLORS.primary }}>{job.company}</h3>
                  <p className="text-sm text-gray-600">{job.role}</p>
                </div>
                <div className="text-sm" style={{ color: COLORS.text }}>{job.period}</div>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2" style={{ color: COLORS.text }}>Обязанности</h4>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    {job.duties.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2" style={{ color: COLORS.text }}>Достижения</h4>
                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    {job.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ПРОЕКТЫ */}
      <Section id="projects" title="Проекты">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
            >
              <h3 className="font-semibold mb-2" style={{ color: COLORS.primary }}>{p.title}</h3>
              <p className="text-gray-700 flex-1">{p.short}</p>
              <button
                onClick={() => setProjectModal({ open: true, idx })}
                className="mt-4 self-start px-4 py-2 rounded-xl border hover:shadow-sm"
                style={{ borderColor: COLORS.primary, color: COLORS.primary }}
              >
                Подробнее
              </button>
            </motion.div>
          ))}
        </div>
        <Modal
          open={projectModal.open}
          onClose={() => setProjectModal({ open: false, idx: 0 })}
          title={projects[projectModal.idx]?.title}
        >
          {projects[projectModal.idx]?.details}
        </Modal>
      </Section>

      {/* КОНТАКТЫ */}
      <Section id="contacts" title="Контакты">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-3 text-gray-800">
              <div><span className="font-medium">Email:</span> <a className="underline hover:no-underline" href="mailto:guitaristfortemirtau@mail.ru">guitaristfortemirtau@mail.ru</a></div>
              <div><span className="font-medium">WhatsApp:</span> <a className="underline hover:no-underline" href="https://wa.me/77084300747" target="_blank">+7 708 430‑07‑47</a></div>
              <div><span className="font-medium">Телефон:</span> <a className="underline hover:no-underline" href="tel:+77084300747">+7 708 430‑07‑47</a></div>
              <div><span className="font-medium">GitHub:</span> <a className="underline hover:no-underline" href="https://github.com/ZQRey" target="_blank">github.com/ZQRey</a></div>
            </div>
            <div className="mt-6">
              <a
                href="#top"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border hover:shadow-sm transition"
                style={{ borderColor: COLORS.accent, color: COLORS.primary }}
              >
                Наверх ↑
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3" style={{ color: COLORS.primary }}>Форма обратной связи</h3>
            {/* Для продакшна замените action на вашу ссылку Formspree/EmailJS */}
            <form action="https://formspree.io/f/mzzaaooe" method="POST" className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="w-full px-4 py-3 rounded-xl border outline-none focus:ring"
                style={{ borderColor: "#e5e7eb" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-xl border outline-none focus:ring"
                style={{ borderColor: "#e5e7eb" }}
              />
              <textarea
                name="message"
                placeholder="Сообщение"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border outline-none focus:ring resize-none"
                style={{ borderColor: "#e5e7eb" }}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl shadow hover:shadow-md transition"
                style={{ background: COLORS.primary, color: "white" }}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </Section>

      {/* ФУТЕР */}
      <footer className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          © {currentYear} Артём Шпынов — сайт‑резюме. Сделано с React, Tailwind и Framer Motion.
        </div>
      </footer>

      {/* Небольшая глобальная стилизация Tailwind через utility-классы */}
      <style>{`
        html { scroll-behavior: smooth; }
        * { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
      `}</style>
    </div>
  );
}
