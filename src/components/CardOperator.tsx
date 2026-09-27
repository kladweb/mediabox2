import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Skeleton } from '@mui/material';
import { appColors } from "../services/appColors";
import { operators } from "../data/dataIPTV";
import { type PropsOperator } from "../types/typesBox";

export const CardOperator = ({operator}: PropsOperator) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const card = <Card sx={{
    cursor: 'default',
    width: {xs: '90vw', sm: 345},
    maxWidth: 345,
    height: 180,
    margin: {xs: '0.75rem 0', sm: '1.5rem'},
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: appColors.light1,
    transition: '1s',
    ':hover': {
      transform: `${(loaded) ? 'scale(1.05)' : 'none'}`,
      transition: '0.4s',
    }
  }}>
    <CardActionArea>
      <CardMedia
        component="img"
        image={`/img/operators/${operator.toLowerCase()}.webp`}
        alt={operator}
        onLoad={() => setLoaded(true)}
        sx={{
          margin: "1em 0",
          height: '5rem',
          objectFit: "contain",
          display: (loaded) ? 'block' : 'none'
        }}
      />
      {
        (!loaded) && <Skeleton variant="rounded" width={280} height='5rem' sx={{m: "auto"}}/>
      }
      <CardContent sx={{textAlign: 'center', color: `${appColors.mid1}`}}>
        {
          (loaded) ?
            <Typography gutterBottom variant="h6" component="div"
                        sx={{fontSize: '1.45em', lineHeight: '1.25em'}}
            >
              {operators[operator as keyof (typeof operators)]['name']}
            </Typography>
            :
            <Skeleton variant="text" sx={{fontSize: '1.75rem', width: '50%', m: '0.5rem auto -0.5rem'}}/>
        }
      </CardContent>
    </CardActionArea>
  </Card>

  return (
    <>
      {
        (loaded) ?
          <NavLink to={operator.toLowerCase()} className='nav-cards'>
            {card}
          </NavLink>
          :
          <>
            {card}
          </>
      }
    </>
  );
}
