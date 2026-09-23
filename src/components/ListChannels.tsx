import { useState } from "react";
import { type NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Card, CardMedia, CardActionArea, Skeleton } from '@mui/material';
import { appColors } from "../services/appColors";
import type { PropsListChannels } from "../types/typesBox";

export const ListChannels = ({ operator, activeCard, changeCard }: PropsListChannels) => {
  const navigate: NavigateFunction = useNavigate();
  const currentLang = useParams();
  const lang = currentLang.language;
  const [loaded, setLoaded] = useState<boolean>(false);

  // Вычисляем значение прямо во время рендера без лишних стейтов и эффектов
  const isActive = operator === activeCard;

  const handlerList = () => {
    // Если карточка не активна, активируем её и переходим по роуту
    if (!isActive) {
      navigate(`/${lang}/lists/${operator}`);
      changeCard(operator); // Передаем наверх, что эта карточка стала активной
    } else {
      // Если карточка уже активна — деактивируем (сбрасываем)
      navigate(`/${lang}/lists`);
      changeCard('');
    }
  };

  const card = (
    <Card
      sx={{
        cursor: 'default',
        width: { xs: '25vw', sm: 115 },
        maxWidth: 115,
        height: 50,
        margin: { xs: '0.5rem', sm: '1rem' },
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: appColors.light1,
        boxShadow: isActive ? 'none' : `3px 3px 10px ${appColors.dark2}`,
        transform: isActive ? 'translate(3px, 3px)' : 'none',
        transition: '0.15s',
      }}
      onClick={handlerList}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={`/img/operators/${operator.toLowerCase()}.webp`}
          alt={operator}
          onLoad={() => setLoaded(true)}
          sx={{
            m: '-1rem 0.1rem 0',
            p: '0',
            height: '5rem',
            objectFit: "contain",
            display: loaded ? 'block' : 'none',
          }}
          className="cardList"
        />
        {!loaded && <Skeleton variant="rounded" width={280} height="5rem" sx={{ m: "auto" }} />}
      </CardActionArea>
    </Card>
  );

  return <>{card}</>;
};
