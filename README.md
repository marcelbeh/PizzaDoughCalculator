# Pizza Day — Dein Pizzatag

Eine installierbare, responsive PWA, die dich Schritt für Schritt durch deinen Pizzaabend führt.

## Geführter Ablauf
1. **Plan:** Gäste, Pizzen pro Person, Reserve, Datum und erste Backzeit festlegen.
2. **Teigstudio:** Mehlprofil, Gärstrategie, Gärzeit, Teiggewicht, Hydration, Salz und Temperaturen einstellen.
3. **Pizzakarte:** Klassiker und Gourmet-Beläge mit frei wählbaren Stückzahlen kombinieren.
4. **Einkauf:** Teig- und Belagmengen werden zusammengeführt; Packungsgrößen und Reserven helfen beim Einkaufen.
5. **Backtag:** Rückwärts geplanter Zeitablauf, Ofen-Check, Pizza-Coach, Teig-Check und Backprotokoll.

## Weitere Funktionen
- Thermomix-Chargenplanung mit maximal 415 g Mehl je Charge als Planungsgrenze
- Berechnung von San-Marzano-Dosen und Fior-di-Latte-Packungen aus den ausgewählten Sorten
- Lokale Speicherung von Plan, Checklisten und Lernhistorie
- Export durch Kopieren von Rezept, Einkaufsliste oder Gesamtplan
- Regelbasierter Teig-Check mit Checkboxen für Volumen, Blasen, Oberfläche und Teiggefühl
- Offline-Unterstützung für die statischen App-Funktionen über den Service Worker

## Teig-Check

Der Teig-Check arbeitet direkt im Browser mit deinen angekreuzten Beobachtungen. Es werden keine Fotos hochgeladen und keine externe KI-API benötigt. Die Einschätzung ist eine praktische Orientierung, keine sichere Messung der Teigreife.

## Auf dem iPhone installieren
1. Die App über HTTPS in Safari öffnen.
2. Teilen → „Zum Home-Bildschirm“ wählen.

## Fachlicher Hinweis
Der Teig-Check nutzt deine Angaben zu Volumen, Blasen, Oberfläche und Teiggefühl. Sie kann Teigtemperatur, Glutenstruktur oder Hefetätigkeit nicht direkt messen und ersetzt keine Prüfung am echten Teig. Die Hefemenge ist eine grobe Startschätzung, keine präzise Gärprognose. Raumtemperatur, Kühlschranktemperatur, Teigtemperatur, Mehl und tatsächliche Teigreife beeinflussen den Verlauf.
