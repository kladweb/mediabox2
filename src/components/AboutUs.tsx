import { Box } from '@mui/material';
import { useTranslation } from "react-i18next";
import { appColors } from "../services/appColors";
import { sxParagraphAbout1 } from "../services/sxStyles";
import type { ITranslate } from "../types/typesBox";
import './cards.css';

export const AboutUs = () => {
  const {t}: ITranslate = useTranslation();
  // const linkMoney: string = 'https://yoomoney.ru/fundraise/1124NP8L2IV.240223';

  return (
    <>
      <Box
        component='h3'
        sx={{
          m: {xs: '4.5em auto 0.75em', md: '3.5em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.2rem', md: '1.75rem'},
          fontWeight: '500',
          color: appColors.mid2,
          textAlign: 'center'
        }}
      >
        {t('about:aboutTitle')}
      </Box>
      <Box
        component='div'
        sx={{
          m: '0 auto 5rem',
          width: '100%',
          fontSize: {xs: '1rem', md: '1.25rem'},
          fontWeight: '400',
          color: appColors.light1,
          textAlign: 'justify',
        }}
      >
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent01')}</Box>
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent02')}</Box>
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent03')}</Box>
        {/*<Box component='p' sx={sxParagraphAbout1}>{t('aboutContent04')}</Box>*/}
        {/*<Box component='a' href={linkMoney} target="_blank" sx={sxButtonCoffee}>*/}
        {/*  {t('aboutContent041')}*/}
        {/*  <Box component='p' sx={sxButtonCoffee2}>{t('aboutContent042')}</Box>*/}
        {/*</Box>*/}
        {/*<Box*/}
        {/*  component='p'*/}
        {/*  sx={{*/}
        {/*    m: '-0.5em 0 0.5em ',*/}
        {/*    textAlign: 'center',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {t('aboutContent044')}*/}
        {/*</Box>*/}
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent05')}</Box>
        <Box component='p' sx={{my: '1rem', fontStyle: 'italic', textAlign: 'center'}}>{t('about:aboutContent06')}</Box>
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent07')}</Box>
        <Box
          component='h3'
          sx={{
            m: {xs: '2em auto 0.75em', md: '2em auto 0.5em'},
            width: '100%',
            fontSize: {xs: '1rem', md: '1.5rem'},
            fontWeight: '500',
            color: appColors.mid2,
            textAlign: 'center',
          }}
        >
          {t('about:aboutContent30')}
        </Box>
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent31')}</Box>
        <Box component='p' sx={sxParagraphAbout1}>{t('about:aboutContent32')}</Box>
      </Box>
    </>
  )
}
