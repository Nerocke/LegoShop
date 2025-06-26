import { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import axios from "axios";
import { useAuth } from "../modules/auth/AuthContext";
import { useRouter } from "expo-router";

export default function CreateUserScreen() {
  const { token } = useAuth();
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleCreate = async () => {
    if (!login || !password) {
      Alert.alert("Erreur", "Login et mot de passe requis.");
      return;
    }

    try {
      await axios.post(
        "http://192.168.1.158:3000/api/users",
        { login, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Succès", "Utilisateur créé avec succès !");
      router.replace("/users");
    } catch (err: any) {
      Alert.alert(
        "Erreur",
        err.response?.data?.error || "Impossible de créer l'utilisateur"
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>➕ Ajouter un utilisateur</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Rôle (user ou admin)"
        value={role}
        onChangeText={setRole}
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Button title="✅ Créer l'utilisateur" onPress={handleCreate} />
    </View>
  );
}
