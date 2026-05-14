'use client';

/**
 * Sanity Studio mounted at /studio
 * Loads sanity.config.ts as its config.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
