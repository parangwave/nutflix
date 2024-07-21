import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bg: string;
    text: string;
    primary: string;
    shadow: string;
    tags: {
      budgetTag: string;
      revenueTag: string;
      runtimeTag: string;
      ratingTag: string;
    };
  }
}
