import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>("light");

  useEffect(() => {
    setColorScheme(Appearance.getColorScheme());
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  return colorScheme;
}
