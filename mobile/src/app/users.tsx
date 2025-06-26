import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useAuth } from "../modules/auth/AuthContext";
import { useRouter } from "expo-router";

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
      const res = await axios.get(`http://192.168.1.158:3000/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 🔍 Ne garder que les utilisateurs simples
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
            await axios.delete(`http://192.168.1.158:3000/api/users/${id}`, {
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement des utilisateurs...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        👥 Utilisateurs
      </Text>

      {/* ✅ Bouton d’ajout tout en haut */}
      <View style={{ marginBottom: 20 }}>
        <Button
          title="➕ Ajouter un utilisateur"
          onPress={() => router.push("/new")}
        />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 16,
              borderWidth: 1,
              borderColor: "#ccc",
              marginBottom: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.login}
            </Text>
            <Text style={{ color: "#555" }}>ID: {item.id}</Text>

            <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
              <Button
                title="❌ Supprimer"
                color="red"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
