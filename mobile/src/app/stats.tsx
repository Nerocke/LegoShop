import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const router = useRouter();

export default function StatsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>📊 Statistiques à venir...</Text>
       <TouchableOpacity
        onPress={() => router.push("/")}
        style={{
          backgroundColor: "#eee",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16 }}>🔙 Retour</Text>
      </TouchableOpacity>
    </View>
    
  );
}
