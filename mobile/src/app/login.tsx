// app/login.tsx
import { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../modules/auth/AuthContext";

export default function LoginScreen() {
  const { user, login } = useAuth();
  const [loginInput, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Si déjà connecté, on redirige vers l'accueil
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
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Connexion Admin</Text>

      <TextInput
        placeholder="Login"
        value={loginInput}
        onChangeText={setLogin}
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <Button title={loading ? "Connexion..." : "Se connecter"} onPress={handleLogin} />
    </View>
  );
}
