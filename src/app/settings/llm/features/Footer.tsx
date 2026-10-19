'use client';

import { useTheme } from 'antd-style';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

const Footer = memo(() => {
  const theme = useTheme();
  return (
    <Center
      style={{
        background: theme.colorFillQuaternary,
        border: `1px dashed ${theme.colorFillSecondary}`,
        borderRadius: theme.borderRadiusLG,
        padding: 12,
      }}
    >
      <div style={{ color: theme.colorTextSecondary, fontSize: 12, textAlign: 'center' }}>
        利用できるモデルは社内のLLM基盤で管理しています。追加の希望は情報システム担当へご連絡ください。
      </div>
    </Center>
  );
});

export default Footer;
