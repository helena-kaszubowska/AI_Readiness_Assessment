import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { AI_USAGE_OPTIONS, COMPANY_SIZE_OPTIONS } from "../data/questions";
import type { AssessmentScores, IntroData } from "../types";
import { formatAiGoalDisplay } from "../utils/introDisplay";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 40,
    paddingBottom: 40,
    fontFamily: "Roboto",
    fontSize: 11,
    lineHeight: 1.45,
    color: "#1e293b",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#243b5f",
    marginBottom: 6,
  },
  meta: {
    fontSize: 10,
    color: "#64748b",
  },
  section: {
    marginBottom: 18,
  },
  h2: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 8,
  },
  line: {
    marginBottom: 5,
  },
  rec: {
    marginBottom: 8,
  },
});

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

export interface PdfReportDocumentProps {
  intro: IntroData;
  scores: AssessmentScores;
  recommendations: string[];
}

export function PdfReportDocument({
  intro,
  scores,
  recommendations,
}: PdfReportDocumentProps) {
  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Raport oceny gotowości przedsiębiorstwa do wdrożenia AI
          </Text>
          <Text style={styles.meta}>
            Data wygenerowania: {formatDate(new Date())}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Dane wstępne</Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>Wielkość przedsiębiorstwa:</Text>{" "}
            {labelFor(COMPANY_SIZE_OPTIONS, intro.companySize)}
          </Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>Branża:</Text>{" "}
            {intro.industry || "—"}
          </Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>Główny cel wdrożenia AI:</Text>{" "}
            {formatAiGoalDisplay(intro)}
          </Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>
              Obecne korzystanie z narzędzi AI:
            </Text>{" "}
            {labelFor(AI_USAGE_OPTIONS, intro.aiUsage)}
          </Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>Nazwa procesu biznesowego:</Text>{" "}
            {intro.processName || "—"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Wynik ogólny</Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>Wynik:</Text>{" "}
            {scores.overallPercent}% ({scores.totalPoints}/{scores.totalMax}{" "}
            pkt)
          </Text>
          <Text style={styles.line}>
            <Text style={{ fontWeight: 700 }}>Poziom gotowości:</Text>{" "}
            {scores.levelLabel}
          </Text>
          <Text style={styles.line}>{scores.interpretation}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Wyniki cząstkowe</Text>
          {scores.dimensions.map((d) => (
            <Text key={d.id} style={styles.line}>
              <Text style={{ fontWeight: 700 }}>{d.label}:</Text> {d.percent}% (
              {d.points}/{d.maxPoints} pkt)
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Rekomendacje</Text>
          {recommendations.map((r, i) => (
            <Text key={i} style={styles.rec}>
              {r}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
