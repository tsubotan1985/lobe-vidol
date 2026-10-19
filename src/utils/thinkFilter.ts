/**
 * ストリーミング本文から推論モデルの思考タグを取り除く。
 * タグがチャンク境界で分割されても壊れないよう、確定できない末尾だけを内部に保持する。
 */
export interface ThinkFilter {
  filter: (text: string) => string;
  flush: () => string;
}

const OPEN = '<think';

export const createThinkFilter = (): ThinkFilter => {
  let buffer = '';
  let inThink = false;

  const filter = (text: string): string => {
    if (text) buffer += text;

    let out = '';

    for (;;) {
      if (inThink) {
        const closeAt = buffer.indexOf('</think');
        if (closeAt === -1) break;

        const gtAt = buffer.indexOf('>', closeAt);
        if (gtAt === -1) break;

        buffer = buffer.slice(gtAt + 1);
        inThink = false;
        continue;
      }

      const openAt = buffer.indexOf(OPEN);

      if (openAt === -1) {
        // 末尾が開きタグの途中で切れている可能性がある分だけ残す
        let hold = 0;
        for (let k = Math.min(OPEN.length - 1, buffer.length); k > 0; k--) {
          if (OPEN.startsWith(buffer.slice(buffer.length - k))) {
            hold = k;
            break;
          }
        }
        out += buffer.slice(0, buffer.length - hold);
        buffer = buffer.slice(buffer.length - hold);
        break;
      }

      // 開きタグの '>' まで揃っていなければ、次のチャンクを待つ
      const gtAt = buffer.indexOf('>', openAt);
      if (gtAt === -1) {
        out += buffer.slice(0, openAt);
        buffer = buffer.slice(openAt);
        break;
      }

      out += buffer.slice(0, openAt);
      buffer = buffer.slice(gtAt + 1);
      inThink = true;
    }

    return out;
  };

  return {
    filter,
    flush: () => {
      const out = inThink ? '' : buffer;
      buffer = '';
      inThink = false;
      return out;
    },
  };
};
