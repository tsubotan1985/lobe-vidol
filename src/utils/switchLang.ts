import { changeLanguage } from 'i18next';

import { DEFAULT_LANG, LOBE_LOCALE_COOKIE } from '@/constants/locale';
import { LocaleMode } from '@/types/locale';
import { setCookie } from '@/utils/cookie';

export const switchLang = (locale: LocaleMode) => {
  // 'auto' でもブラウザ言語には追従せず、アプリ既定（日本語）にする。
  // 英語にしたいときは設定画面で明示的に選ぶ。
  const lang = !locale || locale === 'auto' ? DEFAULT_LANG : locale;

  changeLanguage(lang).then(() => {
    document.documentElement.lang = lang;
    // 次回のサーバ描画でも同じ言語になるよう cookie に残す
    setCookie(LOBE_LOCALE_COOKIE, lang);
    // 刷新系统 https://github.com/lobehub/lobe-chat/issues/2724
    // window.location.reload();
  });
};
