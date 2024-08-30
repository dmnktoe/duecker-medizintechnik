export const cookieBotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
export const datadogApplicationId =
  process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
export const datadogClientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
export const flagsmithId = process.env.NEXT_PUBLIC_FLAGSMITH_ID;
export const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
export const isLocal = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const ogBaseUrl = process.env.NEXT_PUBLIC_OG_BASE_URL;
export const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const showLogger = isLocal
  ? true
  : (process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false);
