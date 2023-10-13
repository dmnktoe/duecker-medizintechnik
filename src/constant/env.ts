export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';
export const googleAnalyticsId = 'G-HNLHM0MQDN';
export const cookieBotId = '3722981a-3eb0-4ff9-9145-777cf50e6875';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;
