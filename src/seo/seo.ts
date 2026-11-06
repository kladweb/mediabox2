
const SITE_URL = 'https://mediabox.mov';
const SITE_NAME = 'MEDIABOX';
const OG_IMAGE = `${SITE_URL}/open.webp`;

type Language = 'ru' | 'en';

type SeoData = {
  title: string;
  description: string;
  robots: string;
};

type PageType = 'home' | 'iptv' | 'media' | 'about' | 'manual' | 'noindex';

type SeoResult = SeoData & {
  language: Language;
  canonical: string;
  alternateRu: string;
  alternateEn: string;
  defaultUrl: string;
  ogLocale: string;
  hreflang: boolean;
};

const content: Record<Language, Record<PageType, SeoData>> = {
  ru: {
    home: {
      title: 'MEDIABOX — IPTV, интернет-телевидение и медиатека',
      description:
        'MEDIABOX — ваш справочник по IPTV и медиаресурсам. Обзор операторов интернет-телевидения, медиасервисов, плееров и подробные инструкции по настройке просмотра на различных устройствах.',
      robots: 'index, follow, max-image-preview:large',
    },
    iptv: {
      title: 'IPTV операторы и настройка интернет-телевидения | MEDIABOX',
      description:
        'Обзор IPTV-операторов и сервисов интернет-телевидения. Сравнивайте возможности провайдеров, узнавайте о пробных периодах и изучайте инструкции по настройке IPTV на Smart TV и других устройствах.',
      robots: 'index, follow, max-image-preview:large',
    },
    media: {
      title: 'Медиатека, онлайн-кинотеатры и медиаплееры | MEDIABOX',
      description:
        'Узнайте, где смотреть фильмы, сериалы и мультфильмы, какие медиасервисы и плееры выбрать. Обзоры OTT-приложений и подробные инструкции по настройке просмотра на Smart TV, приставках и других устройствах.',
      robots: 'index, follow, max-image-preview:large',
    },
    about: {
      title: 'О проекте MEDIABOX',
      description:
        'MEDIABOX — практический справочник по интернет-телевидению и мультимедиа. Обзоры IPTV-операторов, медиасервисов, плееров и инструкции по настройке оборудования.',
      robots: 'index, follow',
    },
    manual: {
      title: 'Инструкции по настройке IPTV и медиаплееров | MEDIABOX',
      description:
        'Практические инструкции по настройке интернет-телевидения, медиаплееров и оборудования для просмотра контента.',
      robots: 'noindex, follow',
    },
    noindex: {
      title: 'MEDIABOX — IPTV и медиаресурсы',
      description:
        'MEDIABOX — справочник по интернет-телевидению, медиасервисам и настройке устройств.',
      robots: 'noindex, follow',
    },
  },

  en: {
    home: {
      title: 'MEDIABOX — IPTV, Streaming Services & Media Guides',
      description:
        'MEDIABOX is your guide to IPTV and media services. Explore internet TV providers, streaming platforms, media players and step-by-step setup guides for different devices.',
      robots: 'index, follow, max-image-preview:large',
    },
    iptv: {
      title: 'IPTV Providers & Setup Guides | MEDIABOX',
      description:
        'Explore IPTV providers and internet television services. Compare features, discover free trial options and find setup guides for Smart TVs and other devices.',
      robots: 'index, follow, max-image-preview:large',
    },
    media: {
      title: 'Media Library, Streaming Services & Media Players | MEDIABOX',
      description:
        'Discover where to watch movies, TV shows and cartoons, explore streaming services and media players, and find practical setup guides for Smart TVs and other devices.',
      robots: 'index, follow, max-image-preview:large',
    },
    about: {
      title: 'About MEDIABOX',
      description:
        'MEDIABOX is a practical guide to internet television and multimedia. Explore IPTV providers, streaming services, media players and device setup instructions.',
      robots: 'index, follow',
    },
    manual: {
      title: 'IPTV and Media Player Setup Guides | MEDIABOX',
      description:
        'Practical guides for setting up IPTV, media players and devices for watching online content.',
      robots: 'noindex, follow',
    },
    noindex: {
      title: 'MEDIABOX — IPTV & Media Resources',
      description:
        'MEDIABOX — a guide to internet television, media services and device setup.',
      robots: 'noindex, follow',
    },
  },
};

const getPageType = (segments: string[]): PageType => {
  const [section, ...rest] = segments;

  if (!section) return 'home';

  switch (section) {
    case 'iptv':
      return rest.length === 0
        ? 'iptv'
        : rest.length === 4
          ? 'manual'
          : 'noindex';

    case 'media':
      return rest.length === 0
        ? 'media'
        : rest.length === 1
          ? 'manual'
          : 'noindex';

    case 'about':
      return rest.length === 0 ? 'about' : 'noindex';

    case 'choose':
    case 'lists':
    case 'faq':
    default:
      return 'noindex';
  }
};

const buildPath = (language: Language, suffix: string): string => {
  if (!suffix) return `/${language}/`;

  return `/${language}/${suffix}`;
};

export const getSeoData = (pathname: string): SeoResult => {
  const segments = pathname.split('/').filter(Boolean);

  const language: Language = segments[0] === 'en' ? 'en' : 'ru';

  const pageSegments =
    segments[0] === 'ru' || segments[0] === 'en'
      ? segments.slice(1)
      : [];

  const pageType = getPageType(pageSegments);
  const data = content[language][pageType];

  const suffix = pageSegments.join('/');
  const canonical = `${SITE_URL}${buildPath(language, suffix)}`;

  return {
    ...data,
    language,
    canonical,
    alternateRu: `${SITE_URL}${buildPath('ru', suffix)}`,
    alternateEn: `${SITE_URL}${buildPath('en', suffix)}`,
    defaultUrl: `${SITE_URL}${buildPath('ru', suffix)}`,
    ogLocale: language === 'ru' ? 'ru_RU' : 'en_US',
    hreflang: ['home', 'iptv', 'media', 'about'].includes(pageType),
  };
};

export { SITE_URL, SITE_NAME, OG_IMAGE };
