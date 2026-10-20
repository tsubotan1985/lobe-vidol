import { message } from 'antd';
import { useState } from 'react';

import { backgroundOptions } from '@/constants/background';
import { fetchWithProgress } from '@/utils/fetch';
import { getBackgroundPathById } from '@/utils/file';
import { cacheStorage } from '@/utils/storage';

const getBackgroundUrlById = (backgroundId: string) => {
  const background = backgroundOptions.find((item) => item.id === backgroundId);
  if (!background) return undefined;
  // ローカル配信のパスはそのまま使う（外部CDNへは出ない）
  return background.url.startsWith('/')
    ? background.url
    : `https://r2.vidol.chat/backgrounds/${encodeURIComponent(background.url)}`;
};

const getBackgroundThumbById = (backgroundId: string) => {
  const background = backgroundOptions.find((item) => item.id === backgroundId);
  if (!background) return undefined;
  return background.thumbnail.startsWith('/')
    ? background.thumbnail
    : `https://r2.vidol.chat/backgrounds/${encodeURIComponent(background.thumbnail)}`;
};

export const useLoadBackground = () => {
  const [downloading, setDownloading] = useState(false);
  const [percent, setPercent] = useState(0);

  const fetchBackgroundUrl = async (backgroundId: string) => {
    const backgroundUrl = getBackgroundUrlById(backgroundId);
    if (!backgroundUrl) {
      message.info('未找到对应的背景图片');
      return;
    }
    const localBackgroundPath = getBackgroundPathById(backgroundId);
    let backgroundBlob = await cacheStorage.getItem(localBackgroundPath);

    try {
      if (!backgroundBlob) {
        setDownloading(true);
        setPercent(0);

        backgroundBlob = await fetchWithProgress(backgroundUrl, {
          onProgress: (loaded, total) => {
            setPercent((loaded / total) * 100);
          },
        });
        await cacheStorage.setItem(localBackgroundPath, backgroundBlob);
      }
    } finally {
      setDownloading(false);
    }
    if (!backgroundBlob) return undefined;

    return URL.createObjectURL(backgroundBlob);
  };

  return {
    downloading,
    percent,
    fetchBackgroundUrl,
    getBackgroundUrlById,
    getBackgroundThumbById,
  };
};
