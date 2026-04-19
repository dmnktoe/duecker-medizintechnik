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
  const query = params.toString();
  const appBase =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '')
      : undefined;
  if (appBase) {
    return `${appBase}/api/og?${query}`;
  }
  return `/api/og?${query}`;
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
