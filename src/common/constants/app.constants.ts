export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_I18N_DIR = 'i18n/';
export const SETTING_FIELD_LENGTH = {
  ARTICLE: {
    TITLE_MIN: 5,
    TITLE_MAX: 255,
    DESCRIPTION_MIN: 10,
    DESCRIPTION_MAX: 500,
    SLUG_MIN: 5,
    SLUG_MAX: 255,
    BODY_MIN: 10,
    BODY_MAX: 10000,
  },

  TAG: {
    TAG_NAME_MIN: 1,
    TAG_NAME_MAX: 100,
  },
} as const;
