"use client";

import {NextUIProvider} from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types"
import { useEffect } from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { theme } = useTheme();

  useEffect(() => {
    console.log("theme: ", theme);
  }, [theme]);

  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
              {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}