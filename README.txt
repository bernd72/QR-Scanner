QR & DATA MATRIX SCANNER — V1.1
================================

INHALT
- index.html: vollständige Bedienoberfläche
- zxing.min.js: QR-/Data-Matrix-Bibliothek (lokal, offline)
- scanner-engine.js und scan-worker.js: Bildauswertung
- sw.js: Offline-Cache mit Versionskennung V1.1
- manifest.webmanifest und icon-*.png: iOS-/PWA-App-Icon

INSTALLATION ÜBER GITHUB PAGES
1. ZIP entpacken.
2. ALLE Dateien ohne übergeordneten Ordner in das Hauptverzeichnis
   des bestehenden GitHub-Pages-Repositories hochladen.
3. Alte Dateien gleichen Namens auf GitHub ersetzen.
4. Im iPhone-Safari öffnen:
   https://bernd72.github.io/qr-scanner/?v=11
   (gilt nur, wenn der Repository-Name "qr-scanner" ist).
5. Unten muss „QR & Data Matrix · V1.1“ erscheinen.
6. Zum Home-Bildschirm: Safari > Teilen > Zum Home-Bildschirm.
7. Zum ersten Laden/Update Internet nutzen, danach funktioniert die
   App samt QR-Erkennung offline. Kamera benötigt HTTPS/localhost.

BILD-SCAN
- „Bild auswählen“ > „Bild öffnen“.
- Der automatische Scan läuft im Hintergrund.
- Wenn kein Treffer gefunden wird: MIT DEM FINGER GENAU auf den Code
  tippen. Dadurch wird die laufende Vollbildsuche sofort abgebrochen
  und nur die Umgebung der angetippten Stelle untersucht.
- +/−/Schieberegler oder Zwei-Finger-Geste vergrößern das Foto.
- „Sichtbereich“ untersucht ausschließlich den sichtbaren Ausschnitt.
- NEU: „Bereich markieren“ antippen, dann mit dem Finger ein Rechteck
  um den Code ziehen und „Bereich scannen“ drücken. Dabei bitte
  ringsherum etwas freien Rand mit auswählen.
- Auch sehr große Codes können Probleme bereiten. In V1.1 versucht
  der Decoder zusätzlich verkleinerte Auflösungen und einen hellen Rand.
- „Markierung weg“ entfernt die Auswahl.
- „Ganzes Bild“ wiederholt die automatische Suche.
- Sehr kleine/unscharfe/angeschnittene Codes können trotz dieser
  Verbesserungen unerkannt bleiben. Originaldatei bevorzugen.

KAMERA
- „Kamera ein“, ggf. Zoom mit Slider von 1× bis 5×,
  anschließend „Scan starten“.
- Nach einem Treffer friert das Bild ein. „Weiter“ öffnet die Kamera
  für einen neuen Scan.
- Der Kamera-Zoom ist digital, kein optischer Zoom.

DATEN UND ANZEIGE
- Bis zu zehn letzte Scans: fortlaufende ID, Uhrzeit, Inhalt,
  Typ (QR-Code oder Data Matrix), Bemerkung.
- Einträge werden lokal im Browser gespeichert.
- „Puffer löschen“ entfernt die letzten Scans nach Rückfrage.
- Bedienoberfläche ist im Hochformat stabil angeordnet, die
  Buttons haben große Tippflächen; Bemerkungsfelder sind mit
  16-px-Schrift gegen unerwünschtes Safari-Zoomen ausgelegt.
- Auf Smartphone/Tablet im Querformat erscheint ein Drehhinweis.

WICHTIG
- Die Bibliothek erkennt Data Matrix und klassische QR-Codes.
- Mehrere Codes können ausgewählt werden, sofern der Decoder
  sie im untersuchten Bild findet; vollständige Mehrfacherkennung
  ist nicht garantiert.
- Tests: JavaScript-Syntax, Node-Decoder mit Nutzermuster und
  synthetischen Hochformatbildern, HTML-Oberfläche kann hier nicht erneut im Browser geprüft werden.
- Keine realen Tests auf iOS-Hardware durchgeführt.
- QR-Erkennung und Scan-Daten werden nicht an einen Server gesendet.
