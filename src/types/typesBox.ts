import {useTranslation} from "react-i18next";

export type PropsStep = {
  step: number;
}

export type PropsImg = {
  image: string;
}

export type PropsCinema = {
  cinema: string
}

export type PropsDevice = {
  device: string
}

export type PropsPlayer = {
  player: string
}

export type PropsOperator = {
  operator: string;
}

interface callbackType {
  (myArgument: string): void
}

export type PropsListChannels = {
  operator: string;
  activeCard: string;
  changeCard: callbackType;
}

export type PropsLoader = {
  isOpenLoader: boolean;
}

export type PropsService = {
  textInfo: string,
  pageNavigation: string,
  nameService: string,
  descriptionService: string
}

export type PropsImageChannel = {
  index: number,
  srcImgChannel: string,
  altImgChannel: string,
  nameImgChannel: string
}

export interface ITranslate {
  t: ReturnType<typeof useTranslation>['t']
}

export interface ITranslateI18n {
  t: ReturnType<typeof useTranslation>['t'],
  i18n: ReturnType<typeof useTranslation>['i18n'],
}

export interface ILinks {
  linkOfficial?: string
  link4PDA?: string,
  linkFast?: string,
}

export interface ILocales {
  en: { title: 'English' },
  ru: { title: 'Русский' }
}

export interface Idevices {
  boxes: string[],
  smarttv: string[]
}

export interface IplayersAll {
  ottnavigator: string,
  ottplayfoss: string,
  ottplaybyalex: string,
  televizo: string,
  ottplayer: string,
  ssiptv: string,
  flexiptv: string,
  riptv: string,
}

export interface Iplayers {
  androidtvbox: string[],
  appletv: string[],
  lgsmarttv: string[],
  samsungsmarttv: string[],
  androidtv: string[],
}

export interface Icinemas {
  hdvideobox: string,
  lampaandroid: string,
  lampasmarttv: string,
  lampabrowser: string
}

type IOperator = {
  name: string,
  links: string[],
  // linksDirect: string[],
  epg: string,
}

export interface Ioperators {
  ilooktv: IOperator,
  sharavoz: IOperator,
  viplime: IOperator,
  // domavip: IOperator,
  cbilling: IOperator,
  kineskopclub: IOperator,
  tvteam: IOperator,
  russkoetv: IOperator,
}

export type ContextCategoriesType = { [index: string]: any };
