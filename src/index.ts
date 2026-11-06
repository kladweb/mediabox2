import { getSeoData, OG_IMAGE, SITE_NAME } from './seo/seo';

interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Worker обрабатывает только GET-запросы.
    if (request.method !== 'GET') {
      return env.ASSETS.fetch(request);
    }

    const url = new URL(request.url);

    // Получаем исходный ответ от Cloudflare Static Assets.
    const response = await env.ASSETS.fetch(request);

    const contentType = response.headers.get('content-type') ?? '';

    // Не преобразуем ответы, которые не являются HTML.
    if (!contentType.includes('text/html')) {
      return response;
    }

    const seo = getSeoData(url.pathname);

    const rewriter = new HTMLRewriter()

      // Язык HTML-документа.
      .on('html', {
        element(element) {
          element.setAttribute('lang', seo.language);
        },
      })

      // Title.
      .on('title', {
        element(element) {
          element.setInnerContent(seo.title);
        },
      })

      // Description.
      .on('meta[name="description"]', {
        element(element) {
          element.setAttribute('content', seo.description);
        },
      })

      // Robots.
      .on('meta[name="robots"]', {
        element(element) {
          element.setAttribute('content', seo.robots);
        },
      })

      // Canonical.
      .on('link[rel="canonical"]', {
        element(element) {
          element.setAttribute('href', seo.canonical);
        },
      })

      // Open Graph.
      .on('meta[property="og:title"]', {
        element(element) {
          element.setAttribute('content', seo.title);
        },
      })
      .on('meta[property="og:description"]', {
        element(element) {
          element.setAttribute('content', seo.description);
        },
      })
      .on('meta[property="og:locale"]', {
        element(element) {
          element.setAttribute('content', seo.ogLocale);
        },
      })
      .on('meta[property="og:url"]', {
        element(element) {
          element.setAttribute('content', seo.canonical);
        },
      })
      .on('meta[property="og:site_name"]', {
        element(element) {
          element.setAttribute('content', SITE_NAME);
        },
      })
      .on('meta[property="og:image"]', {
        element(element) {
          element.setAttribute('content', OG_IMAGE);
        },
      })

      // Twitter Cards.
      .on('meta[name="twitter:title"]', {
        element(element) {
          element.setAttribute('content', seo.title);
        },
      })
      .on('meta[name="twitter:description"]', {
        element(element) {
          element.setAttribute('content', seo.description);
        },
      })
      .on('meta[name="twitter:image"]', {
        element(element) {
          element.setAttribute('content', OG_IMAGE);
        },
      })
      .on('meta[name="twitter:card"]', {
        element(element) {
          element.setAttribute('content', 'summary_large_image');
        },
      })

      // Альтернативные языковые версии.
      .on('head', {
        element(element) {
          if (!seo.hreflang) return;

          element.append(
            `
              <link rel="alternate" hreflang="ru" href="${seo.alternateRu}">
              <link rel="alternate" hreflang="en" href="${seo.alternateEn}">
              <link rel="alternate" hreflang="x-default" href="${seo.defaultUrl}">
            `,
            { html: true },
          );
        },
      });

    const transformedResponse = rewriter.transform(response);

    const headers = new Headers(transformedResponse.headers);

    headers.set(
      'Cache-Control',
      'public, max-age=0, must-revalidate',
    );

    return new Response(transformedResponse.body, {
      status: transformedResponse.status,
      statusText: transformedResponse.statusText,
      headers,
    });
  },
};
