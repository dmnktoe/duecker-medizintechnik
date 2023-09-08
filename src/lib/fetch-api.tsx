import qs from 'qs';

import { getStrapiURL } from './helper';

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    return await response.json();
  } catch (error) {
    throw new Error(
      'Please check if your server is running and you set all the required tokens.'
    );
  }
}
