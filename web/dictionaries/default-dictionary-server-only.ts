import 'server-only';

import { defaultDictionary } from '.';
import { Locale, i18n } from '@/config/i18n.config';

export const getDictonaryServerOnly = (locale: Locale) => {
  return defaultDictionary[locale] ?? defaultDictionary[i18n.defaultLocale as Locale];
}
