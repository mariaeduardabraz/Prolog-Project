'use client'

import { Locale, i18n } from "@/config/i18n.config";
import { defaultDictionary } from ".";

export const getDictonaryUseClient = (locale: Locale) => {
  return defaultDictionary[locale] ?? defaultDictionary[i18n.defaultLocale as Locale]
};
