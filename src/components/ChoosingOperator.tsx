import { type NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { appColors } from "../services/appColors";
import { operators } from "../data/dataIPTV";
import { CardChoosing } from "./CardChoosing";
import type { ITranslate } from "../types/typesBox";

const ChoosingOperator = () => {
  const {t}: ITranslate = useTranslation();
  const navigate: NavigateFunction = useNavigate();

  const handlerBack = (): void => {
    navigate(-1);
  }

  return (
    <Box component='div' sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Box
        component='h3'
        sx={{
          m: {xs: '4.5em auto 0.75em', md: '3.5em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.2rem', md: '1.75rem'},
          fontWeight: '400',
          color: appColors.mid2,
          textAlign: 'center',
        }}
      >
        {t('operators:operators')}
      </Box>
      <Box
        component='div'
        sx={{
          m: '0 auto',
          width: '100%',
          fontSize: {xs: '1rem', md: '1.25rem'},
          fontWeight: '400',
          color: appColors.light1,
          textAlign: 'justify',
          textIndent: '2em',
        }}
      >
        <Box component='p'>
          {t('operators:operatorsIntro1')}
        </Box>
        <Box component='p'>
          {t('operators:operatorsIntro2')}
        </Box>
      </Box>
      <Box component='div' sx={{margin: '0 auto 2em', display: 'block', width: {xs: '100%', md: '70%'}}}>
        {
          Object.keys(operators).map((operator: string) => (
            <CardChoosing key={operator} operator={operator}/>
          ))
        }
      </Box>
      <Box component='button'
           onClick={handlerBack}
           sx={{
             display: 'block',
             m: '0 auto 5em',
             p: '0.5em 1em',
             color: `${appColors.mid1}`,
             fontSize: '1em',
             fontWeight: '500',
             border: `solid 2px ${appColors.mid2}`,
             borderRadius: '5px',
             cursor: 'pointer',
             transition: '0.2s',
             ':hover': {
               opacity: '0.8',
               transition: '0.2s'
             }
           }}
      >
        {t('operators:back')}
      </Box>
    </Box>
  );
}

export default ChoosingOperator;
