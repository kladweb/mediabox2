import { useMatch } from "react-router-dom";
import type { TManualsSection } from "../types/typesBox.ts";

export type Language = 'ru' | 'en';

export const getLanguage = (language: string): Language => {
  return language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
};

export const useCurrentSection = () => {
  const isMedia = !!useMatch('/:language/media/*');
  const isIptv = !!useMatch('/:language/iptv/*');

  const section: TManualsSection | null = isMedia ? 'media' : isIptv ? 'iptv' : null;
  return {section};
}
