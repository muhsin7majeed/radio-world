import useColorMode from "./useColorMode";

const useColorModeValue = <T>(light: T, dark: T): T => {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
};

export default useColorModeValue;
