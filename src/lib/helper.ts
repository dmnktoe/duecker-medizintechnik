const SITE_URL = 'https://www.duecker-medizintechnik.de';

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
};

export function openGraph({
  siteName,
  templateTitle,
  description,
}: OpenGraphType): string {
  const title = (templateTitle ?? siteName).trim();
  const params = new URLSearchParams({
    title,
    description: description.trim(),
  });
  return `${SITE_URL}/api/og?${params.toString()}`;
}

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time));
