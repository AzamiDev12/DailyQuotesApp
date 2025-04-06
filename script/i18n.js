import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { translations } from './localization';
 

const i18n = new I18n(translations)
i18n.locale = Localization.locale
i18n.enableFallback = true
i18n.defaultLocale = "eng";

export {i18n,translations};