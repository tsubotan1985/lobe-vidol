import { normalizeLocale, supportLocales } from '@/locales/resources';

// 社内フォークの既定は日本語。表示言語は設定画面で切替できる（副系は英語）。
export const DEFAULT_LANG = 'ja-JP';
export const LOBE_LOCALE_COOKIE = 'LOBE_LOCALE';

/**
 * Check if the language is supported
 * @param locale
 */
export const isLocaleNotSupport = (locale: string) => {
  return normalizeLocale(locale) === DEFAULT_LANG || !supportLocales.includes(locale);
};
