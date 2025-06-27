import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../modules/auth/AuthContext";
import { ActivityIndicator, View, Text } from "react-native";

function ProtectedLayout() {
  const { token, user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const currentRoute = segments?.[0] ?? "";
  const isLoginPage = currentRoute === "login";

  useEffect(() => {
    if (loading || segments.length === 0) return;

    const isAuthenticated = !!token && !!user;

    if (!isAuthenticated && !isLoginPage) {
      router.replace("/login");
    } else if (isAuthenticated && isLoginPage) {
      router.replace("/");
    }
  }, [loading, token, user, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement de la session...</Text>
      </View>
    );
  }

  return <Slot />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
