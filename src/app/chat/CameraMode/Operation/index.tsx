'use client';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import CallOff from './actions/CallOff';
// 音声入力（Web Speech API）は音声がGoogleへ送られるため無効化している。
// 使う場合は下のコメントを外し、利用者に外部送信の説明をすること。
// import Record from './actions/Record';
import Setting from './actions/Setting';

const VoiceOperation = memo(() => {
  return (
    <Flexbox gap={24} horizontal align={'center'}>
      <CallOff />
      <Setting />
    </Flexbox>
  );
});

export default VoiceOperation;
