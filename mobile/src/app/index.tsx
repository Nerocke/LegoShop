import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../modules/auth/AuthContext";

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎛️ Tableau de bord</Text>
      <Text style={styles.welcome}>
        Bienvenue {user?.login} ({user?.role})
      </Text>

      <View style={styles.section}>

        <Link href="/users" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>👥 Gérer les utilisateurs</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/stats" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>📊 Statistiques</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  welcome: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#444",
  },
  section: {
    gap: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 14,
    backgroundColor: "#dc3545",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
