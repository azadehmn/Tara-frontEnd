import type { ImageSlide } from '@shared/ui';

type BannerFile = {
  src: string;
  id: number;
  ext: 'svg' | 'png';
};

const modules = Object.entries(
  import.meta.glob('../../../assets/images/services/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,
)
  .map(([path, src]) => {
    const match = path.match(/(\d+)\.(svg|png)$/i);
    if (!match) return null;
    return {
      src,
      id: Number(match[1]),
      ext: match[2].toLowerCase() as BannerFile['ext'],
    };
  })
  .filter((item): item is BannerFile => item !== null);

const unique = new Map<number, BannerFile>();
for (const item of modules) {
  const current = unique.get(item.id);
  if (!current || (current.ext === 'png' && item.ext === 'svg')) {
    unique.set(item.id, item);
  }
}

export const serviceBanners: ImageSlide[] = [...unique.values()]
  .sort((a, b) => b.id - a.id)
  .map((item) => ({ src: item.src, alt: '' }));
