export const TRANSPARENT_ID = 'transparent';

interface BackgroundOption {
  id: string;
  name: string;
  thumbnail: string;
  url: string; // 添加 thumbnail 参数
}

// 外部CDN（r2.vidol.chat）の背景は使わない。ローカルの透明画像だけを持つ。
export const backgroundOptions: BackgroundOption[] = [
  {
    id: TRANSPARENT_ID,
    name: '背景なし',
    url: '/images/transparent.png',
    thumbnail: '/images/transparent.png',
  },
];
