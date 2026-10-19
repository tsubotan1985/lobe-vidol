import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ロール配布用の索引・詳細を返す。言語別ファイルが無い場合は既定ファイルへ落とす。
// （public/ の静的配信はビルド時に確定するため、後から足すファイルが404になるのを避ける）
const readAgent = (file: string) =>
  readFile(path.join(process.cwd(), 'public', 'agents', file), 'utf8');

const asJson = (body: string, status = 200) =>
  new Response(body, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    status,
  });

export const GET = async (_req: Request, { params }: { params: { slug?: string[] } }) => {
  const first = params.slug?.[0] ?? '';

  // /vidol-agents または /vidol-agents/index.<locale>.json
  if (!first || first.startsWith('index.')) {
    try {
      return asJson(await readAgent('index.json'));
    } catch {
      return asJson(JSON.stringify({ agents: [], schemaVersion: 1 }));
    }
  }

  // /vidol-agents/<agentId>.<locale>.json
  const id = first.split('.')[0];

  try {
    return asJson(await readAgent(`${id}.json`));
  } catch {
    return asJson(JSON.stringify({ error: `agent not found: ${id}` }), 404);
  }
};
