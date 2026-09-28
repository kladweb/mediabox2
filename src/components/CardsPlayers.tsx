import { useEffect } from "react";
import { type NavigateFunction, type Params, NavLink, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from '@mui/material';
import { appColors } from "../services/appColors";
import { players } from "../data/dataIPTV";
import { CardPlayer } from "./CardPlayer";
import type { ITranslate } from "../types/typesBox";
import './cards.css';

export const CardsPlayers = () => {
  const navigate: NavigateFunction = useNavigate();
  const deviceNames: string[] = Object.keys(players);
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const device: string | undefined = params.device;

  useEffect(() => {
    if (device && !(deviceNames.includes(device))) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Box
        component='h3'
        sx={{
          m: {xs: '4.5em auto 0.75em', md: '4em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.2rem', md: '1.5rem'},
          fontWeight: '400',
          color: appColors.mid2,
          textAlign: 'center',
        }}
      >
        {t('shared:headPlayer')}
      </Box>
      <Box component='div' sx={{
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      >
        {
          (device && deviceNames.includes(device)) &&
          <>
            {
              players[device as keyof (typeof players)].map((player: string, i: number) =>
                <NavLink
                  key={i}
                  to={player.replace(/[-\s]/g, '').toLowerCase()}
                  className='nav-cards'
                >
                  <CardPlayer player={player}/>
                </NavLink>
              )
            }
          </>
        }
      </Box>
    </>
  )
}
