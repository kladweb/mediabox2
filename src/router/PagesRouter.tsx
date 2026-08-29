import { Route, Routes } from 'react-router-dom';
import Counter from "../components/Counter.tsx";
// import PageDevices from '../pages/PageDevices';
// import PageOperators from '../pages/PageOperators';
// import PageChoosingOperator from "../pages/PageChoosingOperator";
// import PageManual from "../pages/PageManual";
// import PageMain from "../pages/PageMain";
// import PagePlayers from "../pages/PagePlayers";
// import Blank from "../components/Blank";
// import PageCinemas from "../pages/PageCinemas";
// import PageAbout from "../pages/PageAbout";
// import PageChannels from "../pages/PageChannels";
// import CategoriesOperator from "../components/СategoriesOperator";

export const PagesRouter = () => {

  return (
    <Routes>
      <Route path='/ru'>
        <Route path='counter' element={<Counter/>}/>
      </Route>
      <Route path='/en'>
        <Route path='counter' element={<Counter/>}/>
      </Route>
      {/*<Route path='/' element={<PageMain/>}/>*/}
      {/*<Route path='/choose' element={<PageChoosingOperator/>}/>*/}
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
