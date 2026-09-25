import { type Params, Outlet, useParams, useNavigate, type NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { appColors } from "../services/appColors";
import type { ITranslate } from "../types/typesBox";
import { operators } from "../data/dataIPTV";
import { ListChannels } from "./ListChannels";

export const ListsChannels = () => {
  const navigate: NavigateFunction = useNavigate();
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();

  const currentOperator = params.operator;
  const lang = params.language;
  const activeCard = currentOperator ?? '';

  const handlerList = (isActive: boolean, operator: string) => {
    if (!isActive) {
      navigate(`/${lang}/lists/${operator}`);
    } else {
      navigate(`/${lang}/lists`);
    }
  };

  return (
    <>
      <Box
        component='h3'
        sx={{
          m: {xs: '2em auto 0.5em', md: '3em auto 0.5em'},
          width: '100%',
          fontSize: {xs: '1.25rem', md: '1.75rem'},
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
            <ListChannels
              key={i}
              operator={operator}
              activeCard={activeCard}
              handlerList={handlerList}
            />
          )
        }
      </Box>
      <Outlet/>
    </>
  )
}
