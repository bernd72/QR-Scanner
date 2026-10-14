QR & Data Matrix Scanner V0.8
==============================

Installation über GitHub Pages
------------------------------
1. ALLE Dateien aus dem ZIP ins Stammverzeichnis des Repositories hochladen.
2. In GitHub Settings > Pages den Branch main und / (root) auswählen.
3. https://bernd72.github.io/qr-scanner/?v=08 auf dem iPhone in Safari öffnen.
4. Die Seite einmal mit Internet laden. Danach ist Offline-Nutzung möglich.
5. Safari: Teilen > Zum Home-Bildschirm.

Scannen
-------
Kamera: Kamera einschalten und "Scan starten" drücken. Bei Treffer friert das Bild ein.
Bild: Foto öffnen. Mit "Ganzes Bild" das Foto automatisch untersuchen.
Bei kleinen Codes zoomen/verschieben und anschließend "Ausschnitt scannen" drücken.
Die Bildsuche kann einige Sekunden dauern; die Oberfläche bleibt dabei bedienbar.

Im unteren Bereich werden die letzten 10 Scans mit ID, Zeit und Bemerkungsfeld
lokal im Browser gespeichert. "Alle löschen" leert den Ringpuffer.
Keine Bilddaten werden auf einen Server übertragen.

V0.8
----
* Lokale ZXing-Erkennung in Hintergrund-Worker (keine Internet-API erforderlich)
* Originalauflösung beim Ausschnittsscan statt Bildschirmvorschau
* Quadratische, überlappende Suchregionen für kleine Data-Matrix-Codes
* Vollbildscan separat vom Ausschnittsscan
* Diagnosestatus, Cache-Versionswechsel, iOS Home-Screen-Icon
* Unterstützt QR-Code und Data Matrix; mehrere Ergebnisse auswählbar

Hinweise:
- HTTPS ist für Livekamera auf iOS notwendig (GitHub Pages nutzt HTTPS).
- Abhängig von Kontrast, Schärfe und Größe können Codes unerkannt bleiben.
- iOS-Kameratest ist auf unserer Testumgebung nicht möglich.
- Wenn die App nach Update die alte Version zeigt, in Safari direkt ?v=08 laden.
