import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from "../layouts/MainLayout.tsx";
import { PageMain } from "../pages/PageMain.tsx";
import { useTranslation } from "react-i18next";
import type { ITranslateI18n } from "../types/typesBox.ts";
import { PageChoosingOperator } from "../pages/PageChoosingOperator.tsx";
// import PageDevices from '../pages/PageDevices';
// import PageOperators from '../pages/PageOperators';
// import PageChoosingOperator from "../pages/PageChoosingOperator";
// import PageManual from "../pages/PageManual";
// import PagePlayers from "../pages/PagePlayers";
// import Blank from "../components/Blank";
// import PageCinemas from "../pages/PageCinemas";
// import PageAbout from "../pages/PageAbout";
// import PageChannels from "../pages/PageChannels";

export const PagesRouter = () => {
  const {i18n}: ITranslateI18n = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru';
  console.log(lang);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} replace/>}/>
      <Route path='/:language' element={<MainLayout/>}>
        <Route path='' element={<PageMain/>}/>
        <Route path='choose' element={<PageChoosingOperator/>}/>
      </Route>
      {/*<Route path='/lists' element={<PageChannels/>}>*/}
      {/*  <Route path=':operator' element={<CategoriesOperator/>}/>*/}
      {/*</Route>*/}
      {/*<Route path='/iptv' element={<PageOperators/>}/>*/}
      {/*<Route path='/iptv/:operator' element={<PageDevices/>}/>*/}
      {/*<Route path='/iptv/:operator/:devices' element={<PageDevices/>}/>*/}
      {/*<Route path='/iptv/:operator/:devices/:device' element={<PagePlayers/>}/>*/}
      {/*<Route path='/iptv/:operator/:devices/:device/:player' element={<PageManual/>}/>*/}

      {/*<Route path='/media' element={<PageCinemas/>}/>*/}
      {/*<Route path='/media/:cinema' element={<PageManual/>}/>*/}

      {/*<Route path='/faq' element={<Blank/>}/>*/}
      {/*<Route path='/about' element={<PageAbout/>}/>*/}

      {/*<Route path='/blank' element={<Blank/>}/>*/}
      {/*<Route path='*' element={<Navigate to='/'/>}/>*/}
    </Routes>
  );
}
