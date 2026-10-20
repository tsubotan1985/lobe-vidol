import { t } from 'i18next';

import { DEFAULT_LANG } from '@/constants/locale';
import { SettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { Config, TTSConfig, TouchConfig } from '@/types/config';
import {
  GlobalLLMProviderKey,
  ProviderConfig,
  UserModelProviderConfig,
} from '@/types/provider/modelProvider';
import { TouchAction, TouchAreaEnum } from '@/types/touch';
import { merge } from '@/utils/merge';

export const currentConfig = (s: SettingStore): Config => merge(s.defaultConfig, s.config);

export const currentLanguageModelConfig = (s: SettingStore): UserModelProviderConfig => {
  // @ts-ignore
  return currentConfig(s).languageModel || {};
};

export const getProviderConfigById = (provider: string) => (s: SettingStore) =>
  currentLanguageModelConfig(s)[provider as GlobalLLMProviderKey] as ProviderConfig | undefined;

const currentTouchConfig = (s: SettingStore): TouchConfig => {
  // @ts-ignore
  return currentConfig(s).touch || {};
};

const currentLanguage = (s: SettingStore) => {
  const locale = currentConfig(s).locale;

  if (locale === 'auto') {
    // ブラウザの言語ではなく、サーバが描いた既定（日本語）に合わせる。
    // 英語にしたい場合は設定画面で明示的に切り替える（その値は locale に入る）。
    return DEFAULT_LANG;
  }

  return locale;
};

const currentTTSConfig = (s: SettingStore): TTSConfig => {
  // @ts-ignore
  return currentConfig(s).tts || {};
};

const getTouchActionsByGenderAndArea = (
  s: SettingStore,
  gender: GenderEnum,
  touchArea: TouchAreaEnum,
): TouchAction[] => {
  const items = currentConfig(s).touch?.[gender]?.[touchArea] || [];
  return items.map((item) => ({ ...item, text: t(item.text, { ns: 'role' }) || item.text }));
};

export const configSelectors = {
  currentLanguageModelConfig,
  currentTouchConfig,
  currentLanguage,
  currentConfig,
  currentTTSConfig,
  getTouchActionsByGenderAndArea,
  getProviderConfigById,
};
