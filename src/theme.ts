import { DefaultTheme } from "styled-components";

const deviceSizes = {
  mobile: "620px",
  tablet: "820px",
  laptop: "1200px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (min-width: ${deviceSizes.laptop})`,
};

export const darkTheme: DefaultTheme = {
  textColor: "#F4F5F8",
  bgColor: "#142135",
  accentColor: "#e55039",
  ...device,
};

export const lightTheme: DefaultTheme = {
  textColor: "#142135",
  bgColor: "#F4F5F8",
  accentColor: "#e55039",
  ...device,
};
