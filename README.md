# Pizza Dough Calculator

Eine installierbare, responsive Web-App (PWA) auf Deutsch.

## Funktionen
- Teig- und Zutatenrechner mit Hydration, Salz und wahlweise Trocken- oder Frischhefe
- Gär- und Backzeitplaner mit rückwärts berechnetem Zeitstrahl
- Thermomix-Chargenberechnung
- Abhakbare Vorbereitungsliste, lokal im Browser gespeichert
- Offline-Unterstützung über Service Worker (wenn über HTTPS oder localhost aufgerufen)

## Starten
Zum lokalen Testen `index.html` im Browser öffnen. Für die vollständige PWA-Installation und Offline-Funktion über HTTPS hosten oder lokal einen Entwicklungsserver verwenden.

## Auf iPhone installieren
1. Die Dateien auf einen HTTPS-Webspace hochladen.
2. Die URL in Safari öffnen.
3. Teilen → „Zum Home-Bildschirm“ wählen.

Die App benötigt keinen Account und sendet keine Daten an einen Server. Checklisten werden lokal auf dem Gerät gespeichert.

## Hinweise
- Die Berechnung stimmt Mehl, Wasser, Salz und Hefe auf das eingestellte Gesamtgewicht ab.
- Die Chargenfunktion rundet Mehl, Wasser und Salz entsprechend der ausgewählten Waagenauflösung; kleine Hefemengen werden separat auf 0,1 g gerundet.
- Zeitplan und Hefemenge sind Planungshilfen, keine Garantie für den Reifezustand des Teigs.
