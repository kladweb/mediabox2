import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./router/PagesRouter.tsx";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <PagesRouter/>
    </BrowserRouter>
  );
}

export default App
