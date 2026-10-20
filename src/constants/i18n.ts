// i18n のフォールバック言語（英語）。アプリ既定は src/constants/locale.ts の ja-JP。
export const DEFAULT_LANG = 'en-US';
// 表示言語の cookie。サーバ側（src/constants/locale.ts）と同じ名前にする。
export const LOBE_LOCALE_COOKIE = 'CLADS_LOCALE';
// cookie cache days
export const COOKIE_CACHE_DAYS = 30;
// debug mode
export const getDebugConfig = () => ({
  // developer debug mode
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEVELOPER_DEBUG === '1',

  // i18n debug mode
  I18N_DEBUG: process.env.NEXT_PUBLIC_I18N_DEBUG === '1',
  I18N_DEBUG_BROWSER: process.env.NEXT_PUBLIC_I18N_DEBUG_BROWSER === '1',
  I18N_DEBUG_SERVER: process.env.NEXT_PUBLIC_I18N_DEBUG_SERVER === '1',
});
