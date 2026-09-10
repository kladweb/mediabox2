import { useEffect } from "react";
import { Box } from '@mui/material'
import { Navigate, Outlet, useParams } from "react-router-dom";
import Header from "../components/Header.tsx";
import { appColors } from "../services/appColors";
import { useTranslation } from "react-i18next";

export const MainLayout = () => {
  const {language} = useParams();
  const {i18n} = useTranslation();

  const lang = language === 'en' || language === 'ru' ? language : null;

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  if (!lang) {
    return <Navigate to="/ru" replace/>;
  }

  return (
    <>
      <Header/>
      <Box sx={{minHeight: '100vh', backgroundColor: appColors.mid1,}}>
        <Outlet/>
      </Box>
    </>
  );
}
