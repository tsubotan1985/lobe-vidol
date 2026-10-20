export const EMPTY_ID = 'empty';

export interface StageOption {
  id: string;
  name: string;
  thumbnail: string;
  url?: string;
}

// 外部CDN（r2.vidol.chat）のステージは使わない。空舞台だけをローカルで持つ。
export const stageList: StageOption[] = [
  {
    id: EMPTY_ID,
    name: '背景なし',
    thumbnail: '/images/transparent.png',
  },
];
