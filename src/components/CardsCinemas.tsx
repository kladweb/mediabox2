import { useTranslation } from "react-i18next";
import { NavLink, type Params, useParams } from "react-router-dom";
import { Box } from '@mui/material';
import { appColors } from "../services/appColors";
import { CardCinema } from "./CardCinema";
import type { ITranslate } from "../types/typesBox";
import { manualsTree } from "../data/dataIPTV.ts";
import './cards.css';

export const CardsCinemas = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const devicesPage: string | undefined = params.devices;

  if (!devicesPage) return null;

  const cinemas = Object.keys(manualsTree.media[devicesPage as keyof typeof manualsTree.media]);

  return (
    <>
      <Box
        component='h1'
        sx={{
          m: {xs: '4.5em auto 0.75em', md: '3.5em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.2rem', md: '1.75rem'},
          fontWeight: '400',
          color: appColors.mid2,
          textAlign: 'center',
        }}
      >
        {t('shared:headApplication')}
      </Box>
      <Box component='div' sx={{
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      >
        {
          cinemas.map((cinema: string, i: number) =>
            <NavLink
              key={i}
              to={cinema}
              className='nav-cards'
            >
              <CardCinema cinema={cinema} devicesPage={devicesPage}/>
            </NavLink>
          )
        }
      </Box>
    </>
  )
}
