import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

import {
  COOKIE_CACHE_DAYS,
  DEFAULT_LANG,
  LOBE_LOCALE_COOKIE,
  getDebugConfig,
} from '@/constants/i18n';
import { DEFAULT_LANG as APP_DEFAULT_LANG } from '@/constants/locale';
import { normalizeLocale } from '@/locales/resources';
import { isDev, isOnServerSide } from '@/utils/env';

const { I18N_DEBUG, I18N_DEBUG_BROWSER, I18N_DEBUG_SERVER } = getDebugConfig();
const debugMode = (I18N_DEBUG ?? isOnServerSide) ? I18N_DEBUG_SERVER : I18N_DEBUG_BROWSER;

export const createI18nNext = (lang?: string) => {
  const instance = i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(async (lng: string, ns: string) => {
        if (isDev && lng === 'zh-CN') return import(`./default/${ns}`);

        return import(`@/../locales/${normalizeLocale(lng)}/${ns}.json`);
      }),
    );
  return {
    init: () =>
      instance.init({
        debug: debugMode,
        ns: ['error', 'common', 'chat', 'welcome', 'role'],
        detection: {
          // ブラウザの言語ではなく、保存された選択 → サーバが描いた言語 の順で決める（既定は日本語）
          order: ['cookie', 'htmlTag'],
          caches: [],
          cookieMinutes: 60 * 24 * COOKIE_CACHE_DAYS,
          cookieOptions: {
            sameSite: 'lax',
          },
          lookupCookie: LOBE_LOCALE_COOKIE,
        },
        fallbackLng: DEFAULT_LANG,
        interpolation: {
          escapeValue: false,
        },
        // 指定が無ければアプリ既定（日本語）。ブラウザ言語には追従しない。
        lng: lang || APP_DEFAULT_LANG,
      }),
    instance,
  };
};
