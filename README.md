# Dücker Medizintechnik

Ihr Partner für Reparatur und Service chirurgischer Instrumente, Herstellung und Vertrieb von sterilen Schlauchsystemen & Medizinprodukten
Entdecken Sie unser breites Spektrum an Produkten und Dienstleistungen für Reparatur und Werterhaltung von chirurgischen Instrumentarium. Erfahren Sie, wie wir Ihnen dabei helfen, eine optimale Versorgung im medizinischen Kontext zu gewährleisten.

[![CI](https://github.com/dmnktoe/duecker-medizintechnik/actions/workflows/ci.yml/badge.svg)](https://github.com/dmnktoe/duecker-medizintechnik/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/dmnktoe/duecker-medizintechnik/graph/badge.svg?token=z6uhWT52fS)](https://codecov.io/gh/dmnktoe/duecker-medizintechnik)
[![wakatime](https://wakatime.com/badge/user/79bbeb65-a4e6-42f7-a094-22622866010f/project/1251edf1-9d68-4bca-a767-7fa3c12e1f2f.svg)](https://wakatime.com/badge/user/79bbeb65-a4e6-42f7-a094-22622866010f/project/1251edf1-9d68-4bca-a767-7fa3c12e1f2f)

---

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/dmnktoe/duecker-medizintechnik.git
   ```

2. **Install dependencies**

   ```bash
   cd duecker-medizintechnik
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open the browser and visit the application**

   ```bash
   http://localhost:3000
   ```

## 📦 Technologies

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Jest](https://jestjs.io/) - Delightful JavaScript Testing
- [Testing Library](https://testing-library.com/) - Simple and complete testing utilities that encourage good testing practices
- [ESLint](https://eslint.org/) - Find and fix problems in your JavaScript code
- [Prettier](https://prettier.io/) - Opinionated Code Formatter
- [Husky](https://typicode.github.io/husky/) - Git hooks made easy
- [Directus](https://directus.io/) - Open-source headless CMS used as the backend (Posts + Download Center)
- [next-i18next](https://next.i18next.com/) - The easiest way to translate your Next.js apps

## CMS (Directus)

The site reads its content from a Directus instance (e.g. `https://admin.duecker-medizintechnik.de`).

### Required environment variables

```
NEXT_PUBLIC_DIRECTUS_URL=https://admin.duecker-medizintechnik.de
NEXT_PUBLIC_APP_URL=https://duecker-medizintechnik.de
DIRECTUS_API_TOKEN=<static-token-of-a-read-only-service-user>
DIRECTUS_PREVIEW_SECRET=<long-random-string-shared-with-directus>
```

`NEXT_PUBLIC_APP_URL` should be the public site origin (no trailing slash). It keeps `/api/draft` redirects correct behind Coolify or other reverse proxies.

See [`docs/directus-setup.md`](./docs/directus-setup.md) for the collections,
fields and Live Preview / Visual Editor setup that the frontend expects.
