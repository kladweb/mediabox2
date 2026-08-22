import type { Icinemas, Idevices, Ioperators, Iplayers, IplayersAll } from "../types/typesBox";

export const nameApp: string
  = 'MEDIABOX';

export const devices: Idevices = {
  boxes: ['Android TV Box', 'Apple TV'],
  smarttv: ['LG Smart TV', 'SAMSUNG Smart TV']
}

export const playersAll: IplayersAll = {
  ottnavigator: 'OTT Navigator',
  ottplayfoss: 'OTT-play FOSS',
  ottplaybyalex: 'Ott-Play by Alex',
  televizo: 'Televizo',
  ottplayer: 'OttPlayer',
  ssiptv: 'SS IPTV',
  flexiptv: 'Flex IPTV',
  riptv: 'rIPTV',
}

export const players: Iplayers = {
  androidtvbox: [
    'Televizo',
    'OTT Navigator',
    'OTT-play FOSS',
    'Ott-Play by Alex',
    'OttPlayer',
  ],
  appletv: [
    // 'rIPTV',
    'Flex IPTV',
    'OttPlayer',
  ],
  lgsmarttv: [
    'OTT-play FOSS',
    'Ott-Play by Alex',
    'SS IPTV',
    'OttPlayer',
  ],
  samsungsmarttv: [
    'OTT-play FOSS',
    'Ott-Play by Alex',
    'SS IPTV',
    'OttPlayer',
  ],
  androidtv: [
    'Televizo',
    'OTT Navigator',
    'OTT-play FOSS',
    'Ott-Play by Alex',
    'OttPlayer',
  ],
};

export const operators: Ioperators = {
  ilooktv: {
    name: 'ILookTv',
    links: [
      'https://vipdrive.net/welcome/signup/54e9515db854ab61',
      'https://tvlider.net/welcome/signup/54e9515db854ab61',
      'https://melord.net/welcome/signup/54e9515db854ab61',
      'https://jinopro.net/welcome/signup/54e9515db854ab61',
      'https://iseetv.net/welcome/signup/54e9515db854ab61',
    ],
    epg: 'http://epg.it999.ru/epg.xml.gz'
  },
  sharavoz: {
    name: 'Sharavoz',
    links: [
      'https://ztempz.xyz/YZoaV4m2wgp-qvc0IYnwHb4TgHBqZaaFgzY8AoVUr2zQJ8fB-w4elw=='
    ],

    epg: 'http://iptv-content.webhop.net/guide.xml'
  },
  viplime: {
    name: 'VipLime',
    links: [
      'http://viplime.fun/index.php?user=2006'
    ],

    epg: 'http://epg.cdntv.online/full.xml.gz'
  },
  cbilling: {
    name: 'cbilling',
    links: [
      'https://smotrivip.com/?pp=23417',
      'https://cbillingtv.com/pl/23417',
    ],
    epg: 'http://epg.iptvx.tv/xmltv.xml.gz'
  },
  tvteam: {
    name: 'TV.TEAM',
    links: [
      'https://tv.team/420774',
    ],
    epg: 'http://epg.it999.ru/epg.xml.gz',
  },
  kineskopclub: {
    name: 'Kineskop.club',
    links: [
      'https://kineskop.club/?p=MTAxMTI0MA'
    ],

    epg: 'http://st.kineskop.tv/epg.xml.gz'
  },
  russkoetv: {
    name: 'RUSSKOETV',
    links: [
      'https://russkoetv.shop?ref=277521'
    ],
    epg: 'http://rutv.aws-static-hosting.com/epg.xml.gz'
  }
}

export const cinemas: Icinemas = {
  hdvideobox: 'HD Videobox',
  lampaandroid: 'Lampa for android',
  lampasmarttv: 'Lampa for Smart TV',
  lampabrowser: 'Lampa for browser'
}
