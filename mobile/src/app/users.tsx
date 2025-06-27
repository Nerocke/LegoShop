import { useEffect, useState } from "react";
import {View,Text,FlatList,Alert,ActivityIndicator,TouchableOpacity,StyleSheet} from "react-native";
import axios from "axios";
import { useAuth } from "../modules/auth/AuthContext";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../config/env";

type User = {
  id: number;
  login: string;
  role: string;
};

export default function UsersScreen() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.filter((u: User) => u.role === "user"));
    } catch (error) {
      console.error("Erreur de chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert("Confirmation", "Supprimer cet utilisateur ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_BASE_URL}/api/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter((u) => u.id !== id));
          } catch (error) {
            console.error("Erreur suppression :", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Chargement des utilisateurs...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>🔙 Retour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/new")}>
          <Text style={styles.buttonText}>➕ Ajouter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>👥 Utilisateurs</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userLogin}>{item.login}</Text>
            <Text style={styles.userId}>ID: {item.id}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={[styles.actionBtn, { backgroundColor: "red" }]}
              >
                <Text style={styles.actionText}>❌ Supprimer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push(`/users/${item.id}`)}
                style={[styles.actionBtn, { backgroundColor: "#2196f3" }]}
              >
                <Text style={styles.actionText}>✏️ Modifier</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    borderRadius: 8,
  },
  userLogin: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userId: {
    color: "#555",
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
