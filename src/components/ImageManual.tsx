import { useState } from "react";
import { CardMedia, Skeleton } from "@mui/material";
import type { PropsImg } from "../types/typesBox.ts";

const ImageManual = ({image}: PropsImg) => {
  const scaleBig: number = (window.innerWidth <= 900) ? 98 : 70;
  const scaleSmall: number = (window.innerWidth <= 900) ? 35 : 15;
  const [scaleImg, setScaleImg] = useState<number>(scaleSmall);
  const [cursor, setCursor] = useState<string>('zoom-in');
  const [loaded, setLoaded] = useState<boolean>(false);

  const handlerZoom = (): void => {
    if (scaleImg <= scaleSmall) {
      setScaleImg(scaleBig);
      setCursor('zoom-out');
    } else {
      setScaleImg(scaleSmall);
      setCursor('zoom-in');
    }
  }

  return (
    <>
      <CardMedia
        component="img"
        image={`/img/manuals/${image}.webp`}
        alt={image}
        onLoad={() => setLoaded(true)}
        onClick={handlerZoom}
        sx={{
          margin: {xs: '0 auto 0.25rem', md: '0.5em auto 1em'},
          display: (loaded) ? 'block' : 'none',
          objectFit: "contain",
          cursor: `${cursor}`,
          width: `${scaleImg}%`,
          transition: '0.2s ease-in-out'
        }}
      />
      {
        (!loaded) &&
        <Skeleton
          variant="rounded"
          sx={{m: "0.5em auto", width: `${scaleSmall}%`, height: `${(window.innerWidth <= 900) ? 5 : 4}em`}}
        />
      }
    </>
  )
}

export default ImageManual;
