import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./router/PagesRouter.tsx";

function App() {
  return (
    <BrowserRouter>
      <PagesRouter/>
    </BrowserRouter>
  );
}

export default App
