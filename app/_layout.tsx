import { ClerkLoaded, ClerkProvider, TokenCache } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const tokenCache: TokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkLoaded>
    </ClerkProvider>
  );
}