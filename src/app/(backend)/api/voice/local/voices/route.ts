export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const getBaseUrl = () => process.env.AIVIS_SPEECH_URL || 'http://127.0.0.1:10101';

interface AivisStyle {
  id: number;
  name: string;
}

interface AivisSpeaker {
  name: string;
  styles: AivisStyle[];
}

export const GET = async () => {
  const res = await fetch(`${getBaseUrl()}/speakers`);

  if (!res.ok) {
    return new Response(await res.text(), { status: res.status });
  }

  const speakers = (await res.json()) as AivisSpeaker[];

  const data = speakers.flatMap((speaker) =>
    (speaker.styles || []).map((style) => ({
      DisplayName: `${speaker.name} (${style.name})`,
      DisplayVoiceName: style.name,
      LocalName: `${speaker.name} (${style.name})`,
      PreviewSentence: 'こんにちは。社内手続きのご案内をします。',
      ShortName: String(style.id),
      locale: 'ja-JP',
      localeZH: '日本語',
    })),
  );

  return Response.json(data);
};
