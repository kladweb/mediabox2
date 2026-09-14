import { useTranslation } from "react-i18next";
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { appColors } from "../services/appColors";
import { operators } from "../data/dataIPTV";
import type { ITranslate, PropsOperator } from "../types/typesBox";

export const CardChoosing = ({operator}: PropsOperator) => {
  const {t}: ITranslate = useTranslation();
  const prices: string[] = `${t(`price-${operator}`)}`.split('-');
  const descriptions: string[] = `${t(`description-${operator}`)}`.split('-');
  const links: string[] = operators[operator as keyof (typeof operators)]['links'];
  const mirrors: string[] = links.slice(1);

  const handlerOperator = (link: string): void => {
    window.open(link);
  }

  return (
    <Card
      component='div'
      sx={{
        margin: "1.5em auto",
        display: 'block',
        backgroundColor: appColors.light1,
        transition: '1s',
        border: `solid 5px ${appColors.mid2}`,
        borderRadius: '1em'
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={`/img/operators/${operator.toLowerCase()}.png`}
        alt={operator}
        sx={{margin: "1em 0 -1em", objectFit: "contain"}}
      />
      <CardContent sx={{textAlign: 'left', color: `${appColors.dark2}`}}>
        <Typography gutterBottom component="h6"
                    sx={{fontSize: {xs: '1rem', md: '1.25rem'}}}
        >
          {t('price')}
        </Typography>
        <Typography gutterBottom component="div"
                    sx={{
                      fontSize: {xs: '0.9rem', md: '1.25rem'},
                      lineHeight: {xs: '1.5rem', md: '1.75rem'},
                      color: `${appColors.mid1}`,
                      whiteSpace: 'pre-wrap',
                    }}
        >
          {
            <ul style={{margin: 0}}>
              {
                prices.map((price, i) => (
                  <li key={i}>{price}</li>
                ))
              }
            </ul>
          }
        </Typography>
        <Typography gutterBottom component="h6"
                    sx={{mt: '1em', fontSize: {xs: '1rem', md: '1.25rem'}}}
        >
          {t('description')}
        </Typography>
        <Typography gutterBottom
                    component="div"
                    sx={{
                      fontSize: {xs: '0.9rem', md: '1.25rem'},
                      lineHeight: {xs: '1.5rem', md: '1.75rem'},
                      color: `${appColors.mid1}`
                    }}
        >
          {
            <ul style={{margin: 0, listStyleImage: "url('/img/icons/arrow.png')", whiteSpace: 'pre-wrap'}}>
              {
                descriptions.map((description, i) => (
                  <li key={i}>{description}</li>
                ))
              }
            </ul>
          }
        </Typography>
        <Box
          component='button'
          onClick={(): void => {
            handlerOperator(links[0]);
          }}
          sx={{
            display: 'inline-block',
            p: '0.6em 1em 0.5em',
            mt: '1em',
            textDecoration: 'none',
            color: `${appColors.mid2}`,
            fontSize: {xs: '1rem', md: '1.1rem'},
            fontWeight: '400',
            backgroundColor: `${appColors.mid1}`,
            borderRadius: '0.75em',
            border: 'none',
            cursor: 'pointer',
            transition: '0.2s',
            ':hover': {
              opacity: '0.8',
              transition: '0.2s'
            }
          }}
        >
          {t('link')}
        </Box>
        {
          (mirrors.length > 0) ?
            <div>
              {
                mirrors.map((mirror: string, i: number) =>
                  <Box
                    key={i}
                    component='button'
                    onClick={(): void => {
                      handlerOperator(mirror);
                    }}
                    sx={{
                      display: 'inline-block',
                      p: '0.4em 0.5em',
                      m: '1em 0.5em 0 0',
                      textDecoration: 'none',
                      color: `${appColors.mid2}`,
                      fontSize: '1.1em',
                      fontWeight: '400',
                      backgroundColor: `${appColors.mid1}`,
                      borderRadius: '0.5em',
                      border: 'none',
                      cursor: 'pointer',
                      transition: '0.2s',
                      ':hover': {
                        opacity: '0.8',
                        transition: '0.2s'
                      }
                    }}
                  >
                    {`${t('mirror')}${i + 1}`}
                  </Box>
                )
              }
            </div>
            :
            null
        }
      </CardContent>
    </Card>
  );
}
