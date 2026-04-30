# Directus Setup

Diese Datei beschreibt die Collections, Felder und Einstellungen, die du in
Directus anlegen musst, damit das Frontend ohne Anpassungen funktioniert.

> Content model: **Posts** (Newsroom), **Downloads** (Download Center mit
> Kategorien) und **Home** (Partner-Logos im Hero). Routen: `/newsroom/<slug>`,
> `/downloads`, Startseite `/`.

## 1. Voraussetzungen

- Eine Directus-Instanz, idealerweise unter
  `https://admin.duecker-medizintechnik.de`.
- Ein Service-User mit einem **statischen Token** (Settings → Users → Token).
  Dieser Token wird ausschließlich serverseitig verwendet und gehört in die
  Env-Variable `DIRECTUS_API_TOKEN`.
- CORS so konfigurieren, dass die Frontend-Domain (z.B.
  `https://duecker-medizintechnik.de`, `https://www.duecker-medizintechnik.de`
  und `http://localhost:3000`) zugelassen ist:

  ```yaml
  CORS_ENABLED: 'true'
  CORS_ORIGIN: 'https://duecker-medizintechnik.de,https://www.duecker-medizintechnik.de,http://localhost:3000'
  ```

- **Live Preview & Visual Editor** laden deine Frontend-URLs in einem
  `<iframe>`. Diese Ursprünge müssen in der **Directus**-CSP unter **`frame-src`**
  stehen (Umgebungsvariablen, nicht im Next.js-Projekt).

  Produktion + lokale Entwicklung:

  ```yaml
  CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC: "'self' http://localhost:3000 http://127.0.0.1:3000 https://duecker-medizintechnik.de https://www.duecker-medizintechnik.de"
  ```

  Nach Änderungen die Directus-Instanz **neu starten**, sonst gilt die alte CSP
  weiter. Fehler wie „does not appear in the **frame-src** directive“ kommen vom
  **Directus-Host**, wenn z. B. `http://localhost:3000` hier fehlt.

## 2. Collections

> Felder, die hier nicht aufgeführt sind (z.B. `status`, `date_created`,
> `date_updated`, `sort`), werden von Directus automatisch angelegt.

### `categories`

Klassifizierung der News.

| Feld   | Typ    | Notizen                  |
| ------ | ------ | ------------------------ |
| `name` | String | Anzeigename              |
| `slug` | String | URL-tauglich (eindeutig) |

### `authors`

| Feld    | Typ        | Notizen                                              |
| ------- | ---------- | ---------------------------------------------------- |
| `name`  | String     | Pflichtfeld                                          |
| `bio`   | Text       | Wird im Author-Block am Artikelende verwendet        |
| `mail`  | String     | Optional, wird als `mailto:`-Link gerendert          |
| `image` | File (M2O) | Beziehung zu `directus_files`, Profilbild des Autors |

### `posts`

Die Hauptsammlung für Newsroom-Artikel.

| Feld             | Typ                | Notizen                                                   |
| ---------------- | ------------------ | --------------------------------------------------------- |
| `title`          | String             |                                                           |
| `slug`           | String             | eindeutig, wird in der URL verwendet (`/newsroom/<slug>`) |
| `excerpt`        | Text               | Vorschautext / OG-Description                             |
| `content`        | Markdown / WYSIWYG | Wird mit `marked` zu HTML gerendert                       |
| `image`          | File (M2O)         | Header-Bild                                               |
| `category`       | M2O → `categories` |                                                           |
| `author`         | M2O → `authors`    |                                                           |
| `date_published` | Datetime           | Publikationsdatum (sortiert wird `-date_published, -id`)  |

### `download_categories`

Gruppen im Download-Center.

| Feld   | Typ    |
| ------ | ------ |
| `name` | String |
| `slug` | String |

### `downloads`

Ein Eintrag pro „Produkt“/„Bündel“ – kann mehrere Dateien enthalten.

| Feld       | Typ                                                  | Notizen                                                                                      |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `name`     | String                                               | Anzeigename in der Akkordeon-Zeile                                                           |
| `category` | M2O → `download_categories`                          |                                                                                              |
| `files`    | M2M zu `directus_files` (Junction `downloads_files`) | Junction-Spalten heißen automatisch `downloads_id` & `directus_files_id`                     |
| `locale`   | String                                               | Optional in Directus; **the frontend does not filter by locale** — one global list per site. |

> **Hinweis zu M2M-Files:** Beim Anlegen wählst du in Directus Studio für das
> Feld `files` den Interface-Typ „Files“ – Directus generiert dann die
> Junction-Collection automatisch. Das Frontend liest die Dateien über
> **Junction-Hinweis:** Standard ist `downloads_files` mit `downloads_id` und
> `directus_files_id`. Wenn ihr die Collection umbenannt habt: in
> `src/lib/directus/download-file-refs.ts` die Konstante
> `DOWNLOADS_FILES_JUNCTION` anpassen — sonst holt das Frontend Dateien weiter
> nur über verschachtelte `files`, falls Directus dort nichts zurückgibt.

### `home_partner_logos`

Eine gemeinsame Liste für den **Bild-Slider im Hero** und die **Logo-Zeile direkt darunter** auf der Startseite. Wenn die Collection leer ist oder Directus nicht erreichbar ist, nutzt die Seite weiterhin die eingebauten Fallback-Bilder bzw. die statische Partner-Liste aus dem Code.

| Feld                 | Typ        | Notizen                                                                                                                                 |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | String     | Optional; wird als **Alt-Text** genutzt (sonst Datei-Titel / Dateiname).                                                                 |
| `logo`               | File (M2O) | Pflicht für sichtbare Einträge; **SVG** und Raster (JPG/PNG/WebP) sind erlaubt.                                                         |
| `link_url`           | String     | Optional; externe Partner-URL. Leer = Logo ohne Link (Logo-Zeile); im Slider wird das Logo trotzdem angezeigt.                          |
| `use_in_slider`      | Boolean    | Optional; Standard **true** wenn leer. **false** = nicht im Hero-Swiper.                                                                |
| `use_in_logo_strip`  | Boolean    | Optional; Standard **true** wenn leer. **false** = nicht in der Logo-Zeile unter dem Hero.                                              |
| `sort`               | Integer    | Optional; aufsteigend sortiert (`sort`, dann `id`).                                                                                     |

**Hinweis:** Dieselbe Datei kann in zwei Einträgen vorkommen (einer nur Slider, einer nur Logo-Zeile), oder ein Eintrag mit beiden Flags **true** steuert beide Bereiche.

Lege eine Policy an (z.B. „Public Read“) mit folgenden Read-Rechten:

- `posts`: nur `status = published` (oder `status in [published, draft]`,
  wenn du Drafts mit Live Preview ausliefern willst – das Frontend filtert
  sowieso entsprechend).
- `categories`, `authors`, `downloads`, `download_categories`,
  `home_partner_logos`: `status = published`.
- `directus_files`: `read` für alle in Posts/Downloads referenzierten Files
  (am einfachsten: Public Read auf `directus_files` mit Filter
  `folder != null` o.ä.).

Der **Service-Token** in `DIRECTUS_API_TOKEN` braucht zusätzlich Read auf
Drafts, damit Live Preview funktioniert.

## 4. Live Preview

In Directus Studio:

1. Settings → Data Model → **`posts`** → „Preview URL“.
2. Eintragen (Produktion; lokal denselben Aufbau mit deiner Basis-URL):

   ```
   https://duecker-medizintechnik.de/api/draft?secret=$SECRET&type=posts&id=ID&locale=de
   ```

   Lokal z. B.:

   ```
   http://localhost:3000/api/draft?secret=$SECRET&type=posts&id=ID&locale=de
   ```

   - `$SECRET` ist der Wert aus `DIRECTUS_PREVIEW_SECRET`.
   - `ID` ist Pflicht-Platzhalter, den Directus mit der Item-ID befüllt.
   - `locale` optional (Default `de`).

   **Hinweis:** Die Preview-URL muss unter den in **`frame-src`** erlaubten
   Ursprüngen liegen (siehe oben); sonst blockiert die Browser-CSP das iframe.

3. Im Item-Editor oben „Enable Preview“ einschalten.

Auf der Frontend-Seite öffnet `app/api/draft/route.ts` daraufhin den
Draft-Mode (`draftMode().enable()`) und leitet auf die normale
Newsroom-Detailseite weiter, die das Item mit Status `draft` ausliefert.

**Hinter Reverse-Proxys (Coolify):** Setzt **`NEXT_PUBLIC_APP_URL`** auf die
öffentliche Origin (z. B. `https://duecker-medizintechnik.de`), damit der
Redirect nach `/api/draft` nicht versehentlich auf die **interne** Host-URL
(z. B. `https://localhost:3000`) zeigt. Fehlt die Variable, nutzt die Route
`X-Forwarded-Host` / `X-Forwarded-Proto`, sofern der Proxy sie setzt.

Ausstieg aus Draft Mode (z.B. für Tester):
`https://duecker-medizintechnik.de/api/draft/disable?redirect=/de/newsroom`.

## 5. Visual Editor

In Directus Studio:

1. Settings → **Visual Editor** → „Create New“.
2. URL der Live-Site eintragen, z.B. `https://duecker-medizintechnik.de/de`
   bzw. `http://localhost:3000/de`.

Das Frontend lädt `@directus/visual-editing` automatisch, sobald die Seite
im Draft-Mode (also im Preview-iFrame) gerendert wird – siehe
`src/components/providers/VisualEditorMount.tsx`. Editier-Hotspots werden
über `data-directus`-Attribute markiert (siehe `setVisualEditorAttr` in
`src/lib/directus-visual-editor.ts`).

## 6. Inhalte anlegen

1. Posts in Directus anlegen (Title, Slug, Excerpt, Content).
2. Header-Bild hochladen → in `posts.image` referenzieren.
3. Kategorien und Autoren anlegen, in den Posts verknüpfen.
4. Download-Kategorien & Downloads inkl. Dateien anlegen.
5. Locale auf den jeweiligen Items setzen (`de` / `en`).

## 7. Troubleshooting / Diagnose

### Die Seite zeigt keine Daten

Häufigste Ursachen, in der Reihenfolge wie sie geprüft werden sollten:

1. **Env-Variablen nicht gesetzt.** Beim `next build` bricht der Build sofort
   ab, wenn `NEXT_PUBLIC_DIRECTUS_URL` oder `DIRECTUS_API_TOKEN` fehlen
   (siehe `src/lib/env-assertions.ts`). Im Dev-Mode bekommst du nur eine
   Warnung in der Konsole. Vorgehen:

   ```bash
   echo $NEXT_PUBLIC_DIRECTUS_URL
   echo $DIRECTUS_API_TOKEN
   ```

2. **Berechtigungen.** Der Service-User, dem das Token gehört, braucht eine
   Policy mit Read-Access auf:
   - `posts`, `categories`, `authors`
   - `downloads`, `download_categories`
   - `directus_files`
   - die generierte Junction `downloads_files`

   Wenn die Policy fehlt, antwortet Directus mit HTTP 403, und das Frontend
   zeigt eine leere Liste – das wird ab sofort als Fehler im Server-Log
   ausgegeben (siehe `src/lib/directus-logging.ts`).

3. **Items nicht published.** Das Frontend filtert standardmäßig auf
   `status = published`. Drafts erscheinen nur unter Live Preview / Draft
   Mode. Falls der Status andere Werte haben kann, in Directus den Status
   eines Items auf „Published" stellen (oben rechts im Item-Editor).

4. **CORS.** Wenn Directus selbst gehostet wird, müssen `CORS_ENABLED=true`
   und `CORS_ORIGIN` so gesetzt sein, dass die Frontend-Domain zugelassen
   ist.

### Live Preview landet auf `https://localhost:3000`

**Symptom:** Preview-iframe oder manueller Aufruf von
`/api/draft?secret=…&type=posts&id=…` leitet auf **`https://localhost:3000/…`**
weiter, obwohl die Preview-URL mit der Produktionsdomain beginnt.

**Ursache:** Der Redirect in `app/api/draft/route.ts` baut die Ziel-URL aus der
Request-Origin. Steht Next hinter einem Proxy, kann `request.url` die **interne**
Origin sein (Coolify → Container auf `localhost:3000`).

**Lösung:** **`NEXT_PUBLIC_APP_URL`** auf die öffentliche Site setzen (siehe
Abschnitt 4), oder sicherstellen, dass der Proxy **`X-Forwarded-Host`** /
**`X-Forwarded-Proto`** an Next durchreicht. Seit dem Fix in diesem Repo wird
die öffentliche Origin bevorzugt; ein gesetztes `NEXT_PUBLIC_APP_URL` bleibt die
zuverlässigste Variante.

### Server-Logs

Jeder fehlgeschlagene Directus-Request wird im Server-Log so geloggt:

```
[directus][listPosts] You don't have permission to access this. (HTTP 403) [FORBIDDEN]
{
  hint: 'Forbidden. The role/policy attached to the API token ...',
  directusUrl: 'https://admin.duecker-medizintechnik.de',
  context: { limit: 8, draft: false }
}
```
