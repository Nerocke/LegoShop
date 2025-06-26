import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../modules/auth/AuthContext";

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // 🔁 Redirection automatique
    }
  }, [user, loading]);

  if (loading) return null; // Pendant la vérification du token

  const handleLogout = async () => {
    await logout();
    router.replace("/login"); // Redirige à la main aussi
  };

  return (
    <View style={{ padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        🎛️ Tableau de bord
      </Text>
      <Text style={{ fontSize: 16 }}>
        Bienvenue {user?.login} ({user?.role})
      </Text>

      <View style={{ marginTop: 20 }}>
        <Link href="/products" asChild>
          <Button title="📦 Gérer les produits" />
        </Link>

        <View style={{ height: 10 }} />
        <Link href="/users" asChild>
          <Button title="👥 Gérer les utilisateurs" />
        </Link>

        <View style={{ height: 10 }} />
        <Link href="/stats" asChild>
          <Button title="📊 Statistiques" />
        </Link>
      </View>

      <View style={{ marginTop: 40 }}>
        <Button title="🚪 Se déconnecter" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}
