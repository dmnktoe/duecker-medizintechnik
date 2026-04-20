declare module '*.jpg';
declare module '*.png';
declare module '*.webp';
declare module '*.json';

declare module 'swiper/css';
declare module 'swiper/css/effect-fade';
declare module 'swiper/css/scrollbar';

interface Window {
  gtag?: (...args: unknown[]) => void;
}
