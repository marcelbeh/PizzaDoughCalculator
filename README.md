# Pizza Day — Dein Pizzatag

Eine installierbare, responsive PWA, die dich Schritt für Schritt durch deinen Pizzaabend führt.

## Geführter Ablauf
1. **Plan:** Gäste, Pizzen pro Person, Reserve, Datum und erste Backzeit festlegen.
2. **Teigstudio:** Mehlprofil, Gärstrategie, Gärzeit, Teiggewicht, Hydration, Salz und Temperaturen einstellen.
3. **Pizzakarte:** Klassiker und Gourmet-Beläge mit frei wählbaren Stückzahlen kombinieren.
4. **Einkauf:** Teig- und Belagmengen werden zusammengeführt; Packungsgrößen und Reserven helfen beim Einkaufen.
5. **Backtag:** Rückwärts geplanter Zeitablauf, Ofen-Check, Pizza-Coach, Fotoanalyse und Backprotokoll.

## Weitere Funktionen
- Thermomix-Chargenplanung mit maximal 415 g Mehl je Charge als Planungsgrenze
- Berechnung von San-Marzano-Dosen und Fior-di-Latte-Packungen aus den ausgewählten Sorten
- Lokale Speicherung von Plan, Checklisten und Lernhistorie
- Export durch Kopieren von Rezept, Einkaufsliste oder Gesamtplan
- KI-Fotoanalyse für bis zu drei Teigbilder mit Kontext zu Mehl, Hydration, Gärzeit und Temperaturen
- Offline-Unterstützung für die statischen App-Funktionen über den Service Worker

## Fotoanalyse aktivieren

Die Fotoanalyse benötigt ein Hosting, das serverseitige JavaScript-Funktionen unterstützt, z. B. Vercel. Ein rein statisches Hosting wie GitHub Pages kann die API-Datei unter `api/analyze-dough.js` nicht ausführen.

1. Das Repository mit Vercel verbinden und deployen.
2. In den Vercel-Projekteinstellungen unter **Environment Variables** die Variable `OPENAI_API_KEY` mit einem gültigen API-Schlüssel setzen.
3. Neu deployen, damit die Umgebungsvariable verfügbar ist.
4. In der App im Abschnitt **Backtag-Modus → Fotoanalyse** bis zu drei Fotos auswählen und **Fotos analysieren** drücken.

Der API-Schlüssel wird ausschließlich serverseitig gelesen und darf niemals in `index.html` oder anderen clientseitigen Dateien hinterlegt werden. Für API-Nutzung können Kosten beim KI-Anbieter anfallen. Bilder werden bei der Analyse an den App-Server und den KI-Anbieter übertragen; sie werden von dieser App nicht in der lokalen Lernhistorie gespeichert.

## Auf dem iPhone installieren
1. Die App über HTTPS in Safari öffnen.
2. Teilen → „Zum Home-Bildschirm“ wählen.

## Fachlicher Hinweis
Die Fotoanalyse bewertet sichtbare Merkmale wie Volumen, Blasen und Oberfläche. Sie kann Teigtemperatur, Glutenstruktur oder Hefetätigkeit nicht direkt messen und ersetzt keine Prüfung am echten Teig. Die Hefemenge ist eine grobe Startschätzung, keine präzise Gärprognose. Raumtemperatur, Kühlschranktemperatur, Teigtemperatur, Mehl und tatsächliche Teigreife beeinflussen den Verlauf.
