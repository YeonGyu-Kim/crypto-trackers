import Coin from "./components/coin";
import CoinDetail from "./components/coinDetail";
import GlobalStyle from "./globalStyle";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModeBtn = styled.button<{ isDark: boolean }>`
  position: absolute;
  right: 6rem;
  top: 2.8rem;
  margin: 0 10rem;
  border: none;
  padding: 0.5rem;
  border-radius: 15px;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  @media ${(props) => props.theme.laptop} {
    right: 22%;
  }

  @media ${(props) => props.theme.tablet} {
    right: 0;
  }

  @media ${(props) => props.theme.mobile} {
    margin-left: 3rem;
    left: 0;
  }
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const toggleBtn = useSetRecoilState(isDarkAtom);
  return (
    <div className='App'>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Link
            style={{
              position: "absolute",
              left: "31%",
              top: "2.6rem",
            }}
            to='/'
          >
            <FontAwesomeIcon icon={faHome} size='2x' />
          </Link>
          <ModeBtn
            isDark={isDark}
            onClick={() => toggleBtn((result) => !result)}
          >
            {isDark ? "WhiteMode" : "DarkMode"}
          </ModeBtn>
          <Routes>
            <Route path='/' element={<Coin />} />
            <Route path='/:coinId/*' element={<CoinDetail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
