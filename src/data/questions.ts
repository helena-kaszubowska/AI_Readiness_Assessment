import type { Question } from "../types";
import { helpFor } from "./questionHelp";

export const ANSWER_OPTIONS = [
  { value: 0 as const, label: "Nie" },
  { value: 1 as const, label: "Częściowo" },
  { value: 2 as const, label: "Tak" },
];

export const DIMENSION_LABELS: Record<string, string> = {
  technology: "Technologia",
  organization: "Organizacja",
  environment: "Środowisko",
  process: "Proces",
};

export const DIMENSION_MAX: Record<string, number> = {
  technology: 16,
  organization: 16,
  environment: 12,
  process: 12,
};

export const TOTAL_MAX_POINTS = 56;

export const technologyQuestions: Question[] = [
  {
    id: "T1",
    dimension: "technology",
    text: "Czy kluczowe dane biznesowe wykorzystywane w firmie są przechowywane w formie cyfrowej?",
    helpText: helpFor("T1"),
  },
  {
    id: "T2",
    dimension: "technology",
    text: "Czy firma posiada dane historyczne dotyczące klientów, sprzedaży, operacji lub procesów?",
    helpText: helpFor("T2"),
  },
  {
    id: "T3",
    dimension: "technology",
    text: "Czy dane w firmie są uporządkowane, opisane i możliwe do łatwego wyszukania?",
    helpText: helpFor("T3"),
  },
  {
    id: "T4",
    dimension: "technology",
    text: "Czy dane wykorzystywane w firmie są aktualne, kompletne i wystarczająco dobrej jakości do analizy?",
    helpText: helpFor("T4"),
  },
  {
    id: "T5",
    dimension: "technology",
    text: "Czy systemy informatyczne w firmie umożliwiają sprawną wymianę danych między działami lub procesami?",
    helpText: helpFor("T5"),
  },
  {
    id: "T6",
    dimension: "technology",
    text: "Czy firma ma możliwość eksportowania danych z używanych systemów do dalszej analizy lub raportowania?",
    helpText: helpFor("T6"),
  },
  {
    id: "T7",
    dimension: "technology",
    text: "Czy firma korzysta z narzędzi raportowych lub analitycznych wspierających podejmowanie decyzji?",
    helpText: helpFor("T7"),
  },
  {
    id: "T8",
    dimension: "technology",
    text: "Czy firma stosuje podstawowe mechanizmy ochrony danych, takie jak kontrola dostępu, tworzenie kopii zapasowych oraz zabezpieczenia ograniczające ryzyko utraty lub nieuprawnionego wykorzystania danych?",
    helpText: helpFor("T8"),
  },
];

export const organizationQuestions: Question[] = [
  {
    id: "O1",
    dimension: "organization",
    text: "Czy kierownictwo firmy aktywnie wspiera wdrażanie nowych technologii i usprawnień technologicznych?",
    helpText: helpFor("O1"),
  },
  {
    id: "O2",
    dimension: "organization",
    text: "Czy firma posiada strategię cyfryzacji, plan rozwoju technologicznego lub określone cele związane z wykorzystaniem AI?",
    helpText: helpFor("O2"),
  },
  {
    id: "O3",
    dimension: "organization",
    text: "Czy firma potrafi wskazać konkretne problemy biznesowe lub procesowe, które mogłyby zostać rozwiązane przy użyciu AI?",
    helpText: helpFor("O3"),
  },
  {
    id: "O4",
    dimension: "organization",
    text: "Czy w firmie istnieje osoba lub zespół odpowiedzialny za inicjatywy technologiczne?",
    helpText: helpFor("O4"),
  },
  {
    id: "O5",
    dimension: "organization",
    text: "Czy pracownicy posiadają podstawowe kompetencje cyfrowe potrzebne do korzystania z nowych narzędzi informatycznych?",
    helpText: helpFor("O5"),
  },
  {
    id: "O6",
    dimension: "organization",
    text: "Czy firma rozwija kompetencje pracowników poprzez szkolenia z zakresu nowych technologii, analizy danych lub AI?",
    helpText: helpFor("O6"),
  },
  {
    id: "O7",
    dimension: "organization",
    text: "Czy w firmie istnieje praktyka podejmowania decyzji biznesowych na podstawie danych, raportów lub mierzalnych wskaźników?",
    helpText: helpFor("O7"),
  },
  {
    id: "O8",
    dimension: "organization",
    text: "Czy pracownicy i kadra zarządzająca są otwarci na zmiany organizacyjne związane z wdrażaniem nowych technologii?",
    helpText: helpFor("O8"),
  },
];

export const environmentQuestions: Question[] = [
  {
    id: "E1",
    dimension: "environment",
    text: "Czy konkurencyjne firmy na rynku wykorzystują lub rozwijają rozwiązania cyfrowe, w tym rozwiązania AI?",
    helpText: helpFor("E1"),
  },
  {
    id: "E2",
    dimension: "environment",
    text: "Czy klienci oczekują szybszej, nowocześniejszej lub bardziej spersonalizowanej obsługi?",
    helpText: helpFor("E2"),
  },
  {
    id: "E3",
    dimension: "environment",
    text: "Czy firma ma dostęp do zewnętrznych dostawców technologii, konsultantów lub partnerów, którzy mogliby wesprzeć wdrożenie AI?",
    helpText: helpFor("E3"),
  },
  {
    id: "E4",
    dimension: "environment",
    text: "Czy partnerzy biznesowi wymagają od firmy elektronicznej wymiany dokumentów, danych lub integracji systemów informatycznych?",
    helpText: helpFor("E4"),
  },
  {
    id: "E5",
    dimension: "environment",
    text: "Czy firma zna podstawowe wymagania prawne dotyczące ochrony danych, prywatności oraz odpowiedzialnego wykorzystania AI?",
    helpText: helpFor("E5"),
  },
  {
    id: "E6",
    dimension: "environment",
    text: "Czy wykorzystanie AI mogłoby pomóc firmie szybciej reagować na zmiany rynkowe lub działania konkurencji?",
    helpText: helpFor("E6"),
  },
];

export const processQuestions: Question[] = [
  {
    id: "P1",
    dimension: "process",
    text: "Czy analizowany proces jest wykonywany regularnie?",
    helpText: helpFor("P1"),
  },
  {
    id: "P2",
    dimension: "process",
    text: "Czy analizowany proces ma opisane kroki, procedury lub ustalony sposób realizacji?",
    helpText: helpFor("P2"),
  },
  {
    id: "P3",
    dimension: "process",
    text: "Czy analizowany proces generuje dane, dokumenty lub informacje możliwe do późniejszej analizy?",
    helpText: helpFor("P3"),
  },
  {
    id: "P4",
    dimension: "process",
    text: "Czy decyzje w procesie opierają się na określonych zasadach lub kryteriach?",
    helpText: helpFor("P4"),
  },
  {
    id: "P5",
    dimension: "process",
    text: "Czy analizowany proces obejmuje dużą liczbę podobnych spraw, klientów, zamówień lub dokumentów?",
    helpText: helpFor("P5"),
  },
  {
    id: "P6",
    dimension: "process",
    text: "Czy firma mierzy efektywność procesu, na przykład czas realizacji, koszt, jakość lub liczbę błędów?",
    helpText: helpFor("P6"),
  },
];

export const FORM_STEPS = [
  {
    key: "intro" as const,
    title: "Informacje wstępne",
    subtitle: "Dane kontekstowe o przedsiębiorstwie",
    questions: [] as Question[],
  },
  {
    key: "technology" as const,
    title: "Sekcja A: Wymiar technologiczny",
    subtitle: "Infrastruktura danych i systemów",
    questions: technologyQuestions,
  },
  {
    key: "organization" as const,
    title: "Sekcja B: Wymiar organizacyjny",
    subtitle: "Kadra, strategia i kompetencje",
    questions: organizationQuestions,
  },
  {
    key: "environment" as const,
    title: "Sekcja C: Wymiar środowiskowy",
    subtitle: "Rynek, regulacje i otoczenie",
    questions: environmentQuestions,
  },
  {
    key: "process" as const,
    title: "Sekcja D: Ocena procesu biznesowego",
    subtitle: "Gotowość wybranego procesu",
    questions: processQuestions,
  },
];

export const COMPANY_SIZE_OPTIONS = [
  {
    value: "mikro" as const,
    label: "Mikro",
    employees: "do 9 pracowników",
    employeesMain: "do 9",
    employeesSub: "pracowników",
  },
  {
    value: "małe" as const,
    label: "Małe",
    employees: "10–49 pracowników",
    employeesMain: "10–49",
    employeesSub: "pracowników",
  },
  {
    value: "średnie" as const,
    label: "Średnie",
    employees: "50–249 pracowników",
    employeesMain: "50–249",
    employeesSub: "pracowników",
  },
  {
    value: "duże" as const,
    label: "Duże",
    employees: "250 i więcej pracowników",
  },
];

export const AI_GOAL_OPTIONS = [
  { value: "automatyzacja" as const, label: "Automatyzacja procesów" },
  { value: "analiza" as const, label: "Analiza danych" },
  { value: "obsługa" as const, label: "Obsługa klienta" },
  { value: "decyzje" as const, label: "Wsparcie decyzji" },
  { value: "inne" as const, label: "Inne" },
];

export const AI_USAGE_OPTIONS = [
  { value: "nie" as const, label: "Nie" },
  { value: "częściowo" as const, label: "Częściowo" },
  { value: "tak" as const, label: "Tak" },
];
