import { DEFAULT_TTS_CONFIG_FEMALE } from '@/constants/tts';
import { ModelProvider } from '@/libs/agent-runtime';
import {
  Agent,
  GenderEnum,
  RoleCategoryEnum,
  SystemAgentConfig,
  SystemAgentItem,
} from '@/types/agent';

export const LOBE_VIDOL_DEFAULT_AGENT_ID = 'lobe-vidol-default-agent';
const OFFICIAL_ROLE_NAME = '篠';

// 既定のモデルは AnythingLLM のワークスペース slug（= 社内手続きRAG）
export const DEFAULT_CHAT_MODEL = 'procedure';
export const DEFAULT_CHAT_PROVIDER = ModelProvider.OpenAI;

/**
 * 默认使用的 ChatGPT 聊天模型配置
 */
export const DEFAULT_LLM_CONFIG: Partial<Agent> = {
  model: DEFAULT_CHAT_MODEL,
  provider: DEFAULT_CHAT_PROVIDER,
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.6,
    top_p: 1,
  },
};

export const DEFAULT_AGENT_CONFIG = {
  ...DEFAULT_LLM_CONFIG,
  systemRole: '',
  ...DEFAULT_TTS_CONFIG_FEMALE,
};

export const DEFAULT_CHAT_CONFIG = {
  enableHistoryCount: true,
  historyCount: 8,
};

export const LOBE_VIDOL_DEFAULT_AGENT: Agent = {
  agentId: LOBE_VIDOL_DEFAULT_AGENT_ID,
  author: 'CLADS',
  createAt: '2026-10-20',
  greeting: `おはようございます。社内手続きのご相談ですね。どの件でしょうか。`,
  homepage: '',
  meta: {
    cover: '/agents/img/shino_cover.jpg',
    avatar: '/agents/img/shino_avatar.png',
    category: RoleCategoryEnum.VROID,
    description: '社内規程・手続きの案内役。根拠が無いときは推測せず、窓口を案内します。',
    gender: GenderEnum.FEMALE,
    model: '/avatars/Sendagaya_Shino.vrm',
    name: OFFICIAL_ROLE_NAME,
    readme:
      'アバター: 千駄ヶ谷 篠（VRoid Studio 公式サンプルキャラクター、CC0）。出所 https://github.com/madjin/vrm-samples',
  },
  systemRole: `あなたは「篠（しの）」です。CLADSの社内手続きを案内する役割を担っています。

話し方
- 日本語で話す。丁寧で落ち着いた敬語を使う。
- 一文は短くする。専門用語は必要なら言い換えを添える。
- 絵文字は使わない。相づちだけで文を埋めない。

回答の規範
- 社内文書に根拠があるときだけ断定する。金額・期限・様式名・部署名は原文の表記のまま書く。
- 根拠が見つからないときは「手元の資料では確認できません」と明言し、主管部門か窓口を案内する。推測を断定として書かない。
- 複数の規程が関わるときは、どの規程の話かを明示して分けて説明する。
- 手続きの手順を聞かれたら、順番に番号を振って書く。

立場の明示
- あなたの回答は規程の要約である。最終的な判断は主管部門が行う。必要ならその旨を一言添える。
- あなたはAIである。聞かれたら隠さない。

出力の形式
- 思考の過程やタグ（<think> など）は本文に書かない。結論だけを書く。`,
  tts: { ...DEFAULT_TTS_CONFIG_FEMALE },
  model: 'procedure',
  provider: DEFAULT_CHAT_PROVIDER,
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.6,
    top_p: 1,
  },
};

export const DEFAULT_SYSTEM_AGENT_ITEM: SystemAgentItem = {
  model: DEFAULT_CHAT_MODEL,
  provider: DEFAULT_CHAT_PROVIDER,
};

export const DEFAULT_SYSTEM_AGENT_CONFIG: SystemAgentConfig = {
  emotionAnalysis: DEFAULT_SYSTEM_AGENT_ITEM,
};
