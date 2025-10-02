import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!isSignedIn) return null;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome! 🎉 You are signed in.</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}