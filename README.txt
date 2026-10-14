QR Scanner V0.4 (14.10.2026)

Upload aller Dateien direkt ins Hauptverzeichnis des GitHub-Pages-Repositories.
index.html, sw.js, jsQR.js, manifest.webmanifest und Icons zusammen hochladen.

Aufruf zum Testen: https://DEINNAME.github.io/DEINREPO/?v=04
Die App zeigt unten QR Scanner · V0.4 an. Oben muss jsQR bereit · V0.4 stehen.

Änderungen: Aktualisierungslogik des Service-Workers (online Netzwerk zuerst, offline Cache),
Versionsabgleich nach Service-Worker-Update und Bildlade-Fallback für iOS.

Kamera benötigt HTTPS. QR-Erkennung erfolgt lokal über jsQR.
Scanliste wird lokal im Browser gespeichert. Löschen der Website-Daten entfernt auch Scans.
