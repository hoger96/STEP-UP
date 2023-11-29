"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import RenderProvider from "./render";
import { ToastContainer } from "react-toastify";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <RenderProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            limit={1}
            rtl={false}
          />
        </RenderProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
