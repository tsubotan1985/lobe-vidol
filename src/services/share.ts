import { ShareGPTConversation } from '@/types/share';

/**
 * 会話の外部共有は無効化している。
 * 以前は sharegpt.com へ会話全文をPOSTしていた（社内利用では不要かつ情報漏えいの恐れ）。
 * UI からは共有ボタンを外してあり、ここに来ても送信はしない。
 */
class ShareService {
  public async createShareGPTUrl(conversation: ShareGPTConversation): Promise<string> {
    void conversation; // 送信しない（引数は型合わせのみ）

    throw new Error('外部への共有は無効化されています');
  }
}

export const shareService = new ShareService();
