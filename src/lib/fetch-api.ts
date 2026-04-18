import qs from 'qs';

import { getStrapiURL } from '@/lib/strapi-urls';

export async function fetchAPI<T = unknown>(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {},
): Promise<T> {
  try {
    const mergedOptions: RequestInit = {
      next: { revalidate: 60 } as RequestInit['next'],
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const response = await fetch(requestUrl, mergedOptions);
    return (await response.json()) as T;
  } catch (error) {
    throw new Error(
      `API fetch failed for ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
