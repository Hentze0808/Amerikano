# Amerikano Pointtæller (offline)

Statisk webapp uden server-kode. Når den er åbnet én gang med internet, virker den offline.

## Sådan lægger du den online (én gang)
Siden skal ligge på HTTPS, ellers virker offline-delen ikke. Fx GitHub Pages:

1. Opret et repo og læg alle filerne i roden.
2. Settings -> Pages -> Deploy from a branch -> `main` / `root`.
3. Åbn adressen på telefonen.

Andre statiske hosts (Netlify, Cloudflare Pages, egen webserver) virker også.

## Installér på telefonen
- iPhone (Safari): Del -> Føj til hjemmeskærm.
- Android (Chrome): menuen -> Installer app / Føj til startskærm.

Åbn appen én gang med internet. Derefter kan den bruges uden net.

## Opdatering
Ret `index.html`, og skift `CACHE` i `sw.js` (fx `amerikano-v3`). Telefonen henter den nye udgave næste gang den er online, og bruger den fra åbningen efter.

## Data
Spil og statistik gemmes kun på den enhed og i den browser, appen kører i.
