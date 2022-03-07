import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import Weather from "./components/weather";

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Weather />
    </ChakraProvider>
  );
}

export default App;
