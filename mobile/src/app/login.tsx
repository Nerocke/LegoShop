import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../modules/auth/AuthContext";
import logo from "../modules/auth/resources/logo-lego.png"; 

export default function LoginScreen() {
  const { user, login } = useAuth();
  const [loginInput, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Redirect href="/" />;

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(loginInput, password);
    } catch (err) {
      Alert.alert("Erreur", "Login ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ LOGO LEGO */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>🔐 Connexion Administrateur</Text>

      <TextInput
        placeholder="Login"
        value={loginInput}
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

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Connexion..." : "Se connecter"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 20,
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
    backgroundColor: "#007bff",
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
