import { useEffect, useState } from "react";
import { type Params, Outlet, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { appColors } from "../services/appColors";
import type { ITranslate } from "../types/typesBox";
import { useTranslation } from "react-i18next";
import { operators } from "../data/dataIPTV";
import { ListChannels } from "./ListChannels";

export const ListsChannels = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const currentOperator = params.operator;
  const [activeCard, setActiveCard] = useState<string>('');

  const changeCard = (nameCard: string) => {
    setActiveCard(nameCard);
  }

  useEffect(() => {
    if (currentOperator) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCard(currentOperator);
    }
  }, []);

  return (
    <>
      <Box
        component='h3'
        sx={{
          m: {xs: '3.5em auto 0.5em', md: '3em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.25rem', md: '1.75rem'},
          fontWeight: '400',
          color: appColors.mid2,
          textAlign: 'center',
        }}
      >
        {t('headOperator')}
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
            <ListChannels
              key={i}
              operator={operator}
              activeCard={activeCard}
              changeCard={changeCard}
            />
          )
        }
      </Box>
      <Outlet/>
    </>
  )
}
