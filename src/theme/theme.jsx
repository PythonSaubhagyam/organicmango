import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#487D05",
      100: "#436131",
      200: "#9CA361",
      300: "#F4F6EB",
      500: "#6E9E5F",
      600:"#807670",
      900: "#6E9E5F",
    },
    bg: {
      100: "#F5F5F5",
      200: "#E6F2E6",
      500: "#F3ECE2",
    
    },
    blue: {
      100: "#00A09D",
    },
    text: {
      500: "#6E9E5F",
      400: "#395629",
      300: "#434242",
      600:"#f08e80",
      700:"#2d4312",
      800:"#e8513c",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  components: {
    Input: {
      defaultProps: {
        variant: "flushed",
        colorScheme: "brand",
        focusBorderColor: "black",
      },
    },
  },
  sizes: {
    container: {
      xl: "1920px",
    },
  },

  //  breakpoints : {
  //     base: "0em",   // 0px
  //     sm: "30em",    // ~480px
  //     md: "48em",    // ~768px
  //     lg: "62em",    // ~992px
  //     xl: "80em",    // ~1280px
  //     "2xl": "96em", // ~1536px
  //     "3xl": "120em", // ~1920px
  //     "4xl": "144em", // ~2304px
  //     "5xl": "160em", // ~2560px
  //     "6xl": "192em", // ~3072px
  //     // Add more breakpoints as needed
  //   }
});
