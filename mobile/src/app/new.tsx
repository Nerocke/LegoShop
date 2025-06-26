import { useState } from "react";
import {View,TextInput,Text,Alert,TouchableOpacity,StyleSheet,SafeAreaView} from "react-native";
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
    <SafeAreaView style={styles.container}>
        
      <Text style={styles.title}>➕ Ajouter un utilisateur</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Rôle (user ou admin)"
        value={role}
        onChangeText={setRole}
        autoCapitalize="none"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>✅ Créer l'utilisateur</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
                <Text style={styles.buttonText}>🔙 Retour</Text>
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
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
