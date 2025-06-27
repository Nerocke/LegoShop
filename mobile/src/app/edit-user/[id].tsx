import { useEffect, useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../../modules/auth/AuthContext";
import { API_BASE_URL } from "../../config/env";

export default function EditUserScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useAuth();
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data;
        setLogin(user.login);
        setRole(user.role);
      } catch (err) {
        Alert.alert("Erreur", "Impossible de charger l'utilisateur.");
      }
    };

    fetchUser();
  }, []);

  const updateUser = async () => {
    const payload: any = { login, role };
    if (password) payload.password = password;

    try {
      await axios.put(
        `${API_BASE_URL}/api/users/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Succès", "Utilisateur modifié.");
      router.back();
    } catch (err) {
      Alert.alert("Erreur", "Échec de la modification.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>✏️ Modifier l'utilisateur</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Nouveau mot de passe (facultatif)"
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

      <Button title="✅ Mettre à jour" onPress={updateUser} />
    </View>
  );
}
