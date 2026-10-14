QR & Data Matrix Scanner V0.9
================================

INSTALLATION
1. ALLE Dateien aus diesem ZIP entpacken und im Hauptverzeichnis
   deines GitHub-Pages-Repositories hochladen (vorhandene Dateien ersetzen).
2. Im iPhone-Safari öffnen: https://bernd72.github.io/qr-scanner/?v=09
3. Wenn unten V0.9 erscheint, ist die neue Version geladen.
4. Optional in Safari: Teilen > Zum Home-Bildschirm.
5. Nach dem ersten vollständigen Online-Aufruf offline nutzbar.

KAMERA
- „Kamera einschalten“, Zoom per +/- oder Schieberegler auf 1–5×,
  dann „Scan starten“. Bei erfolgreichem Treffer friert das Bild ein.
- Der Kamera-Zoom ist ein digitaler Bildausschnitt und funktioniert auch
  auf Geräten ohne Hardwarezoom. Er verbessert jedoch keine unscharfen Bilder.
- „Weiter“ ermöglicht den nächsten Scan.

FOTO
- „Bild auswählen“ > „Bild öffnen“. Automatische Vollbildsuche beginnt.
- Falls kein Code gefunden wird: Direkt auf die Mitte des Codes tippen;
  die App prüft dann mehrere hochaufgelöste Ausschnitte an der Stelle.
- Alternativ mit zwei Fingern zoomen/verschieben (oder +/-) und
  „Ausschnitt scannen“ benutzen. „Ganzes Bild“ startet die Vollsuche.
- Manche sehr kleinen, unscharfen oder angeschnittenen Symbole bleiben
  möglicherweise unerkennbar.

DATEN
Letzte 10 Scans mit fortlaufender ID, Uhrzeit, Wert und Bemerkungsfeld.
Die Daten verbleiben ausschließlich lokal auf dem Gerät.
„Alle löschen“ leert den Ringpuffer nach Bestätigung.

NEU IN V0.9
- Stufenloser Digitalzoom in der Kamera (1–5×), auch für den Scanbereich.
- Automatisches Scannen nach dem Öffnen eines Bildes.
- Gezielter Scan durch Antippen der Codemitte im Originalbild.
- Änderung der Reihenfolge der Suchfenster für kleine Data-Matrix-Codes.
- Eigener Service-Worker-Cache und konsistente V0.9-Angaben.

HINWEIS: HTTPS ist für Kamerazugriff auf iOS erforderlich.
Browser-/Kameratests auf einem echten iPhone stehen noch aus.
