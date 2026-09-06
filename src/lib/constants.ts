export const COMPANY_INFO = {
  name: 'ИП Абросимова Светлана Алексеевна',
  nameRu: 'Сарпро',
  shortName: 'SARPRO',
  inn: '6401055170',
  ogrn: '1096401000001',
  legalAddress: '410012, Саратовская область, Саратов, проспект 50 лет Октября, д. 24/26',
  physicalAddress: '410012, Саратовская область, Саратов, проспект 50 лет Октября, д. 24/26',
  email: 'info@sarpro.ru',
  phoneMain: '+7 (905) 386-08-70',
  phoneAlt: '+7 (962) 621-91-60',
  website: 'sarpro.ru'
};

export const SITE_CONFIG = {
  title: 'SARPRO — сейфы, пломбы и оборудование для безопасности',
  description: 'Официальный поставщик сейфов, пломб, ККТ и банковского оборудования. Доставка по РФ. Гарантия качества.',
  keywords: ['сейфы', 'пломбы', 'ККТ', 'фискальное оборудование', 'банковское оборудование'],
  language: 'ru',
  locale: 'ru_RU',
  charset: 'UTF-8',
  robots: 'index, follow',
  googleSiteVerification: '',
  yandexVerification: '',
};

export const SOCIAL_LINKS = {
  vk: 'https://vk.com/sarpro',
  telegram: 'https://t.me/sarpro_oficial',
  whatsapp: 'https://wa.me/79053860870',
};

export const PAYMENT_METHODS = [
  'Банковский перевод (для физических и юридических лиц)',
  'Наличный расчёт',
  'Электронные платёжные системы (Яндекс.Касса)',
];

export const DELIVERY_METHODS = [
  'Доставка по России (CDEK, Boxberry, Почта России)',
  'Доставка в Саратов (круглосуточно)',
  'Доставка в Санкт-Петербург (партнёры)',
  'Самовывоз из офиса',
];

export const TRUST_BADGES = [
  {
    icon: '🛡️',
    title: 'Гарантия качества',
    description: 'Гарантия на все товары от 1 до 3 лет',
    stat: '100%',
    bgGradient: 'from-primary-100 to-primary-200',
  },
  {
    icon: '🚚',
    title: 'Доставка по РФ',
    description: 'Быстрая доставка в течение 48 часов',
    stat: '48ч',
    bgGradient: 'from-green-100 to-green-200',
  },
  {
    icon: '📜',
    title: 'Сертификаты',
    description: 'Все товары сертифицированы по ГОСТ и 54-ФЗ',
    stat: '20+',
    bgGradient: 'from-primary-100 to-indigo-200',
  },
  {
    icon: '☎️',
    title: 'Поддержка 24/7',
    description: 'Вспомогательная служба работает всегда для вас',
    stat: '5мин',
    bgGradient: 'from-cta-100 to-orange-200',
  },
];
