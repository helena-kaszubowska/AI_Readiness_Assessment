# Ocena gotowości przedsiębiorstwa do wdrożenia AI

Aplikacja webowa (React + TypeScript + Vite + Tailwind CSS) do samooceny gotowości firmy na wdrożenie rozwiązań AI. Działa w całości w przeglądarce — bez backendu i bazy danych.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem wskazanym przez Vite (domyślnie `http://localhost:5173`).

## Budowanie produkcyjne

```bash
npm run build
npm run preview
```

## Struktura projektu

- `src/data/questions.ts` — pytania i konfiguracja kroków formularza
- `src/types.ts` — typy TypeScript
- `src/utils/scoring.ts` — obliczanie wyników
- `src/utils/recommendations.ts` — reguły rekomendacji
- `src/utils/generatePdf.ts` — generowanie raportu PDF (jsPDF)
- `src/components/` — komponenty UI

## Funkcje

- Formularz wieloetapowy z walidacją
- Wynik ogólny i cząstkowy (technologia, organizacja, środowisko, proces)
- Wykres słupkowy (Recharts)
- Rekomendacje na podstawie wyników
- Pobieranie raportu PDF
