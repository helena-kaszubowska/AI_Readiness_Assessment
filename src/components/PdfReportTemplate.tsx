import { forwardRef } from "react";
import { AI_USAGE_OPTIONS, COMPANY_SIZE_OPTIONS } from "../data/questions";
import { formatAiGoalDisplay } from "../utils/introDisplay";
import type { AssessmentScores, IntroData } from "../types";

/** Odstęp od górnej krawędzi strony do tytułu (px) — osobny blok, widoczny w PDF */
const TOP_MARGIN_PX = 40;

/** Odstęp między sekcjami raportu (px) */
const SECTION_GAP_PX = 56;

const s = {
  page: {
    width: "794px",
    boxSizing: "border-box" as const,
    backgroundColor: "#ffffff",
    color: "#1e293b",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    fontSize: "14px",
    lineHeight: 1.5,
    padding: "0 56px 40px",
    wordBreak: "break-word" as const,
    display: "flex",
    flexDirection: "column" as const,
    gap: `${SECTION_GAP_PX}px`,
    justifyContent: "flex-start",
  },
  header: {
    flexShrink: 0,
    paddingBottom: "8px",
    borderBottom: "1px solid #e2e8f0",
  },
  section: {
    margin: 0,
    padding: 0,
  },
  h1: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#243b5f",
    margin: "0 0 10px 0",
    lineHeight: 1.3,
  },
  meta: { fontSize: "12px", color: "#64748b", margin: 0 },
  h2: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#0f172a",
    margin: "0 0 8px 0",
  },
  p: { margin: "0 0 6px 0" },
  list: { margin: 0, padding: 0, listStyle: "none" as const },
  li: { margin: "0 0 5px 0" },
  recItem: { margin: "0 0 8px 0", padding: 0, textAlign: "left" as const },
  topSpacer: {
    height: `${TOP_MARGIN_PX}px`,
    flexShrink: 0,
    width: "100%",
  },
};

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? (value || "—");
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface PdfReportTemplateProps {
  intro: IntroData;
  scores: AssessmentScores;
  recommendations: string[];
}

export const PdfReportTemplate = forwardRef<
  HTMLDivElement,
  PdfReportTemplateProps
>(function PdfReportTemplate({ intro, scores, recommendations }, ref) {
  return (
    <div
      aria-hidden
      data-pdf-wrapper
      style={{
        position: "fixed",
        top: 0,
        left: "-10000px",
        width: "794px",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 1,
        overflow: "hidden",
      }}
    >
      <div ref={ref} data-pdf-capture style={s.page}>
        <div style={s.topSpacer} aria-hidden />
        <header style={s.header}>
          <h1 style={s.h1}>
            Raport oceny gotowości przedsiębiorstwa do wdrożenia AI
          </h1>
          <p style={s.meta}>Data wygenerowania: {formatDate(new Date())}</p>
        </header>

        <section style={s.section}>
          <h2 style={s.h2}>Dane wstępne</h2>
          <ul style={s.list}>
            <li style={s.li}>
              <strong>Wielkość przedsiębiorstwa:</strong>{" "}
              {labelFor(COMPANY_SIZE_OPTIONS, intro.companySize)}
            </li>
            <li style={s.li}>
              <strong>Branża:</strong> {intro.industry || "—"}
            </li>
            <li style={s.li}>
              <strong>Główny cel wdrożenia AI:</strong>{" "}
              {formatAiGoalDisplay(intro)}
            </li>
            <li style={s.li}>
              <strong>Obecne korzystanie z narzędzi AI:</strong>{" "}
              {labelFor(AI_USAGE_OPTIONS, intro.aiUsage)}
            </li>
            <li style={s.li}>
              <strong>Nazwa procesu biznesowego:</strong>{" "}
              {intro.processName || "—"}
            </li>
          </ul>
        </section>

        <section style={s.section}>
          <h2 style={s.h2}>Wynik ogólny</h2>
          <p style={s.p}>
            <strong>Wynik:</strong> {scores.overallPercent}% (
            {scores.totalPoints}/{scores.totalMax} pkt)
          </p>
          <p style={s.p}>
            <strong>Poziom gotowości:</strong> {scores.levelLabel}
          </p>
          <p style={{ ...s.p, marginBottom: 0 }}>{scores.interpretation}</p>
        </section>

        <section style={s.section}>
          <h2 style={s.h2}>Wyniki cząstkowe</h2>
          <ul style={s.list}>
            {scores.dimensions.map((d) => (
              <li key={d.id} style={s.li}>
                <strong>{d.label}:</strong> {d.percent}% ({d.points}/
                {d.maxPoints} pkt)
              </li>
            ))}
          </ul>
        </section>

        <section style={s.section}>
          <h2 style={s.h2}>Rekomendacje</h2>
          {recommendations.map((r, i) => (
            <p
              key={i}
              style={{
                ...s.recItem,
                marginBottom: i === recommendations.length - 1 ? 0 : "8px",
              }}
            >
              {r}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
});
