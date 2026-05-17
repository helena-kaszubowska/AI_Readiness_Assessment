/** Wyjaśnienia do pytań oceny (klucz = id pytania, E* = wymiar environment). */
export const QUESTION_HELP: Record<string, string> = {
  T1: 'AI potrzebuje danych wejściowych. Jeżeli firma nadal opiera się głównie na dokumentach papierowych czy nieuporządkowanych plikach, to wdrożenie AI będzie trudniejsze.',
  T2: 'Dane historyczne pozwalają analizować trendy, wzorce i zależności. Są istotne między innymi przy prognozowaniu, analizie sprzedaży, zachowań klientów lub efektywności procesów.',
  T3: 'Samo posiadanie danych nie wystarcza. Dane powinny być uporządkowane i możliwe do odnalezienia, aby mogły zostać przygotowane do analizy lub wykorzystane przez rozwiązania AI.',
  T4: 'Jakość danych ma bezpośredni wpływ na jakość wyników generowanych przez systemy analityczne i AI. Nieaktualne, niekompletne lub błędne dane mogą prowadzić do nieprawidłowych wniosków.',
  T5: 'Integracja systemów ułatwia przepływ danych między działami i procesami. Brak integracji może prowadzić do silosów danych i utrudniać całościową analizę działania firmy.',
  T6: 'Możliwość eksportowania danych pokazuje, czy firma może praktycznie wykorzystać swoje dane poza systemem źródłowym, na przykład w raportach, arkuszach, narzędziach analitycznych lub modelach AI.',
  T7: 'Korzystanie z narzędzi raportowych i analitycznych świadczy o pewnym poziomie dojrzałości w pracy z danymi. Firmie łatwiej wtedy przejść do bardziej zaawansowanych rozwiązań opartych na AI.',
  T8: 'Bezpieczeństwo danych jest ważne, ponieważ rozwiązania AI mogą przetwarzać dane biznesowe, osobowe lub poufne. Kontrola dostępu i zabezpieczenia ograniczają ryzyko nieuprawnionego użycia danych.',
  O1: 'Wsparcie kierownictwa zwiększa szanse powodzenia wdrożenia AI. Projekty technologiczne wymagają decyzji organizacyjnych, budżetu, priorytetu oraz akceptacji zmian w sposobie pracy.',
  O2: 'Strategia lub plan rozwoju technologicznego pomagają powiązać wdrożenie AI z celami firmy. Bez takiego planu wdrożenie może być przypadkowe i nie przynieść oczekiwanej wartości biznesowej.',
  O3: 'AI powinno odpowiadać na konkretne potrzeby biznesowe. Ważne jest aby firma potrafiła wskazać realne problemy, które mogłyby zostać rozwiązane lub ograniczone dzięki AI.',
  O4: 'Osoba lub zespół odpowiedzialny za inicjatywy cyfrowe ułatwia koordynację wdrożenia. Bez wyznaczonej odpowiedzialności projekt może być chaotyczny i trudny do utrzymania.',
  O5: 'Podstawowe kompetencje cyfrowe pracowników są potrzebne, aby mogli oni korzystać z nowych narzędzi, interpretować wyniki i dostosować się do zmian technologicznych.',
  O6: 'Szkolenia pokazują, czy firma aktywnie rozwija kompetencje potrzebne do wdrażania nowych technologii. Jest to ważne, ponieważ AI wymaga nie tylko narzędzi, ale też odpowiedniego przygotowania pracowników.',
  O7: 'Podejmowanie decyzji na podstawie danych świadczy o kulturze organizacyjnej sprzyjającej wykorzystaniu AI. Firma, która już korzysta z raportów i wskaźników, łatwiej zaakceptuje wyniki generowane przez systemy AI.',
  O8: 'Otwartość na zmiany jest ważna, ponieważ wdrożenie AI może wpływać na procesy, obowiązki pracowników i sposób podejmowania decyzji. Opór organizacyjny może utrudnić nawet dobrze przygotowane wdrożenie.',
  E1: 'Jeżeli konkurenci wykorzystują rozwiązania cyfrowe lub AI, firma może potrzebować podobnych działań, aby utrzymać swoją pozycję na rynku.',
  E2: 'Oczekiwania klientów mogą być ważnym impulsem do wdrażania nowych technologii. AI może wspierać szybszą, wygodniejszą i bardziej spersonalizowaną obsługę.',
  E3: 'Dostęp do zewnętrznych dostawców, konsultantów lub partnerów jest szczególnie ważny dla mniejszych firm, które nie zawsze posiadają własne zasoby technologiczne lub specjalistów AI.',
  E4: 'Wymagania partnerów biznesowych mogą wymuszać większy poziom cyfryzacji firmy. Elektroniczna wymiana dokumentów, danych lub połączenie systemów może być krokiem w stronę dalszej automatyzacji.',
  E5: 'Znajomość wymagań prawnych jest ważna, ponieważ wdrożenie AI może wiązać się z przetwarzaniem danych osobowych, prywatnością, odpowiedzialnością za decyzje oraz bezpieczeństwem informacji.',
  E6: 'Wdrożenie AI może być odpowiedzią na zmiany rynkowe i działania konkurencji. Powinno mieć ono uzasadnienie biznesowe, a nie wynikać wyłącznie z popularności technologii.',
  P1: 'Procesy regularne i powtarzalne są łatwiejsze do automatyzacji. Jeżeli proces występuje rzadko lub za każdym razem przebiega inaczej, wdrożenie AI może być mniej opłacalne.',
  P2: 'Opisane kroki i procedury ułatwiają analizę procesu oraz jego odwzorowanie w systemie informatycznym. Standaryzacja zwiększa możliwość automatyzacji lub częściowego wsparcia przez AI.',
  P3: 'Dane procesowe pozwalają ocenić przebieg procesu, identyfikować problemy i mierzyć efekty usprawnień. Bez danych trudno zastosować AI w sposób kontrolowany.',
  P4: 'Procesy oparte na jasnych zasadach i kryteriach decyzyjnych są łatwiejsze do modelowania. AI lub automatyzacja mogą wtedy wspierać powtarzalne decyzje albo klasyfikację przypadków.',
  P5: 'Duża liczba podobnych spraw, klientów, zamówień lub dokumentów zwiększa opłacalność automatyzacji. Nawet niewielka oszczędność czasu w pojedynczym przypadku może dać duży efekt przy dużej skali.',
  P6: 'Mierzenie czasu, kosztu, jakości lub liczby błędów pozwala określić stan początkowy procesu. Dzięki temu można później ocenić, czy wdrożenie AI rzeczywiście przyniosło poprawę.',
}

export function helpFor(id: string): string {
  return QUESTION_HELP[id] ?? ''
}
