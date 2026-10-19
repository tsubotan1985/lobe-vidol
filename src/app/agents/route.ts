import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 言語が既定（zh-CN）のとき、クライアントは `<base>` をそのまま索引URLとして叩く。
// 静的ファイルでは `/agents` を配れないので、ここで同梱の索引JSONを返す。
export const GET = async () => {
  try {
    const file = path.join(process.cwd(), 'public', 'agents', 'index.json');
    const body = await readFile(file, 'utf8');

    return new Response(body, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      status: 200,
    });
  } catch {
    return Response.json({ agents: [], schemaVersion: 1 }, { status: 200 });
  }
};
