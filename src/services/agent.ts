import { AGENT_MARKET_URL } from '@/constants/common';
import { isLocaleNotSupport } from '@/constants/locale';
import { Locales, normalizeLocale } from '@/locales/resources';

/**
 * 请求线上 Agent index
 */
export const getAgentIndex = async (locale: Locales) => {
  const url = isLocaleNotSupport(locale)
    ? AGENT_MARKET_URL
    : `${AGENT_MARKET_URL}/index.${normalizeLocale(locale)}.json`;

  // 自前配布では全言語ぶんの索引を置かないので、無ければ基底URLへフォールバックする
  const res = await fetch(url);
  if (res.ok) return res.json();

  const fallback = await fetch(AGENT_MARKET_URL);

  return fallback.json();
};

export const getAgentDetail = async (id: string, locale: Locales) => {
  const url = isLocaleNotSupport(locale)
    ? `${AGENT_MARKET_URL}/${id}.json`
    : `${AGENT_MARKET_URL}/${id}.${normalizeLocale(locale)}.json`;

  let res = await fetch(url);
  if (!res.ok) res = await fetch(`${AGENT_MARKET_URL}/${id}.json`);

  return res.json();
};

export const downloadGithubAgent = async (url: string) => {
  const res = await fetch('/api/agent/download', {
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return res.json();
};
