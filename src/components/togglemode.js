import { useColorMode, Button } from "@chakra-ui/react";

export default function ToggleMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </header>
  );
}
