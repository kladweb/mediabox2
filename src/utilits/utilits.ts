export type Language = 'ru' | 'en';

export const getLanguage = (language: string): Language => {
  return language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
};
