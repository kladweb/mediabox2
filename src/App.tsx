import { Suspense } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header.tsx";
import { appColors } from "./styles/appColors.ts";
import Counter from "./components/Counter.tsx";
import { PagesRouter } from "./router/PagesRouter.tsx";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/*<Suspense fallback='...loading'>*/}
      <Suspense>
        <Header/>
        <Box sx={{minHeight: '100vh', backgroundColor: appColors.mid1,}}>
          <Counter/>
          <PagesRouter/>
        </Box>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
