export const runtime = 'nodejs';

const DEFAULT_SPEAKER = '888753760';

const getBaseUrl = () => process.env.AIVIS_SPEECH_URL || 'http://127.0.0.1:10101';

interface LocalTTSPayload {
  message?: string;
  pitch?: number;
  speed?: number;
  voice?: string;
}

export const POST = async (req: Request) => {
  const payload = (await req.json()) as LocalTTSPayload;
  const base = getBaseUrl();
  const speaker = payload.voice || process.env.AIVIS_SPEECH_SPEAKER || DEFAULT_SPEAKER;
  const text = payload.message || '';

  const queryRes = await fetch(
    `${base}/audio_query?speaker=${encodeURIComponent(speaker)}&text=${encodeURIComponent(text)}`,
    { method: 'POST' },
  );

  if (!queryRes.ok) {
    return new Response(await queryRes.text(), { status: queryRes.status });
  }

  const query = await queryRes.json();
  query.speedScale = payload.speed ?? 1;
  query.pitchScale = Math.max(-0.15, Math.min(0.15, ((payload.pitch ?? 1) - 1) * 0.3));
  query.outputSamplingRate = 24_000;

  const synthRes = await fetch(`${base}/synthesis?speaker=${encodeURIComponent(speaker)}`, {
    body: JSON.stringify(query),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!synthRes.ok) {
    return new Response(await synthRes.text(), { status: synthRes.status });
  }

  return new Response(await synthRes.arrayBuffer(), {
    headers: { 'Content-Type': 'audio/wav' },
    status: 200,
  });
};
