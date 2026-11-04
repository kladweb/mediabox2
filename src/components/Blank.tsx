import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { appColors } from "../services/appColors";
import type { ITranslate } from "../types/typesBox";

export const Blank = () => {
  const {t}: ITranslate = useTranslation();
  return (
    <Box component='div' sx={{
      height: "100vh",
      width: '100%',
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Box component='h5' sx={{
        display: "block",
        px: "0.25em",
        fontSize: "1.5em",
        fontWeight: "300",
        textAlign: "center",
        whiteSpace: "pre-wrap",
        color: appColors.light1,
      }}>
        {t('shared:blank')}
      </Box>
    </Box>
  )
}
