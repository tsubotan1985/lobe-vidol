import { normalizeLocale, supportLocales } from '@/locales/resources';

// 社内フォークの既定は日本語。表示言語は設定画面で切替できる（副系は英語）。
export const DEFAULT_LANG = 'ja-JP';
// cookie 名を更新して、以前の既定（中国語）が残っているブラウザを一度だけ日本語へ戻す。
export const LOBE_LOCALE_COOKIE = 'CLADS_LOCALE';

/**
 * Check if the language is supported
 * @param locale
 */
export const isLocaleNotSupport = (locale: string) => {
  return normalizeLocale(locale) === DEFAULT_LANG || !supportLocales.includes(locale);
};
