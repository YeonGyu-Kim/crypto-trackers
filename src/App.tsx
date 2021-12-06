import Coin from "./components/coin";
import CoinDetail from "./components/coinDetail";
import GlobalStyle from "./globalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Coin />} />
          <Route path='/:coinId/*' element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
