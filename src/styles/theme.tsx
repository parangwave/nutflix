import type { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bg: "#222f3e",
  text: "#FFFFFF",
  primary: "#ff4757",
  shadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
  tags: {
    budgetTag: "#2ed573",
    revenueTag: "#1e90ff",
    runtimeTag: "#a55eea",
    ratingTag: "#f7b731",
  },
};

export const lightTheme: DefaultTheme = {
  bg: "#fefcf6",
  text: "#1e272e",
  primary: "#ff4757",
  shadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
  tags: {
    budgetTag: "#2ed573",
    revenueTag: "#1e90ff",
    runtimeTag: "#a55eea",
    ratingTag: "#f7b731",
  },
};
