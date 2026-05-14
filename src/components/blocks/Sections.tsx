import type { Section } from '@/lib/types';
import { Hero } from './Hero';
import { RichText } from './RichText';
import { Cta } from './Cta';

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'hero':
            return <Hero key={section._key} block={section} />;
          case 'richText':
            return <RichText key={section._key} block={section} />;
          case 'cta':
            return <Cta key={section._key} block={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
