import { Metadata } from 'next';

import pkg from '../../package.json';

const title = 'Lobe Vidol';
const { description, homepage } = pkg;

const metadata: Metadata = {
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title,
  },
  description,
  // 外部CDNは使わず、同梱アイコンだけを使う
  icons: {
    apple: '/icons/shino-180.png',
    icon: '/icons/shino-32.png',
    shortcut: '/icons/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    description: description,
    images: [{ alt: title, height: 630, url: '/icons/og.png', width: 1200 }],
    locale: 'en-US',
    siteName: title,
    title: title,
    type: 'website',
    url: homepage,
  },

  title: {
    default: title,
    template: '%s · Vidol',
  },
};

export default metadata;
