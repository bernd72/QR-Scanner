QR Scanner Offline – Prototyp

1. Alle Dateien zusammen auf GitHub Pages hochladen (HTTPS erforderlich).
2. Die Webseite einmal mit Internetverbindung öffnen. Danach speichert der Service Worker die App für Offline-Nutzung.
3. iPhone: Safari > Teilen > Zum Home-Bildschirm.
4. Windows: Browser öffnen; für Kamera ebenfalls HTTPS oder localhost verwenden.

WICHTIG: Die QR-Erkennung nutzt die im Browser eingebaute BarcodeDetector-API. Diese ist nicht in allen Browsern verfügbar. Die App meldet dies. Auf inkompatiblen Browsern funktioniert die Erkennung nicht; es ist keine externe Bibliothek enthalten.

Bildauswahl: +/- und Touch-Gesten; mit 'Bereich scannen' wird der sichtbare Bildbereich untersucht.
Die letzten 10 Einträge werden im lokalen Browser-Speicher gehalten.
