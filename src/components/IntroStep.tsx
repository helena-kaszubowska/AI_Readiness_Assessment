import {
  AI_GOAL_OPTIONS,
  AI_USAGE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
} from "../data/questions";
import type { ReactNode } from "react";
import type { IntroData } from "../types";

interface IntroStepProps {
  intro: IntroData;
  onChange: (patch: Partial<IntroData>) => void;
}

function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-slate-800">
      {children}
      {required && <span className="text-rose-500"> *</span>}
    </label>
  );
}

export function IntroStep({ intro, onChange }: IntroStepProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <FieldLabel required>Wielkość przedsiębiorstwa</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {COMPANY_SIZE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ companySize: opt.value })}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                intro.companySize === opt.value
                  ? "chip-selected"
                  : "chip-default"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <FieldLabel required>Branża</FieldLabel>
        <input
          type="text"
          value={intro.industry}
          onChange={(e) => onChange({ industry: e.target.value })}
          placeholder="np. handel, usługi, logistyka, edukacja, księgowość"
          className="input-field"
        />
      </div>

      <fieldset>
        <FieldLabel required>Główny cel potencjalnego wdrożenia AI</FieldLabel>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {AI_GOAL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onChange({
                  aiGoal: opt.value,
                  aiGoalOther: opt.value === "inne" ? intro.aiGoalOther : "",
                })
              }
              className={`rounded-lg border px-4 py-2 text-left text-sm font-medium transition ${
                intro.aiGoal === opt.value ? "chip-selected" : "chip-default"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {intro.aiGoal === "inne" && (
        <div>
          <FieldLabel required>Jakie?</FieldLabel>
          <input
            type="text"
            value={intro.aiGoalOther ?? ""}
            onChange={(e) => onChange({ aiGoalOther: e.target.value })}
            className="input-field"
          />
        </div>
      )}

      <fieldset>
        <FieldLabel required>
          Czy firma korzysta obecnie z narzędzi AI?
        </FieldLabel>
        <div className="flex flex-wrap gap-2">
          {AI_USAGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ aiUsage: opt.value })}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                intro.aiUsage === opt.value ? "chip-selected" : "chip-default"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <FieldLabel required>Nazwa ocenianego procesu biznesowego</FieldLabel>
        <input
          type="text"
          value={intro.processName}
          onChange={(e) => onChange({ processName: e.target.value })}
          placeholder="np. obsługa klienta, analiza sprzedaży, kontrola dokumentów, planowanie dostaw"
          className="input-field"
        />
      </div>
    </div>
  );
}
