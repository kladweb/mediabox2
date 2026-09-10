import { type NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, CardActionArea, Typography } from '@mui/material';
import { sxMainCards, sxMainDescription } from "../services/sxStyles";
import type { ITranslate, PropsService } from "../types/typesBox";
import './cards.css';

const Service = ({textInfo, pageNavigation, nameService, descriptionService}: PropsService) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <Box component='p' sx={sxMainDescription}>{textInfo}</Box>
      <CardActionArea
        sx={sxMainCards}
        onClick={() => {
          navigate(`/${pageNavigation}`);
        }}
      >
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize: '3em', p: 0, m: 0}}>
          {nameService}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{fontSize: '1.25em'}}>
          {descriptionService}
        </Typography>
      </CardActionArea>
    </>
  );
}

const MainInfo = () => {
  const {t}: ITranslate = useTranslation();

  return (
    <Box sx={{mt: 7}}>
      <Service
        textInfo={t('mainText1')}
        pageNavigation='iptv'
        nameService='IPTV'
        descriptionService={t('mainButton1')}
      />
      <Service
        textInfo={t('mainText2')}
        pageNavigation='media'
        nameService={t('mainButton21')}
        descriptionService={t('mainButton23')}
      />
    </Box>
  )
}

export default MainInfo;
