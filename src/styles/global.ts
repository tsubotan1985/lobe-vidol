import { css } from 'antd-style';

export default ({ prefixCls }: { prefixCls: string }) => css`
  /* 日本語を最優先にするフォント。端末に無い場合に備えて Noto Sans JP を同梱している。 */
  @font-face {
    font-family: 'Noto Sans JP (bundled)';
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
    src: url('/fonts/NotoSansJP-ja.woff2') format('woff2-variations');
  }

  html body,
  html body .${prefixCls}-app, html body button,
  html body input,
  html body textarea,
  html body select,
  html body .${prefixCls}-typography {
    font-family:
      'UD デジタル教科書体 NK',
      'UD Digi Kyokasho NK',
      'Yu Gothic UI',
      'Yu Gothic',
      'Hiragino Sans',
      'Hiragino Kaku Gothic ProN',
      'Noto Sans JP (bundled)',
      'Noto Sans JP',
      Meiryo,
      system-ui,
      -apple-system,
      'Segoe UI',
      sans-serif;
  }

  html,
  body,
  #__next,
  .${prefixCls}-app {
    position: relative;
    overscroll-behavior: none;
    height: 100% !important;
    min-height: 100% !important;

    ::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }

  p {
    margin-bottom: 0;
  }

  @media (max-width: 575px) {
    * {
      ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
      }
    }
  }
`;
