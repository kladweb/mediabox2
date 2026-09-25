import { useState, type SyntheticEvent } from "react";
import { Box, Skeleton } from "@mui/material";
import { appColors } from "../services/appColors";
import type { PropsImageChannel } from "../types/typesBox";

export const ListChannel = ({index, srcImgChannel, altImgChannel, nameImgChannel}: PropsImageChannel) => {

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const handlerErrorImg = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/img/channels/noimage.webp';
  }

  const handlerLoadImg = () => {
    setImageLoaded(true);
  }

  return (
    <Box key={index} component="div"
         sx={{
           display: 'flex',
           m: '0.2rem 0.5rem',
           width: {xs: '100%', sm: '45%', md: '31%', lg: '23%'},
           height: {xs: '3rem', md: '4rem'},
           textAlign: 'left',
           backgroundColor: appColors.light11,
           borderRadius: '0.5rem'
         }}
    >
      <Box
        component="img"
        src={srcImgChannel}
        alt={altImgChannel}
        sx={{
          display: `${imageLoaded ? 'block' : 'none'}`,
          m: {xs: '0.2rem 0.5rem', md: '0.5rem'},
          // height: {xs: '2rem', md: '3rem'},
          width: {xs: '15%', md: '25%'},
          objectFit: "contain",
          borderRadius: {xs: '3px', md: '5px'}
        }}
        onError={handlerErrorImg}
        onLoad={handlerLoadImg}
      />
      {
        (imageLoaded ? null :
            <Skeleton variant="rounded" sx={{
              display: 'inline-block',
              m: {xs: '0.5rem', md: '0.5rem'},
              height: {xs: '2rem', md: '3rem'},
              width: {xs: '15%', md: '25%'}
            }}/>
        )
      }
      <Box component="div"
           sx={{
             ml: '0.5rem',
             display: "flex",
             justifyContent: "left",
             alignItems: "center",
             width: '70%',
             verticalAlign: 'middle'
           }}
      >
        <Box component="span" sx={{wordWrap: 'break-word'}}>
          {nameImgChannel}
        </Box>
      </Box>
    </Box>
  );
}
