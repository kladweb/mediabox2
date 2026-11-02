import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Skeleton } from '@mui/material';
import { appColors } from "../services/appColors";
import { cinemas } from "../data/dataIPTV";
import type { ITranslate, PropsCinema } from "../types/typesBox";

export const CardCinema = ({cinema}: PropsCinema) => {
  const {t}: ITranslate = useTranslation();
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Card sx={{
      width: {xs: '85vw', md: 345},
      maxWidth: 345,
      height: 100,
      m: "0.75em",
      p: "0",
      display: 'flex',
      alignContent: 'flex-start',
      backgroundColor: appColors.light1,
      transition: '1s',
      ':hover': {
        transform: 'scale(1.05)',
        transition: '0.4s'
      },
    }}>
      <CardActionArea sx={{
        display: 'flex',
        justifyContent: 'start',
        alignContent: 'center',
      }}>
        <CardMedia
          component="img"
          image={`/img/apps/${cinema.slice(0, 5)}.webp`}
          alt={cinema}
          onLoad={() => setLoaded(true)}
          sx={{display: (loaded) ? 'block' : 'none', width: "18%", margin: "0.5em", objectFit: "contain"}}
        />
        {
          (!loaded) && <Skeleton variant="rounded" sx={{width: "18%", height: "5em", m: "0.7em"}}/>
        }
        <CardContent sx={{display: "block", width: '75%', color: `${appColors.mid1}`}}>
          <Typography gutterBottom component="div" sx={{mt: "0.25em", fontSize: '1.5em', lineHeight: '1em'}}>
            {cinemas[cinema as keyof (typeof cinemas)]}
          </Typography>
          <Typography gutterBottom component="div" sx={{m: "0", fontSize: '1em', lineHeight: '1.25em'}}>
            {t(`shared:${cinema}-note`)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
