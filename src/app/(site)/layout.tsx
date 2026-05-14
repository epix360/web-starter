import { sanityFetch } from '@/sanity/fetch';
import { siteSettingsQuery } from '@/sanity/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { SiteSettings } from '@/lib/types';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
