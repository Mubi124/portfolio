'use client';
import dynamic from 'next/dynamic';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then(mod => ({ default: mod.NextStudio })),
  { ssr: false }
);

import config from '../../../../sanity.config';

export default function StudioWrapper() {
  return <NextStudio config={config} />;
}
