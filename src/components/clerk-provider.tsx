"use client"
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function ClerkProviderWrapper({ children }): any {
  const { resolvedTheme: theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" && dark ,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
