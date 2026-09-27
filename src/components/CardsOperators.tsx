import { NavLink, type Params, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from '@mui/material';
import { CardOperator } from "./CardOperator";
import { appColors } from "../services/appColors";
import { operators } from "../data/dataIPTV";
import type { ITranslate } from "../types/typesBox";
import './cards.css';

export const CardsOperators = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const lang = params.language;
  return (
    <>
      <Box
        component='h3'
        sx={{
          m: {xs: '3.5em auto 0.5em', md: '3em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.5rem', md: '2rem'},
          fontWeight: '400',
          color: appColors.mid2,
          textAlign: 'center',
        }}
      >
        {t('shared:headOperator')}
      </Box>
      <Box component='div' sx={{
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
      >
        {
          Object.keys(operators).map((operator: string, i: number) =>
            <CardOperator key={i} operator={operator}/>
          )
        }
      </Box>
      <Box
        component='h3'
        sx={{
          m: '0.5em auto 2em',
          width: '100%',
          fontSize: {xs: '1.25rem', md: '1.5rem'},
          fontWeight: '400',
          color: appColors.light1,
          textAlign: 'center',
          transition: '0.2s',
          ':hover': {
            color: appColors.mid2,
            transition: '0.1s'
          }
        }}
      >
        <NavLink to={`/${lang}/choose`} className='nav-cards nav-link'>
          {t('shared:whichChooseOperator')}
        </NavLink>
      </Box>
    </>
  )
}
