# Directus Setup

Diese Datei beschreibt die Collections, Felder und Einstellungen, die du in
Directus anlegen musst, damit das Frontend ohne Anpassungen funktioniert.

> Die Migration ersetzt die bisherige Strapi-Anbindung 1:1 (Posts + Download
> Center). Slug-/Routen-Struktur (`/newsroom/<slug>`, `/downloads`) bleibt
> unverändert.

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

- Damit Directus den Visual Editor in das Frontend per `<iframe>` einbetten
  darf:

  ```yaml
  CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC: "'self' http://localhost:3000 https://duecker-medizintechnik.de https://www.duecker-medizintechnik.de"
  ```

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

| Feld       | Typ                                                  | Notizen                                                                  |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| `name`     | String                                               | Anzeigename in der Akkordeon-Zeile                                       |
| `category` | M2O → `download_categories`                          |                                                                          |
| `files`    | M2M zu `directus_files` (Junction `downloads_files`) | Junction-Spalten heißen automatisch `downloads_id` & `directus_files_id` |
| `locale`   | String                                               | Optional. Wenn gesetzt, filtert das Frontend pro Sprache (`de`/`en`).    |

> **Hinweis zu M2M-Files:** Beim Anlegen wählst du in Directus Studio für das
> Feld `files` den Interface-Typ „Files“ – Directus generiert dann die
> Junction-Collection automatisch. Das Frontend liest die Dateien über
> `files[].directus_files_id`.

## 3. Berechtigungen

Lege eine Policy an (z.B. „Public Read“) mit folgenden Read-Rechten:

- `posts`: nur `status = published` (oder `status in [published, draft]`,
  wenn du Drafts mit Live Preview ausliefern willst – das Frontend filtert
  sowieso entsprechend).
- `categories`, `authors`, `downloads`, `download_categories`: `status = published`.
- `directus_files`: `read` für alle in Posts/Downloads referenzierten Files
  (am einfachsten: Public Read auf `directus_files` mit Filter
  `folder != null` o.ä.).

Der **Service-Token** in `DIRECTUS_API_TOKEN` braucht zusätzlich Read auf
Drafts, damit Live Preview funktioniert.

## 4. Live Preview

In Directus Studio:

1. Settings → Data Model → **`posts`** → „Preview URL“.
2. Eintragen:

   ```
   https://duecker-medizintechnik.de/api/draft?secret=$SECRET&type=posts&id=ID&locale=de
   ```

   - `$SECRET` ist der Wert aus `DIRECTUS_PREVIEW_SECRET`.
   - `ID` ist Pflicht-Platzhalter, den Directus mit der Item-ID befüllt.
   - `locale` optional (Default `de`).

3. Im Item-Editor oben „Enable Preview“ einschalten.

Auf der Frontend-Seite öffnet `app/api/draft/route.ts` daraufhin den
Draft-Mode (`draftMode().enable()`) und leitet auf die normale
Newsroom-Detailseite weiter, die das Item mit Status `draft` ausliefert.

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

## 6. Schritt-für-Schritt-Migration der bestehenden Daten

Empfehlung, da Inhalte überschaubar sind:

1. Posts in Directus neu anlegen (Title, Slug, Excerpt, Content kopieren).
2. Header-Bild hochladen → in `posts.image` referenzieren.
3. Kategorien und Autoren anlegen, in den Posts verknüpfen.
4. Download-Kategorien & Downloads inkl. Dateien anlegen.
5. Locale auf den jeweiligen Items setzen (`de` / `en`).

Nach dem Import kann die Strapi-Instanz abgeschaltet werden – das Frontend
ruft sie nicht mehr auf.

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

### Diagnose-Endpoint

Während Directus läuft, kannst du den eingebauten Diagnose-Endpoint
aufrufen:

```bash
# Lokal:
curl http://localhost:3000/api/cms/diagnostics | jq

# Production (geschützt mit DIRECTUS_PREVIEW_SECRET):
curl 'https://<dein-host>/api/cms/diagnostics?secret=<DIRECTUS_PREVIEW_SECRET>' | jq
```

Der Output zeigt:

- ob die Env-Variablen gesetzt sind (Token-Wert wird **nicht** geleakt),
- ob die Directus-Instanz erreichbar ist (`/server/ping`),
- ob jede Collection Daten zurückgibt – und sonst die HTTP-Status-Codes
  und Directus-Fehlermeldungen, also genau die Info, die du brauchst um
  Permissions zu fixen.

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
