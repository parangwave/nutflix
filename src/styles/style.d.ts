import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      bg: string;
      text: string;
      primary: string;
      shadow: string;
      budgetTag: string;
      revenueTag: string;
      runtimeTag: string;
      ratingTag: string;
    };
  }
}
