import qs from 'qs';

import { fetchAPI } from '@/lib/fetch-api';
import { getStrapiURL } from '@/lib/strapi-urls';

// Mocking fetch
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test data' }),
  }),
);

describe('fetchAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    const path = '/test';
    const urlParamsObject = { param1: 'value1' };
    const options = {};

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}`,
    )}`;

    const data = await fetchAPI(path, urlParamsObject, options);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(requestUrl, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      ...options,
    });
    expect(data).toEqual({ data: 'test data' });
  });
});
