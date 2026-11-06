import { type NavigateFunction, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, CardActionArea, Typography } from '@mui/material';
import { sxMainCards, sxMainDescription } from "../services/sxStyles";
import type { ITranslate, PropsService } from "../types/typesBox";
import './cards.css';
import { appColors } from "../services/appColors.ts";

const Service = ({
                   textInfo,
                   pageNavigation,
                   nameService,
                   descriptionService
                 }: PropsService) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Box component="p" sx={sxMainDescription}>
        {textInfo}
      </Box>

      <CardActionArea
        sx={sxMainCards}
        onClick={() => navigate(pageNavigation)}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{fontSize: '3em', p: 0, m: 0}}
        >
          {nameService}
        </Typography>

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{fontSize: '1.25em'}}
        >
          {descriptionService}
        </Typography>
      </CardActionArea>
    </>
  );
};

const MainInfo = () => {
  const {t}: ITranslate = useTranslation();

  return (
    <Box sx={{mt: 11, width: '100%'}}>
      <Box sx={{textAlign: 'center', px: 2, mb: 3}}>
        <Typography
          variant="h4"
          component="h1"
          sx={{fontWeight: 600, color: appColors.mid2}}
        >
          MEDIABOX
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{mt: 1, color: appColors.mid21}}
        >
          {t('main:mainTitle')}
        </Typography>

        <Typography
          component="p"
          sx={{mt: 1, color: appColors.mid21}}
        >
          {t('main:mainIntro')}
        </Typography>
      </Box>

      <Service
        textInfo={t('main:mainText1')}
        pageNavigation="iptv"
        nameService="IPTV"
        descriptionService={t('main:mainButton1')}
      />

      <Service
        textInfo={t('main:mainText2')}
        pageNavigation="media"
        nameService={t('main:mainButton21')}
        descriptionService={t('main:mainButton23')}
      />
    </Box>
  );
};

export default MainInfo;
